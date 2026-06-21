import React from 'react';
import { User, Mail, Phone, Link, Globe, FileText, Code2, Database, FolderGit2, ExternalLink, Plus, Trash2 } from 'lucide-react';

const ResumeEditor = ({ resumeData, setResumeData }) => {
  const handleInputChange = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(s => s.trim());
    handleInputChange('skills', skills);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = resumeData.projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );
    handleInputChange('projects', updatedProjects);
  };

  const addProject = () => {
    const newProject = { title: '', url: '', technologies: [], highlights: [] };
    handleInputChange('projects', [...(resumeData.projects || []), newProject]);
  };

  const removeProject = (index) => {
    handleInputChange('projects', resumeData.projects.filter((_, i) => i !== index));
  };

  const InputWrapper = ({ icon: Icon, label, children }) => (
    <div className="group">
      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-indigo-600">
        <Icon size={14} /> {label}
      </label>
      <div className="relative">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      
      {/* Personal Info Section */}
      <section className="space-y-5 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest border-b border-gray-200 pb-3 flex items-center gap-2">
          <User size={16} className="text-indigo-500" /> Identity
        </h3>
        <div className="grid grid-cols-2 gap-5">
          <InputWrapper icon={User} label="First Name">
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
              value={resumeData.firstName || 'John'}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </InputWrapper>
          <InputWrapper icon={User} label="Last Name">
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
              value={resumeData.lastName || 'Doe'}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </InputWrapper>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <InputWrapper icon={Mail} label="Email">
            <input
              type="email"
              className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
              value={resumeData.email || 'johndoe@email.com'}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </InputWrapper>
          <InputWrapper icon={Phone} label="Phone">
            <input
              type="tel"
              className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
              value={resumeData.phone || '(555) 123-4567'}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </InputWrapper>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <InputWrapper icon={Link} label="LinkedIn URL">
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
              value={resumeData.linkedin || 'linkedin.com/in/johndoe'}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
            />
          </InputWrapper>
          <InputWrapper icon={Globe} label="GitHub URL">
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
              value={resumeData.github || 'github.com/johndoe'}
              onChange={(e) => handleInputChange('github', e.target.value)}
            />
          </InputWrapper>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="space-y-4">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest border-b border-gray-200 pb-3 flex items-center gap-2">
          <FileText size={16} className="text-indigo-500" /> Summary
        </h3>
        <textarea
          className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900 leading-relaxed"
          rows="5"
          value={resumeData.professionalSummary || ''}
          onChange={(e) => handleInputChange('professionalSummary', e.target.value)}
        />
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest border-b border-gray-200 pb-3 flex items-center gap-2">
          <Code2 size={16} className="text-indigo-500" /> Core Skills
        </h3>
        <textarea
          className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900 leading-relaxed"
          rows="3"
          value={(resumeData.skills || []).join(', ')}
          onChange={handleSkillsChange}
          placeholder="React, Node.js, TypeScript..."
        />
      </section>

      {/* Projects Section with Live Links */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
            <FolderGit2 size={16} className="text-indigo-500" /> Projects
          </h3>
          <button
            onClick={addProject}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg"
          >
            <Plus size={14} /> Add Project
          </button>
        </div>

        <div className="space-y-4">
          {(resumeData.projects || []).map((proj, index) => (
            <div key={index} className="bg-gray-50/80 border border-gray-100 rounded-2xl p-5 space-y-4 relative group">
              <button
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600 bg-white rounded-lg p-1.5 shadow-sm border border-red-100"
              >
                <Trash2 size={14} />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <FolderGit2 size={12} /> Project Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
                    value={proj.title || ''}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    placeholder="My Awesome Project"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <ExternalLink size={12} /> Live Link / GitHub URL
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
                    value={proj.url || ''}
                    onChange={(e) => handleProjectChange(index, 'url', e.target.value)}
                    placeholder="github.com/you/project"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  <Code2 size={12} /> Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all text-gray-900"
                  value={(proj.technologies || []).join(', ')}
                  onChange={(e) => handleProjectChange(index, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="React, Node.js, AWS..."
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Editor */}
      <section className="space-y-4 pt-4">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest border-b border-gray-200 pb-3 flex items-center gap-2 text-rose-600">
          <Database size={16} className="text-rose-500" /> Advanced Structure (JSON)
        </h3>
        <p className="text-xs text-gray-500 mb-2 font-medium">
          Modify your raw data structures directly. Ensure valid JSON format.
        </p>
        <div className="relative group rounded-xl overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gray-900 pointer-events-none" />
          <textarea
            className="relative w-full bg-transparent border-0 p-5 text-xs font-mono text-emerald-400 focus:ring-0 resize-y leading-relaxed"
            rows="15"
            spellCheck="false"
            value={JSON.stringify(resumeData, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setResumeData(parsed);
              } catch (err) {
                // Ignore parse errors while typing
              }
            }}
          />
        </div>
      </section>

    </div>
  );
};

export default ResumeEditor;
