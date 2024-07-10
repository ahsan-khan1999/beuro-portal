import { IBackdropProps } from "@/types";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

export const Backdrop = ({
  children,
  onClose,
  customOpacity,
}: IBackdropProps) => {
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

  // backdrop-blur-sm
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className={`!fixed top-0 flex justify-center items-center z-[999] bg-[#1E1E1E] ${
        customOpacity ? "bg-opacity-40" : "bg-opacity-90"
      } w-screen h-screen bg-blend-saturation`}
      onClick={handleBackdropClicked}
    >
      {children}
    </motion.div>,
    backdropEl
  );
};
