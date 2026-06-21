import React from 'react';
import { Download } from 'lucide-react';

const ExportPDFButton = ({ onExport }) => {
  return (
    <button
      onClick={onExport}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow transition-colors"
    >
      <Download size={20} />
      Export to PDF
    </button>
  );
};

export default ExportPDFButton;
