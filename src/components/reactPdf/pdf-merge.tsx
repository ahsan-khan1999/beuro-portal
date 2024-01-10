import React, { useEffect, useState } from "react";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import { PdfPreviewProps } from "@/types";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { mergePDFs } from "@/utils/utility";

import PdfFile from './pdf-file';


export const Merger = (pdfProps: PdfPreviewProps) => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndMergePDFs = async () => {
      try {
        const localPdfBlob = await reactPdf(<PdfFile {...pdfProps} />).toBlob();
        // const remotePdfResponse = await fetch(remotePdfUrl);
        // const remotePdfBlob = await remotePdfResponse.blob();
        const blobArray = [localPdfBlob];
        if (pdfProps.remoteFileBlob) {
          blobArray.push(pdfProps.remoteFileBlob);
        }
        const mergedPdfBytes = await mergePDFs(blobArray, pdfProps.fileName);
        const url = URL.createObjectURL(
          new Blob([mergedPdfBytes], { type: "application/pdf" })
        );
        setMergedPdfUrl(url);
      } catch (err) {
        console.error("Error merging PDFs:", err);
      }
    };

    fetchAndMergePDFs();

    return () => {
      mergedPdfUrl && URL.revokeObjectURL(mergedPdfUrl);
    };
  }, [pdfProps]);

  return !mergedPdfUrl ? (
    <LoadingState />
  ) : (
    <iframe
      height="1000"
      src={mergedPdfUrl}
      title="Merged PDF Document"
      width="100%"
      style={{ border: "none" }}
    />
  );
};
