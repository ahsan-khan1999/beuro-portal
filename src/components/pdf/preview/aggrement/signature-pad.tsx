import React, { useEffect, useRef, useState } from "react";
import SignPad from "signature_pad";
import { SignatureSubmittedSuccessFully } from "./signature-submitted-success";

const ow = 383;
const oh = 153;
const originalStrokeWidth = 1;

export const SignaturePad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignPad | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resizeCanvas = () => {
    if (canvasRef.current && signaturePad) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scale = Math.min(rect.width / ow, rect.height / oh);

      const canvas = canvasRef.current;
      canvas.width = ow * scale;
      canvas.height = oh * scale;

      signaturePad.minWidth = originalStrokeWidth / scale;
      signaturePad.maxWidth = (originalStrokeWidth * 0.7) / scale;

      // Redraw the signature from the existing data
      const data = signaturePad.toData();
      signaturePad.clear();
      signaturePad.fromData(data);
    }
  };

  // const resizeCanvas = () => {
  //   if (canvasRef.current && signaturePad) {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const scale = Math.min(rect.width / ow, rect.height / oh);
  
  //     const canvas = canvasRef.current;
  //     canvas.width = ow * scale;
  //     canvas.height = oh * scale;
  
  //     // Adjust stroke width based on scale
  //     if (rect.width < 1160) {
  //       // Smaller stroke width for smaller scale
  //       signaturePad.minWidth = (originalStrokeWidth / 2) / scale;
  //       signaturePad.maxWidth = (originalStrokeWidth * 0.2) / scale;
  //     } else {
  //       // Original stroke width for larger scale
  //       signaturePad.minWidth = originalStrokeWidth / scale;
  //       signaturePad.maxWidth = (originalStrokeWidth * 0.8) / scale;
  //     }
  
  //     // Redraw the signature from the existing data
  //     const data = signaturePad.toData();
  //     signaturePad.clear();
  //     signaturePad.fromData(data);
  //   }
  // };

  // const resizeCanvas = () => {
  //   if (canvasRef.current && signaturePad) {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const scale = Math.min(rect.width / ow, rect.height / oh);
  
  //     const canvas = canvasRef.current;
  //     canvas.width = ow * scale;
  //     canvas.height = oh * scale;
  
  //     // Use a consistent stroke width regardless of speed
  //     const strokeWidth = originalStrokeWidth * scale;
  //     signaturePad.minWidth = strokeWidth;
  //     signaturePad.maxWidth = strokeWidth;
  
  //     // Redraw the signature from the existing data
  //     const data = signaturePad.toData();
  //     signaturePad.clear();
  //     signaturePad.fromData(data);
  //   }
  // };
  
  
  
  useEffect(() => {
    if (canvasRef.current && !signaturePad) {
      const sigPad = new SignPad(canvasRef.current, {
        backgroundColor: "rgb(255, 255, 255)",
      });
      setSignaturePad(sigPad);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [signaturePad]);

  const handleSave = () => {
    if (signaturePad) {
      const dataUrl = signaturePad.toDataURL("image/png");
      setIsSubmitted(true);
      // Post to backend
      // Example: postSignatureData(dataUrl);
    }
  };

  const handleClear = () => {
    signaturePad?.clear();
    setIsSubmitted(false);
  };

  return (
    <>
      <div className="select-none">
        <div className="relative border-[2px] border-[#A9A9A9] rounded-md bg-[#F5F5F5] h-[181.778px] w-full">
          {!isSubmitted ? (
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          ) : (
            <SignatureSubmittedSuccessFully />
          )}
        </div>
      </div>

      <div className="flex justify-between gap-x-3 my-2">
        <button
          disabled={isSubmitted}
          onClick={handleClear}
          className="bg-[#393939] py-[7px] text-center text-white rounded-md shadow-md w-full"
        >
          Clear
        </button>
        <button
          disabled={isSubmitted}
          onClick={handleSave}
          className="bg-[#393939] py-[7px] text-center text-white rounded-md shadow-md w-full"
        >
          Submit
        </button>
      </div>
    </>
  );
};

