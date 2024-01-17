import React, { SetStateAction, useEffect, useRef, useState } from "react";
import SignPad from "signature_pad";
import { SignatureSubmittedSuccessFully } from "./signature-submitted-success";
import localStoreUtil from "@/utils/localstore.util";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { uploadFileToFirebase } from "@/api/slices/globalSlice/global";
import { Button } from "@/base-components/ui/button/button";
import Image from "next/image";
import { dataURLtoBlob, smoothScrollToSection } from "@/utils/utility";
import { useTranslation } from "next-i18next";

const ow = 442;
const oh = 173;
const originalStrokeWidth = 1;

export const SignaturePad = ({ signature, isCanvas, setIsSignatureDone,
  isSignatureDone, setOfferSignature, handleSignature }: {
    signature?: string, isCanvas?: boolean, setIsSignatureDone?: SetStateAction<boolean>,
    isSignatureDone?: boolean, setOfferSignature?: SetStateAction<any>, handleSignature?: (sign: any) => void
  }) => {
  const dispatch = useAppDispatch()
  const {t:translate} = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignPad | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loading } = useAppSelector(state => state.global)
  const resizeCanvas = () => {
    if (canvasRef.current && signaturePad) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scale = Math.min(rect.width / ow, rect.height / oh);

      const canvas = canvasRef.current;
      canvas.width = ow * scale;
      canvas.height = oh * scale;

      const adjustedScale = scale < 1 ? (scale * 2) * 3  : scale;
      const scaledStrokeWidth = originalStrokeWidth / adjustedScale;
      
      signaturePad.minWidth = scaledStrokeWidth;
      signaturePad.maxWidth = (scaledStrokeWidth * 0.7);

      // Redraw the signature from the existing data
      const data = signaturePad.toData();
      signaturePad.clear();
      signaturePad.fromData(data);
    }
  };





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

  const handleSave = async () => {
    if (signaturePad) {

      const canvasData = signaturePad.toData();
      if (canvasData?.length > 0) {
        const formdata = new FormData()
        const svgContent = signaturePad.toDataURL("image/png");
        const blob = dataURLtoBlob(svgContent);
        const file = new File([blob], 'signature.png', { type: 'image/png' });
        setOfferSignature && setOfferSignature(file)
        if (handleSignature) handleSignature(file)
        setIsSubmitted(true);
        //@ts-expect-error
        setIsSignatureDone && setIsSignatureDone(true);
        // smoothScrollToSection("#acceptOffer")

        // Function to handle scrolling

       
        // window.scrollTo(0, document.body.scrollHeight - window.innerHeight);

      }
    }
  };

  const handleClear = () => {
    signaturePad?.clear();
    setIsSubmitted(false);
  };

  return (
    !signature &&
    <>
      <div className="select-none mb-4">
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
          {translate("pdf.clear")}
        </button>
        <Button
          id="signature"
          inputType="button"
          onClick={handleSave}
          disabled={isSubmitted}
          loading={loading}
          text={translate("pdf.submit")}
          className="bg-[#393939]  text-center text-white rounded-md shadow-md w-full"
        />

      </div>
    </> ||
    <div className="select-none mb-4">
      <div className="relative border-[2px] border-[#A9A9A9] rounded-md bg-[#F5F5F5] h-[181.778px] w-full">
        {signature && <Image src={signature} alt="signature" height={177} width={446} />}
      </div>
    </div>
  );
};

