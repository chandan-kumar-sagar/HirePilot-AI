import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Loader2, ChevronRight, Briefcase, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'sonner';

const ScoreRing = ({ score }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  
  // Color logic based on score
  const color = score >= 85 ? '#22c55e' : score >= 70 ? '#f97316' : '#ec4899';

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
        <circle cx="30" cy="30" r={radius} fill="none" strokeWidth="4" stroke="#f1f5f9" />
        <motion.circle
          cx="30" cy="30" r={radius}
          fill="none" strokeWidth="5"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-black text-gray-800" style={{ color }}>{score}</span>
      </div>
    </div>
  );
};

const RecommendationCard = ({ job, index }) => {
  const match = job.matchDetails;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden"
    >
      {/* Decorative rank number */}
      <div className="absolute -top-4 -right-2 text-8xl font-black text-gray-50 opacity-50 pointer-events-none select-none">
        #{index + 1}
      </div>

      <div className="flex-shrink-0 flex flex-col items-center justify-center pt-2">
        <ScoreRing score={match.matchScore} />
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Match</span>
      </div>

      <div className="flex-1 space-y-4 relative z-10">
        {/* Header */}
        <div>
          <h3 className="text-xl font-black text-gray-900">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm font-medium text-gray-600">
            <span className="flex items-center gap-1"><Briefcase size={14} className="text-purple-500" /> {job.company}</span>
            <span className="flex items-center gap-1"><MapPin size={14} className="text-pink-500" /> {job.location}</span>
            <span className="flex items-center gap-1"><DollarSign size={14} className="text-emerald-500" /> {job.salaryRange}</span>
          </div>
        </div>

        {/* AI Reasons */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100/50">
          <p className="text-xs font-black text-purple-700 uppercase tracking-widest mb-2 flex items-center gap-1">
            <Zap size={12} className="fill-purple-500 text-purple-500" /> AI Analysis
          </p>
          <ul className="space-y-1.5">
            {match.reasons.map((reason, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span> {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Skills */}
        {match.missingSkills?.length > 0 && (
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Skill Gaps (To Learn)</p>
            <div className="flex flex-wrap gap-2">
              {match.missingSkills.map((skill, i) => (
                <span key={i} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 border border-orange-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center md:items-start justify-end md:w-32 relative z-10 pt-2">
        <a
          href={job.jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-black text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #a855f7, #f97316)' }}
        >
          Apply <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );
};

const JobRecommendations = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [loadingResumes, setLoadingResumes] = useState(true);
  
  const [recommendations, setRecommendations] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [source, setSource] = useState(''); // 'ai' or 'cache'

  const [filterLocation, setFilterLocation] = useState('');
  const [filterExperience, setFilterExperience] = useState('');
  const [filterJobType, setFilterJobType] = useState('');
  const [filterCtc, setFilterCtc] = useState('');

  // Fetch Resumes on mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get('/resume/data/getAllResumes');
        setResumes(res.data.resumes || []);
        if (res.data.resumes?.length > 0) {
          setSelectedResume(res.data.resumes[0]._id);
        }
      } catch (err) {
        toast.error("Failed to fetch resumes");
      } finally {
        setLoadingResumes(false);
      }
    };
    fetchResumes();
  }, []);

  const handleGenerate = async () => {
    if (!selectedResume) return;
    setLoadingRecs(true);
    setRecommendations(null);

    try {
      const payload = {
        resumeId: selectedResume,
        location: filterLocation || undefined,
        experience: filterExperience || undefined,
        jobType: filterJobType || undefined,
        expectedCtc: filterCtc ? Number(filterCtc) : undefined,
      };
      const res = await api.post('/recommendations', payload);
      setRecommendations(res.data.data);
      setSource(res.data.source);
      if (res.data.data.length === 0) {
        toast.info("No matching jobs found in the global pool.");
      } else {
        toast.success(`Found top ${res.data.data.length} matches!`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate recommendations");
    } finally {
      setLoadingRecs(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] relative overflow-hidden flex flex-col p-6 max-w-5xl mx-auto w-full">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="relative z-10 mb-8 flex items-center gap-3">
        <div className="p-3 rounded-2xl text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
          <Target size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">AI Job Discovery</h1>
          <p className="text-sm text-gray-500 font-medium">We pre-filter 10,000+ jobs and let AI rank your top 5 perfect matches.</p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white mb-8 space-y-4">
        {/* Top Row: Resume & Action */}
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
          <div className="w-full md:flex-1">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Select Source Resume</label>
            {loadingResumes ? (
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ) : resumes.length === 0 ? (
              <div className="text-sm text-red-500 font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                Please upload a resume in the Resume Center first.
              </div>
            ) : (
              <select
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl px-4 text-gray-800 text-sm font-medium focus:ring-2 focus:ring-orange-300/50 outline-none transition-all"
              >
                {resumes.map(r => (
                  <option key={r._id} value={r._id}>{r.title} ({r.skills?.length || 0} skills)</option>
                ))}
              </select>
            )}
          </div>
          <button
            onClick={handleGenerate}
            disabled={loadingRecs || resumes.length === 0}
            className="w-full md:w-auto h-12 px-8 rounded-xl text-white text-sm font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
          >
            {loadingRecs ? (
              <><Loader2 className="animate-spin" size={18} /> Analyzing Matches...</>
            ) : (
              <><Zap size={18} /> Find My Matches</>
            )}
          </button>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100/50">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Location</label>
            <input type="text" placeholder="e.g. Remote, NY" value={filterLocation} onChange={e => setFilterLocation(e.target.value)} className="w-full h-10 bg-white/50 border border-gray-200 rounded-xl px-3 text-sm focus:ring-2 focus:ring-purple-300/50 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Experience</label>
            <select value={filterExperience} onChange={e => setFilterExperience(e.target.value)} className="w-full h-10 bg-white/50 border border-gray-200 rounded-xl px-3 text-sm focus:ring-2 focus:ring-purple-300/50 outline-none transition-all">
              <option value="">Any</option>
              <option value="fresher">Fresher</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Job Type</label>
            <select value={filterJobType} onChange={e => setFilterJobType(e.target.value)} className="w-full h-10 bg-white/50 border border-gray-200 rounded-xl px-3 text-sm focus:ring-2 focus:ring-purple-300/50 outline-none transition-all">
              <option value="">Any</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Min CTC</label>
            <div className="relative">
              <DollarSign size={14} className="absolute left-3 top-3 text-gray-400" />
              <input type="number" placeholder="100000" value={filterCtc} onChange={e => setFilterCtc(e.target.value)} className="w-full h-10 bg-white/50 border border-gray-200 rounded-xl pl-8 pr-3 text-sm focus:ring-2 focus:ring-purple-300/50 outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          {loadingRecs && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4"
            >
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-pink-500">
                  <Target size={24} className="animate-pulse" />
                </div>
              </div>
              <div>
                <p className="text-gray-900 font-black">AI is ranking your opportunities...</p>
                <p className="text-sm text-gray-400 mt-1">Pre-filtering matching skills via database.</p>
              </div>
            </motion.div>
          )}

          {!loadingRecs && recommendations && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-black text-gray-800">Top Matches</h2>
                {source === 'cache' && (
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Zap size={12} className="fill-emerald-500" /> Loaded from Cache
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {recommendations.map((job, index) => (
                  <RecommendationCard key={job.jobId || job._id} job={job} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {!loadingRecs && !recommendations && !loadingResumes && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center opacity-50"
            >
              <Target size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 font-bold">Select a resume and click generate to find jobs.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobRecommendations;
