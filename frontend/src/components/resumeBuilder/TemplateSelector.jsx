import { useState } from 'react';
import api from '../../api/axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Briefcase, Clock, Code, Sparkles, Wand2 } from 'lucide-react';

const TemplateSelector = ({ setResumeData, setIsGenerating, isGenerating }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    yearsOfExperience: 0,
    techStack: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const response = await api.post(
        '/resume-builder/generate',
        {
          jobTitle: formData.jobTitle,
          yearsOfExperience: parseInt(formData.yearsOfExperience),
          techStack: formData.techStack.split(',').map(s => s.trim())
        }
      );
      
      if (response.data.success) {
        toast.success("Resume generated successfully!");
        setResumeData(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate resume");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/70 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white max-w-2xl w-full mx-auto relative overflow-hidden"
    >
      {/* Decorative gradient orb inside card */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="mb-8 relative z-10 text-center">
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-900 mb-2">
          Start Your AI Journey
        </h2>
        <p className="text-gray-500 text-sm">Tell us your target role and let our AI craft the perfect ATS-friendly resume layout.</p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
        
        {/* Job Title Input */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
            <Briefcase size={16} /> Target Job Title
          </label>
          <div className="relative">
            <input
              type="text"
              name="jobTitle"
              required
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Full Stack Engineer"
              className="block w-full bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
            />
          </div>
        </div>
        
        {/* Experience Input */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
            <Clock size={16} /> Years of Experience
          </label>
          <div className="relative">
            <input
              type="number"
              name="yearsOfExperience"
              required
              min="0"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="block w-full bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Tech Stack Input */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
            <Code size={16} /> Technical Arsenal
          </label>
          <div className="relative">
            <input
              type="text"
              name="techStack"
              required
              value={formData.techStack}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Python, AWS"
              className="block w-full bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 ml-1">Comma separated. Be specific for better AI targeting.</p>
        </div>

        <motion.button
          whileHover={{ scale: isGenerating ? 1 : 1.02 }}
          whileTap={{ scale: isGenerating ? 1 : 0.98 }}
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 mt-4 rounded-xl shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all overflow-hidden relative"
        >
          {isGenerating ? (
            <>
              <Wand2 className="animate-spin" size={20} />
              Synthesizing Resume...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Magic Resume
            </>
          )}
          
          {/* Shine effect */}
          {!isGenerating && (
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TemplateSelector;
