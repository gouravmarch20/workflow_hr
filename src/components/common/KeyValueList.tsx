import React, { memo } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "./Button";

export const KeyValueList = memo(({
  items,
  onChange,
  label
}:{
  items: Array<{ key: string; value: string }>;
  onChange:(items:Array<{key:string,value:string}>)=>void;
  label:string;
}) => {

  const addItem = () => onChange([...items,{ key:"",value:""}]);
  const updateItem = (i:number,f:"key"|"value",v:string)=>{
    const arr=[...items]; arr[i]={...arr[i],[f]:v}; onChange(arr);
  }
  const removeItem = (i:number)=> onChange(items.filter((_,x)=>x!==i));

  return(
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <ul className="space-y-2">
        {items.map((item,i)=>(
          <li key={i} className="flex items-center gap-2">
            <input
              value={item.key}
              onChange={(e)=>updateItem(i,"key",e.target.value)}
              className="flex-1 px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Key"
            />
            <input
              value={item.value}
              onChange={(e)=>updateItem(i,"value",e.target.value)}
              className="flex-1 px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Value"
            />
            <button onClick={()=>removeItem(i)} className="p-1 text-red-600 hover:bg-red-50 rounded">
              <X size={16}/>
            </button>
          </li>
        ))}
      </ul>

      <Button variant="secondary" className="w-full text-sm" onClick={addItem}>
        <Plus size={14}/> Add Field
      </Button>
    </div>
  );
});
