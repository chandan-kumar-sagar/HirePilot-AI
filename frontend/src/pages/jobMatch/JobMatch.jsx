import { useState } from "react";
import { Building2, X, Target } from "lucide-react";
import CreateJobMatchModal from "@/components/jobMatch/CreateJobMatchModal";
import JobMatchCard from "@/components/jobMatch/JobMatchCard";
import MatchScoreCard from "@/components/jobMatch/MatchScoreCard";
import StrengthsCard from "@/components/jobMatch/StrengthsCard";
import MissingSkillsCard from "@/components/jobMatch/MissingSkillsCard";
import RecommendationsCard from "@/components/jobMatch/RecommendationsCard";
import { useJobMatches } from "@/hooks/useJobMatch";

export default function JobMatch() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const { data, isLoading } = useJobMatches();
  const jobMatches = data?.jobMatches || [];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎯</span>
            <h1 className="text-3xl sm:text-4xl font-black">Job Match Analyzer</h1>
          </div>
          <p className="text-blue-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-lg">
            Check how well your resume matches a specific job description before you apply.
          </p>
          <CreateJobMatchModal 
            open={isModalOpen} 
            onOpen={() => setIsModalOpen(true)} 
            onClose={() => setIsModalOpen(false)}
            onMatchGenerated={(newMatch) => setSelectedMatch(newMatch)}
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute -top-20 right-20 w-60 h-60 bg-blue-400 opacity-20 rounded-full blur-3xl mix-blend-overlay"></div>
      </div>

      {/* Selected Match Details View */}
      {selectedMatch ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedMatch(null)}
                className="text-gray-400 hover:text-gray-800 transition mr-2"
              >
                ← Back to History
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedMatch.jobTitle}</h2>
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <Building2 size={16} />
                  {selectedMatch.companyName}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedMatch(null)}
              className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <MatchScoreCard score={selectedMatch.matchScore} />
            </div>
            <div className="md:col-span-2">
              <StrengthsCard strengths={selectedMatch.strengths} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MissingSkillsCard missingSkills={selectedMatch.missingSkills} />
            <RecommendationsCard recommendations={selectedMatch.recommendations} />
          </div>
        </div>
      ) : (
        /* History Grid */
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-800">Recent Analyses</h2>
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full">
              {jobMatches.length}
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-gray-100 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : jobMatches.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Target size={36} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">No Analyses Yet</h3>
                <p className="text-gray-400 mt-1 text-sm max-w-sm">
                  Analyze your first job description to see how well your resume matches.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobMatches.map(match => (
                <JobMatchCard 
                  key={match._id} 
                  match={match} 
                  onClick={setSelectedMatch} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
