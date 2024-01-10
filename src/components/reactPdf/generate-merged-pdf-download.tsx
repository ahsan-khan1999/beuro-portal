import React, { useEffect } from "react";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { PdfFile } from "./pdf-file";
import { PDFDocument } from "pdf-lib";
import { PdfPreviewProps } from "@/types";
import { blobToFile } from "@/utils/utility";

const mergePDFs = async (pdfBlobs: Blob[]) => {
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

const generateMergedPdfDownload = (pdfProps: PdfPreviewProps) => {
  useEffect(() => {
    const remotePdfUrl = pdfProps.qrCode || "";
    const fetchAndMergePDFs = async () => {
      try {
        const localPdfBlob = await reactPdf(<PdfFile {...pdfProps} />).toBlob();
        const remotePdfResponse = await fetch(remotePdfUrl);
        const remotePdfBlob = await remotePdfResponse.blob();
        const mergedPdfBytes = await mergePDFs([localPdfBlob, remotePdfBlob]);
        const convertedBlob = new Blob([mergedPdfBytes], {
          type: "application/pdf",
        });

        pdfProps.setPdfFile(
          blobToFile(convertedBlob, pdfProps.fileName || "output.pdf")
        );
      } catch (err) {
        console.error("Error merging PDFs:", err);
      }
    };

    fetchAndMergePDFs();
  }, []);

  return <></>;
};

export default generateMergedPdfDownload;
