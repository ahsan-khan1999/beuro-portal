import React from "react";
import PdfCard from "./PdfCard";
import { PdfPreviewDigitalSignature } from "./pages/pdf-preview-digital-signature";
import {PdfPreviewSignatureDocument} from "./pages/pdf-preview-signature-document";
import { PdfPreviewQrCode } from "./pages/pdf-preview-qr-code";

export const PdfPreview = () => {
  return (
    <div className="mt-[66px] mb-[30px]">
      <PdfCard />
      <div className="flex flex-col gap-y-[30px]">
        <PdfPreviewDigitalSignature />
        <PdfPreviewSignatureDocument />
        <PdfPreviewQrCode />
      </div>

      <button className="mt-[55px] w-full bg-[#45C769] rounded-[4px] shadow-md py-[10px] text-center text-white">
        Accepted
      </button>
    </div>
  );
};
