import React from 'react';

const ClassicTemplate = ({ resumeData }) => {
  return (
    <>
      <header className="mb-6 flex justify-between items-end border-b-[3px] pb-3" style={{ borderColor: '#1f2937' }}>
        <div>
          <h1 className="text-4xl font-serif font-bold uppercase" style={{ color: '#111827' }}>
            {resumeData.firstName || 'John'} {resumeData.lastName || 'Doe'}
          </h1>
          <p className="text-lg font-serif italic mt-1" style={{ color: '#374151' }}>{resumeData.jobTitle}</p>
        </div>
        <div className="text-right text-xs" style={{ color: '#4b5563', lineHeight: '1.5' }}>
          <div><a href={`mailto:${resumeData.email || 'johndoe@email.com'}`} className="hover:underline text-[#2563eb]">{resumeData.email || 'johndoe@email.com'}</a></div>
          <div><a href={`tel:${(resumeData.phone || '(555) 123-4567').replace(/[^0-9+]/g, '')}`} className="hover:underline text-[#2563eb]">{resumeData.phone || '(555) 123-4567'}</a></div>
          <div><a href={`https://${(resumeData.linkedin || 'linkedin.com/in/johndoe').replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb]">{resumeData.linkedin || 'linkedin.com/in/johndoe'}</a></div>
          <div><a href={`https://${(resumeData.github || 'github.com/johndoe').replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb]">{resumeData.github || 'github.com/johndoe'}</a></div>
        </div>
      </header>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase mb-1 font-serif tracking-widest" style={{ color: '#111827' }}>Summary</h2>
        <div className="border-t mb-2" style={{ borderColor: '#111827' }}></div>
        <p className="text-justify font-serif text-[10pt]" style={{ color: '#111827' }}>{resumeData.professionalSummary}</p>
      </section>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase mb-1 font-serif tracking-widest" style={{ color: '#111827' }}>Experience</h2>
        <div className="border-t mb-3" style={{ borderColor: '#111827' }}></div>
        {resumeData.experience?.map((exp, index) => (
           <div key={index} className="mb-4">
             <div className="flex justify-between items-baseline font-bold font-serif" style={{ color: '#111827' }}>
               <span>{exp.role}</span>
               <span className="text-[10pt]">{exp.duration}</span>
             </div>
             <div className="flex justify-between items-baseline italic mb-1 text-[10pt] font-serif" style={{ color: '#374151' }}>
               <span>{exp.company}</span>
             </div>
             <ul className="list-disc list-outside ml-4 font-serif text-[10pt]" style={{ color: '#111827' }}>
               {exp.responsibilities?.map((resp, i) => (
                 <li key={i} className="mb-1 text-justify leading-snug pl-1">{resp}</li>
               ))}
             </ul>
           </div>
        ))}
      </section>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase mb-1 font-serif tracking-widest" style={{ color: '#111827' }}>Projects</h2>
        <div className="border-t mb-3" style={{ borderColor: '#111827' }}></div>
        {resumeData.projects?.map((proj, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <span className="font-bold font-serif" style={{ color: '#111827' }}>
                {proj.url ? (
                  <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" className="hover:underline text-[#2563eb]">{proj.title}</a>
                ) : proj.title}
              </span>
              <span className="italic text-[10pt] font-serif" style={{ color: '#4b5563' }}>{proj.technologies?.join(', ')}</span>
            </div>
            <ul className="list-disc list-outside ml-4 mt-1 font-serif text-[10pt]" style={{ color: '#111827' }}>
              {proj.highlights?.map((hl, i) => (
                <li key={i} className="mb-1 text-justify leading-snug pl-1">{hl}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase mb-1 font-serif tracking-widest" style={{ color: '#111827' }}>Skills & Technologies</h2>
        <div className="border-t mb-2" style={{ borderColor: '#111827' }}></div>
        <p className="font-serif text-[10pt]" style={{ color: '#111827' }}>{resumeData.skills?.join(' • ')}</p>
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase mb-1 font-serif tracking-widest" style={{ color: '#111827' }}>Education</h2>
        <div className="border-t mb-3" style={{ borderColor: '#111827' }}></div>
        {resumeData.education?.map((edu, index) => (
           <div key={index} className="flex justify-between mb-2">
             <div className="font-serif">
               <span className="font-bold text-[10pt]" style={{ color: '#111827' }}>{edu.degree}</span>
               <span className="mx-2">|</span>
               <span className="italic text-[10pt]" style={{ color: '#374151' }}>{edu.institution}</span>
             </div>
             <div className="text-[10pt] font-serif" style={{ color: '#4b5563' }}>{edu.year}</div>
           </div>
        ))}
      </section>
    </>
  );
};

export default ClassicTemplate;
