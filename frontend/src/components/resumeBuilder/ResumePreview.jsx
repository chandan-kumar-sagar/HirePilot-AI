import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import ExportPDFButton from './ExportPDFButton';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import TwoColumnTemplate from './templates/TwoColumnTemplate';
import { LayoutTemplate, AlignLeft, Columns } from 'lucide-react';

const ResumePreview = ({ resumeData }) => {
  const resumeRef = useRef();
  const [format, setFormat] = useState('modern');

  const handleExport = async () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0, 
      filename: `${resumeData.firstName || 'John'}_${resumeData.lastName || 'Doe'}_Resume.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      enableLinks: true
    };

    try {
      const pdfGenerator = typeof html2pdf === 'function' ? html2pdf() : html2pdf.default();
      await pdfGenerator.set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Export failed:", error);
      alert("Failed to export PDF. Check console for details.");
    }
  };

  const FormatButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setFormat(id)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all ${
        format === id 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Sticky Bar: Format Selection & Export */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sticky top-0 bg-gray-50/90 backdrop-blur-xl z-20 py-4 px-2 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <FormatButton id="classic" icon={AlignLeft} label="Classic" />
          <FormatButton id="modern" icon={LayoutTemplate} label="Modern" />
          <FormatButton id="two-column" icon={Columns} label="Split" />
        </div>
        <ExportPDFButton onExport={handleExport} />
      </div>

      {/* Scaled Preview Wrapper to fix "half visible" issue */}
      <div className="w-full overflow-x-auto flex justify-center custom-scrollbar pb-8">
        {/* Responsive scaling: shrinks on small screens to fit without cutting off */}
        <div className="transform origin-top scale-[0.6] sm:scale-[0.7] md:scale-[0.75] lg:scale-[0.65] xl:scale-[0.8] 2xl:scale-100 transition-transform duration-300">
          
          {/* Actual A4 Page Container (This is what gets exported) */}
          <div className="bg-white shadow-2xl overflow-hidden shrink-0 ring-1 ring-gray-900/5" style={{ width: '210mm', minHeight: '297mm' }}>
            <div ref={resumeRef} className="p-[15mm] font-sans h-full bg-white relative" style={{ fontSize: '10.5pt', lineHeight: '1.4', color: '#111827' }}>
              
              {/* Dynamic Template Rendering */}
              {format === 'modern' && <ModernTemplate resumeData={resumeData} />}
              {format === 'classic' && <ClassicTemplate resumeData={resumeData} />}
              {format === 'two-column' && <TwoColumnTemplate resumeData={resumeData} />}
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
