import React, { useState, useEffect } from "react";
import Yoga, { YogaNode } from "yoga-layout-prebuilt";
import { MyComponentProp } from "@/types";

export const YogaPdfContainer = ({children}: MyComponentProp) => {
  const [scale, setScale] = useState(1);
  const [yogaNode, setYogaNode] = useState<YogaNode | null>(null);

  useEffect(() => {
    const yogaNode = Yoga.Node.create();
    yogaNode.setWidth(window.innerWidth);
    yogaNode.setHeight(window.innerHeight);
    setYogaNode(yogaNode);
  },[]);

  useEffect(() => {
    const handleResize = () => {
      if (yogaNode) {
        yogaNode.setWidth(window.innerWidth);
        yogaNode.setHeight(window.innerHeight);
        yogaNode.calculateLayout(
          window.innerWidth,
          window.innerHeight,
          Yoga.DIRECTION_LTR
        );

        // Calculate new scale based on Yoga container size
        const newScale = calculateScaleBasedOnYogaLayout(yogaNode);
        setScale(newScale);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [yogaNode]);

  const calculateScaleBasedOnYogaLayout = (yogaNode: YogaNode) => {
    const containerWidth = yogaNode.getComputedWidth();
    const containerHeight = yogaNode.getComputedHeight();

    const naturalWidth = 1160;
    const naturalHeight = 1160;

    const scaleX = containerWidth / naturalWidth;
    const scaleY = containerHeight / naturalHeight;

    return Math.min(scaleX, scaleY);
  };

  return (
    <div style={{ transform: `scale(${scale})` }} className="max-w-[1160px] mx-auto">
      <div className="w-[1160px]">
      {children}
      </div>
    </div>
  );
};
