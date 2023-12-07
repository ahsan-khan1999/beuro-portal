import React, { useEffect, useRef, useState } from "react";
import SignPad from "signature_pad";
import { SignatureSubmittedSuccessFully } from "./signature-submitted-success";

const ow = 383;
const oh = 153;
const originalStrokeWidth = 1;

export const SignaturePad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignPad | null>(null);
  const [signatureData, setSignatureData] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const sigPad = new SignPad(canvas, {
        backgroundColor: "rgb(255, 255, 255)",
      });
      setSignaturePad(sigPad);

      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = rect.width / ow;
      const scaleY = rect.height / oh;
      setScale(Math.min(scaleX, scaleY));

      canvas.width = ow * scale;
      canvas.height = oh * scale;
      sigPad?.clear();

      sigPad.minWidth = originalStrokeWidth / scale;
      sigPad.maxWidth = (originalStrokeWidth * 0.8) / scale;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const sigPad = new SignPad(canvas, {
          backgroundColor: "rgb(255, 255, 255)",
        });
        setSignaturePad(sigPad);
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = rect.width / ow;
        const scaleY = rect.height / oh;
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);

        canvasRef.current.width = ow * newScale;
        canvasRef.current.height = oh * newScale;
        signaturePad?.clear();
        sigPad.minWidth = originalStrokeWidth / newScale;
        sigPad.maxWidth = (originalStrokeWidth * 0.8) / newScale;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    if (signaturePad) {
      const dataUrl = signaturePad.toSVG({ includeBackgroundColor: false });
      setSignatureData(dataUrl);
      setIsSubmitted(true);
      //post to backend
    }
  };

  const handleClear = () => {
    signaturePad?.clear();
    setIsSubmitted(false);
    setSignatureData("");
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
          className={`bg-[#393939] py-[7px] text-center text-white rounded-md shadow-md w-full`}
        >
          Clear
        </button>
        <button
          disabled={isSubmitted}
          id="sig-submitBtn"
          onClick={handleSave}
          className="bg-[#393939] py-[7px] text-center text-white rounded-md shadow-md w-full"
        >
          Submit
        </button>
      </div>
    </>
  );
};
