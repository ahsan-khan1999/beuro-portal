import React, { useEffect, useRef, useState } from "react";
import SignPad from "signature_pad";
import { SignatureSubmittedSuccessFully } from "./signature-submitted-success";

export const SignaturePad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignPad | null>(null);
  const [signatureData, setSignatureData] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Set up the canvas dimensions to match its display size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const sigPad = new SignPad(canvas, {
        backgroundColor: "rgb(255, 255, 255)",
      });
      setSignaturePad(sigPad);
    }
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
      <div>
        <div className="relative border-[2px] border-[#A9A9A9] rounded-md bg-[#F5F5F5] h-[181.778px] w-full">
          {!isSubmitted ? (
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          ) : (
            <SignatureSubmittedSuccessFully />
          )}
        </div>
        {signatureData && (
          <div className="flex flex-col items-center justify-center h-full">
            <div dangerouslySetInnerHTML={{ __html: signatureData }} />
          </div>
        )}
      </div>

      <div className="flex justify-between gap-x-3 my-2">
        <button
          onClick={handleClear}
          className="bg-[#393939] py-[7px] text-center text-white rounded-md shadow-md w-full"
        >
          Clear
        </button>
        <button
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
