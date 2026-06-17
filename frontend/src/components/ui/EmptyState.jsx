import { FolderOpen } from "lucide-react";

export default function EmptyState({ title, description, actionText, onAction, icon: Icon = FolderOpen }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] bg-card rounded-3xl border border-border border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm text-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
