import { useEffect } from "react";

export default function RightDrawer({
  open,
  onClose,
  children,
  width = "350px",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}) {
  // prevent scrolling when drawer open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  return (
    <>
      {/* Overlay Background Blur */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 
        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-xl transition-transform duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ width }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Drawer</h3>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
          {children}
        </div>
      </div>
    </>
  );
}
