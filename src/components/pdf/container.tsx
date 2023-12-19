import React, { useEffect, useRef } from 'react';
import { MyComponentProp } from '@/types'; // Assuming this is the correct path

export const Container = ({ children }: MyComponentProp) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScale = () => {
    if (containerRef.current) {
      const parent = containerRef.current.parentNode as HTMLElement;
      const parentWidth = parent.offsetWidth;
      const effectiveWidth = parentWidth - 272; // Adjusting for margin-left
  
      // Compare effectiveWidth with the actual width of containerRef
      const containerActualWidth = containerRef.current.offsetWidth;
      const scale = effectiveWidth < containerActualWidth ? effectiveWidth / containerActualWidth : 1;
      containerRef.current.style.transform = `scale(${scale})`;
    }
  };
  

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    updateScale();

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={containerRef} style={{  height: '100vh', transformOrigin: 'top left', minWidth: '1440px' }}>
      {children}
    </div>
  );
};
