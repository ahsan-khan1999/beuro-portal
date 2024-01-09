import React, { useEffect, useState } from "react";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { PdfFile } from "./pdf-file";
import { PDFDocument } from 'pdf-lib';
import { PdfPreviewProps } from "@/types";
import LoadingState from "@/base-components/loadingEffect/loading-state";

export const mergePDFs = async (pdfBlobs: Blob[]) => {
  const mergedPdf = await PDFDocument.create();

  for (const blob of pdfBlobs) {
    const arrayBuffer = blob instanceof ArrayBuffer ? blob : await blob.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};

export const Merger = (pdfProps: PdfPreviewProps) => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const remotePdfUrl = pdfProps.qrCode || "";

  useEffect(() => {
    const fetchAndMergePDFs = async () => {
      try {
        const localPdfBlob = await reactPdf(<PdfFile {...pdfProps} />).toBlob();
        const remotePdfResponse = await fetch(remotePdfUrl);
        const remotePdfBlob = await remotePdfResponse.blob();
        const mergedPdfBytes = await mergePDFs([localPdfBlob, remotePdfBlob]);
        const url = URL.createObjectURL(new Blob([mergedPdfBytes], { type: "application/pdf" }));
        setMergedPdfUrl(url);
      } catch (err) {
        console.error("Error merging PDFs:", err);
      }
    };

    fetchAndMergePDFs();

    return () => {
      mergedPdfUrl && URL.revokeObjectURL(mergedPdfUrl);
    };
  }, [pdfProps, remotePdfUrl]);

  return !mergedPdfUrl ? (
    <LoadingState />
  ) : (
    <iframe
      height="1000"
      src={mergedPdfUrl}
      title="PDF Viewer"
      width="100%"
    />
  );
};
