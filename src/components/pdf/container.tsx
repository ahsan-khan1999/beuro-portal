import React, { useEffect, useRef } from "react";
import { MyComponentProp } from "@/types";
import { combineClasses } from "@/utils/utility";

export const Container = ({ children, className }: MyComponentProp) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScale = () => {
    if (containerRef.current) {
      const parent = containerRef.current.parentNode as HTMLElement;
      const parentWidth = parent.offsetWidth;

      // scale down when parent width is less than 1160px
      const scale = parentWidth < 1160 ? parentWidth / 1160 : 1;
      containerRef.current.style.transform = `scale(${scale})`;

      // parent width > 1160px set container width to 100%
      // scale down when parent width < 1160px
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
        // height: "100vh",
        transformOrigin: "top left",
        minWidth: "1160px",
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        // height: "500px",
      }}
    >
      {children}
    </div>
  );
};
