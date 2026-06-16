import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// ── Context ──────────────────────────────────────────────────────────────────
const SelectContext = React.createContext({});

// ── Root ─────────────────────────────────────────────────────────────────────
function Select({ value, onValueChange, children, defaultValue }) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const ref = React.useRef(null);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const handleSelect = (val) => {
    if (!controlled) setInternalValue(val);
    onValueChange?.(val);
    setOpen(false);
  };

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <SelectContext.Provider value={{ open, setOpen, currentValue, handleSelect }}>
      <div ref={ref} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

// ── Trigger ───────────────────────────────────────────────────────────────────
function SelectTrigger({ className, children, ...props }) {
  const { open, setOpen } = React.useContext(SelectContext);
  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
    </button>
  );
}

// ── Value ─────────────────────────────────────────────────────────────────────
function SelectValue({ placeholder }) {
  const { currentValue } = React.useContext(SelectContext);
  return (
    <span className={cn("truncate", !currentValue && "text-muted-foreground")}>
      {currentValue || placeholder}
    </span>
  );
}

// ── Content ───────────────────────────────────────────────────────────────────
function SelectContent({ className, children, ...props }) {
  const { open } = React.useContext(SelectContext);
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-border bg-popover p-1 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Item ──────────────────────────────────────────────────────────────────────
function SelectItem({ className, value, children, ...props }) {
  const { handleSelect, currentValue } = React.useContext(SelectContext);
  const isSelected = currentValue === value;
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => handleSelect(value)}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 outline-none hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
