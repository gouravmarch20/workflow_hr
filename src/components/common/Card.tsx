import React, { memo } from "react";

export const Card = memo(({ 
  children,
  className=""
}:{ 
  children: React.ReactNode;
  className?:string 
}) => (
  <div className={`bg-white border shadow-sm rounded-lg ${className}`}>
    {children}
  </div>
));
