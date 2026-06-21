import React from 'react';

const TwoColumnTemplate = ({ resumeData }) => {
  return (
    <div className="flex h-full min-h-[267mm] -m-[15mm]">
      {/* Left Column */}
      <div className="w-[35%] p-[10mm]" style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
        <h1 className="text-3xl font-black uppercase tracking-widest leading-none mb-1 text-white">
          {resumeData.firstName || 'John'}<br />
          {resumeData.lastName || 'Doe'}
        </h1>
        <p className="text-sm font-medium mb-8" style={{ color: '#94a3b8' }}>{resumeData.jobTitle}</p>

        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3" style={{ borderColor: '#334155', color: '#cbd5e1' }}>Contact</h2>
          <div className="text-xs space-y-2" style={{ color: '#f1f5f9', wordBreak: 'break-all' }}>
            <div><a href={`mailto:${resumeData.email || 'johndoe@email.com'}`} className="hover:underline text-[#60a5fa]">{resumeData.email || 'johndoe@email.com'}</a></div>
            <div><a href={`tel:${(resumeData.phone || '(555) 123-4567').replace(/[^0-9+]/g, '')}`} className="hover:underline text-[#60a5fa]">{resumeData.phone || '(555) 123-4567'}</a></div>
            <div><a href={`https://${(resumeData.linkedin || 'linkedin.com/in/johndoe').replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline text-[#60a5fa]">{resumeData.linkedin || 'linkedin.com/in/johndoe'}</a></div>
            <div><a href={`https://${(resumeData.github || 'github.com/johndoe').replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline text-[#60a5fa]">{resumeData.github || 'github.com/johndoe'}</a></div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3" style={{ borderColor: '#334155', color: '#cbd5e1' }}>Education</h2>
          {resumeData.education?.map((edu, index) => (
             <div key={index} className="mb-3">
               <div className="font-bold text-xs">{edu.degree}</div>
               <div className="italic text-[10px]" style={{ color: '#94a3b8' }}>{edu.institution}</div>
               <div className="text-[10px]" style={{ color: '#64748b' }}>{edu.year}</div>
             </div>
          ))}
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3" style={{ borderColor: '#334155', color: '#cbd5e1' }}>Skills</h2>
          <div className="flex flex-wrap gap-1">
            {resumeData.skills?.map((skill, index) => (
              <span key={index} className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: '#334155', color: '#f8fafc' }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="w-[65%] p-[10mm]" style={{ backgroundColor: '#ffffff', color: '#111827' }}>
        
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-1 mb-2" style={{ borderColor: '#e2e8f0', color: '#0f172a' }}>Profile</h2>
          <p className="text-[10.5pt] text-justify leading-relaxed" style={{ color: '#334155' }}>{resumeData.professionalSummary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-1 mb-3" style={{ borderColor: '#e2e8f0', color: '#0f172a' }}>Experience</h2>
          {resumeData.experience?.map((exp, index) => (
             <div key={index} className="mb-4">
               <div className="flex justify-between items-baseline font-bold">
                 <span style={{ color: '#0f172a' }}>{exp.role}</span>
                 <span className="text-[9pt] font-semibold" style={{ color: '#64748b' }}>{exp.duration}</span>
               </div>
               <div className="italic text-[10pt] mb-2" style={{ color: '#475569' }}>{exp.company}</div>
               <ul className="list-disc list-outside ml-4">
                 {exp.responsibilities?.map((resp, i) => (
                   <li key={i} className="mb-1 text-[10pt] text-justify leading-snug pl-1" style={{ color: '#334155' }}>{resp}</li>
                 ))}
               </ul>
             </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-1 mb-3" style={{ borderColor: '#e2e8f0', color: '#0f172a' }}>Projects</h2>
          {resumeData.projects?.map((proj, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[10.5pt]" style={{ color: '#0f172a' }}>
                  {proj.url ? (
                    <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb]">{proj.title}</a>
                  ) : proj.title}
                </span>
                <span className="italic text-[9pt] font-medium" style={{ color: '#64748b' }}>{proj.technologies?.join(', ')}</span>
              </div>
              <ul className="list-disc list-outside ml-4 mt-1">
                {proj.highlights?.map((hl, i) => (
                  <li key={i} className="mb-1 text-[10pt] text-justify leading-snug pl-1" style={{ color: '#334155' }}>{hl}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default TwoColumnTemplate;
