import React, { useEffect, useRef } from "react";
import { MyComponentProp } from "@/types";

export const Container = ({ children }: MyComponentProp) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScale = () => {
    if (containerRef.current) {
      const parent = containerRef.current.parentNode as HTMLElement;
      const parentWidth = parent.offsetWidth;

      // scale down when parent width is less than 1160px
      const scale = parentWidth < 800 ? parentWidth / 800 : 1;
      containerRef.current.style.transform = `scale(${scale})`;

      // parent width > 1160px set container width to 100%
      // scale down when parent width < 1160px
      containerRef.current.style.width =
        parentWidth > 800 ? "100%" : `${Math.min(parentWidth, 800)}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateScale);
    updateScale();

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        transformOrigin: "top left",
        minWidth: "600px",
      }}
    >
      {children}
    </div>
  );
};
