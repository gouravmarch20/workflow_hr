import React from "react";
import { Plus, Trash2 } from "lucide-react";

interface KeyValueItem {
  key: string;
  value: string;
}

interface KeyValueListProps {
  items: KeyValueItem[];
  onChange: (items: KeyValueItem[]) => void;
  label: string;
}

export const KeyValueList: React.FC<KeyValueListProps> = ({
  items,
  onChange,
  label,
}) => {
  const addItem = () => {
    onChange([...items, { key: "", value: "" }]);
  };

  const updateItem = (index: number, field: "key" | "value", value: string) => {
    const updated = [...items];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Plus size={14} />
          Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item.key}
              onChange={(e) => updateItem(index, "key", e.target.value)}
              placeholder="Key"
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              value={item.value}
              onChange={(e) => updateItem(index, "value", e.target.value)}
              placeholder="Value"
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-2 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-gray-400 italic">No items added yet</p>
        )}
      </div>
    </div>
  );
};
