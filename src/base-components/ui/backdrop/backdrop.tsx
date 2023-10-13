import { IBackdropProps } from "@/types";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Backdrop = ({ children, onClose }: IBackdropProps) => {
  
  const [backdropEl, setBackdropEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setBackdropEl(document.getElementById("backdrop"));
  }, []);

  if (!backdropEl) return null;

  const handleBackdropClicked = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="absolute top-0 left-0 flex justify-center items-center z-99999 bg-dark bg-opacity-90 w-screen h-screen bg-blend-saturation backdrop-blur-sm"
      onClick={handleBackdropClicked}
    >
      {children}
    </div>,
    backdropEl
  );
};
