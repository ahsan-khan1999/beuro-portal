import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

interface TooltipWrapperProps {
  tooltipContent: React.ReactNode;
  children: React.ReactNode;
}

export const WithTooltip: React.FC<TooltipWrapperProps> = ({
  tooltipContent,
  children,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const tooltipEl = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    setTooltipPosition({
      top: rect.top - 15,
      left: rect.left + rect.width / 2,
    });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    if (tooltipEl.current) {
      const tooltipHeight = tooltipEl.current.clientHeight;
      const extraHeight = tooltipHeight - 24;
      if (extraHeight > 0) {
        setTooltipPosition((prev) => ({
          ...prev,
          top: prev.top - extraHeight,
        }));
      }
    }
  }, [showTooltip]);

  return (
    <div
      className="relative cursor-pointer inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip &&
        ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed bg-white z-50 text-xs p-1 rounded shadow-md max-w-[100px]"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
            }}
            ref={tooltipEl}
          >
            {tooltipContent}
            <div className="absolute left-1 bottom-[-8px] transform border-l-8 border-r-8 border-l-transparent border-r-transparent border-t-8 border-t-white w-0 h-0" />
          </motion.div>,
          document.body
        )}
    </div>
  );
};
