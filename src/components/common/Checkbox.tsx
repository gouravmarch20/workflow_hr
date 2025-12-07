import React, { memo } from "react";

export const Checkbox = memo(({ 
  label, 
  checked, 
  onChange 
}: { 
  label: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
    <label className="text-sm font-medium text-gray-700">{label}</label>
  </div>
));
