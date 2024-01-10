import React, { useEffect, useState } from "react";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import { PdfPreviewProps } from "@/types";
import { blobToFile } from "@/utils/utility";

import PdfFile from './pdf-file';

const mergePDFs = async (pdfBlobs: Blob[]): Promise<Blob> => {
  const mergedPdf = await PDFDocument.create();

  for (const blob of pdfBlobs) {
    const arrayBuffer =
      blob instanceof ArrayBuffer ? blob : await blob.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(
      pdfDoc,
      pdfDoc.getPageIndices()
    );
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};

const useMergedPdfDownload = (pdfProps: PdfPreviewProps) => {
  const [mergedFile, setMergedFile] = useState<File | null>(null);

  useEffect(() => {
    const remotePdfUrl = pdfProps.qrCode || "";
    const fetchAndMergePDFs = async () => {
      try {
        const localPdfBlob = await reactPdf(<PdfFile {...pdfProps} />).toBlob();
        // const remotePdfResponse = await fetch(remotePdfUrl);
        // const remotePdfBlob = await remotePdfResponse.blob();
        const blobArray = [localPdfBlob];
        if (pdfProps.remoteFileBlob) {
          blobArray.push(pdfProps.remoteFileBlob);
        }
        const mergedPdfBlob = await mergePDFs(blobArray);
        const convertedBlob = new Blob([mergedPdfBlob], {
          type: "application/pdf",
        });

        setMergedFile(
          blobToFile(convertedBlob, pdfProps.fileName || "output.pdf")
        );
      } catch (err) {
        console.error("Error merging PDFs:", err);
      }
    };

    fetchAndMergePDFs();
  }, [pdfProps]);

  return { mergedFile };
};

export default useMergedPdfDownload;
