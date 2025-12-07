import React, { memo } from "react";

export const Select = memo(({ 
  label, 
  value, 
  onChange, 
  options,
  required = false
}: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <select
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-indigo-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
));
