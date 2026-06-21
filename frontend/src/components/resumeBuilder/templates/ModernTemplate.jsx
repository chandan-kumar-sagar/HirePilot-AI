import React from 'react';

const ModernTemplate = ({ resumeData }) => {
  return (
    <>
      <header className="border-b-2 pb-3 mb-4 text-center" style={{ borderColor: '#1f2937' }}>
        <h1 className="text-3xl font-bold uppercase tracking-wider" style={{ color: '#111827' }}>
          {resumeData.firstName || 'John'} {resumeData.lastName || 'Doe'}
        </h1>
        <p className="text-base mt-1 font-semibold" style={{ color: '#1f2937' }}>{resumeData.jobTitle}</p>
        <p className="text-xs mt-1" style={{ color: '#4b5563' }}>
          <a href={`mailto:${resumeData.email || 'johndoe@email.com'}`} className="hover:underline text-[#2563eb]">{resumeData.email || 'johndoe@email.com'}</a> | 
          <a href={`tel:${(resumeData.phone || '(555) 123-4567').replace(/[^0-9+]/g, '')}`} className="hover:underline text-[#2563eb] ml-1">{resumeData.phone || '(555) 123-4567'}</a> | 
          <a href={`https://${(resumeData.linkedin || 'linkedin.com/in/johndoe').replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb] ml-1">{resumeData.linkedin || 'linkedin.com/in/johndoe'}</a> | 
          <a href={`https://${(resumeData.github || 'github.com/johndoe').replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb] ml-1">{resumeData.github || 'github.com/johndoe'}</a>
        </p>
      </header>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase border-b mb-2 tracking-wide pb-1" style={{ borderColor: '#9ca3af', color: '#1f2937' }}>Professional Summary</h2>
        <p className="text-justify">{resumeData.professionalSummary}</p>
      </section>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase border-b mb-2 tracking-wide pb-1" style={{ borderColor: '#9ca3af', color: '#1f2937' }}>Technical Skills</h2>
        <p><strong>Languages & Technologies:</strong> {resumeData.skills?.join(', ')}</p>
      </section>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase border-b mb-2 tracking-wide pb-1" style={{ borderColor: '#9ca3af', color: '#1f2937' }}>Experience</h2>
        {resumeData.experience?.map((exp, index) => (
           <div key={index} className="mb-3">
             <div className="flex justify-between items-baseline font-bold">
               <span>{exp.role}</span>
               <span className="text-xs font-normal" style={{ color: '#4b5563' }}>{exp.duration}</span>
             </div>
             <div className="flex justify-between items-baseline italic mb-1 text-sm" style={{ color: '#374151' }}>
               <span>{exp.company}</span>
             </div>
             <ul className="list-disc list-outside ml-4">
               {exp.responsibilities?.map((resp, i) => (
                 <li key={i} className="mb-1 text-[10pt] text-justify leading-snug pl-1">{resp}</li>
               ))}
             </ul>
           </div>
        ))}
      </section>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase border-b mb-2 tracking-wide pb-1" style={{ borderColor: '#9ca3af', color: '#1f2937' }}>Projects</h2>
        {resumeData.projects?.map((proj, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <span className="font-bold">
                {proj.url ? (
                  <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb]">{proj.title}</a>
                ) : proj.title}
              </span>
              <span className="italic text-xs" style={{ color: '#4b5563' }}>{proj.technologies?.join(', ')}</span>
            </div>
            <ul className="list-disc list-outside ml-4 mt-1">
              {proj.highlights?.map((hl, i) => (
                <li key={i} className="mb-1 text-[10pt] text-justify leading-snug pl-1">{hl}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase border-b mb-2 tracking-wide pb-1" style={{ borderColor: '#9ca3af', color: '#1f2937' }}>Education</h2>
        {resumeData.education?.map((edu, index) => (
           <div key={index} className="flex justify-between mb-2">
             <div>
               <span className="font-bold text-sm">{edu.degree}</span>
               <br />
               <span className="italic text-xs" style={{ color: '#374151' }}>{edu.institution}</span>
             </div>
             <div className="text-xs font-medium" style={{ color: '#4b5563' }}>{edu.year}</div>
           </div>
        ))}
      </section>
    </>
  );
};

export default ModernTemplate;
