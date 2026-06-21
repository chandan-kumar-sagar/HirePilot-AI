import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, ChevronRight } from 'lucide-react';
import TemplateSelector from '../components/resumeBuilder/TemplateSelector';
import ResumeEditor from '../components/resumeBuilder/ResumeEditor';
import ResumePreview from '../components/resumeBuilder/ResumePreview';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="relative h-[calc(100vh-120px)] flex flex-col p-6 overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex justify-between items-end relative z-10"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg text-white shadow-lg shadow-blue-500/30">
              <Sparkles size={24} />
            </div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              AI Resume Builder
            </h1>
          </div>
          <p className="text-gray-500 font-medium ml-12">
            Generate, refine, and export a world-class ATS resume.
          </p>
        </div>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {!resumeData ? (
          <motion.div 
            key="selector"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-y-auto relative z-10 flex items-center justify-center pb-20"
          >
            <TemplateSelector 
              setResumeData={setResumeData} 
              setIsGenerating={setIsGenerating} 
              isGenerating={isGenerating} 
            />
          </motion.div>
        ) : (
          <motion.div 
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 relative z-10"
          >
            {/* Left Pane: Editor */}
            <div className="w-full lg:w-[40%] flex flex-col bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden ring-1 ring-black/[0.03]">
              <div className="px-6 py-4 border-b border-gray-100 bg-white/50 flex justify-between items-center backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-indigo-500" />
                  <h2 className="font-bold text-gray-800 tracking-wide">Live Editor</h2>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-teal-700 rounded-full border border-teal-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  Syncing
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} />
              </div>
            </div>

            {/* Right Pane: Preview */}
            <div className="w-full lg:w-[60%] flex flex-col bg-gray-50/80 backdrop-blur-xl rounded-2xl shadow-[inset_0_2px_20px_rgb(0,0,0,0.02)] border border-gray-200/60 overflow-hidden relative">
              <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex justify-center custom-scrollbar">
                <ResumePreview resumeData={resumeData} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeBuilder;
