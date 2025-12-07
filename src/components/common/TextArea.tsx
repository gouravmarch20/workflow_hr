import React, { memo } from "react";

export const TextArea = memo(({ 
  label, 
  value, 
  onChange, 
  placeholder = "", 
  rows = 3
}: { 
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
));
