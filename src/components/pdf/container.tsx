import React, { useEffect, useRef } from "react";
import { MyComponentProp } from "@/types";
import { combineClasses } from "@/utils/utility";

export const Container = ({ children, className }: MyComponentProp) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScale = () => {
    if (containerRef.current) {
      const parent = containerRef.current.parentNode as HTMLElement;
      const parentWidth = parent.offsetWidth;

      const scale = parentWidth < 1160 ? parentWidth / 1160 : 1;
      containerRef.current.style.transform = `scale(${scale})`;

      containerRef.current.style.width =
        parentWidth > 1160 ? "100%" : `${Math.min(parentWidth, 1160)}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateScale);
    updateScale();

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const containerClasses = combineClasses("h-fit", className);

  return (
    <div
      className={containerClasses}
      ref={containerRef}
      style={{
        transformOrigin: "top left",
        minWidth: "1160px",
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
};
