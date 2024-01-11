import React, { useEffect, useState } from "react";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { PdfPreviewProps } from "@/types";
import { blobToFile, mergePDFs } from "@/utils/utility";
import PdfFile from "./pdf-file";

export const useMergedPdfDownload = ({
  emailTemplateSettings,
  templateSettings,
  systemSetting,
  data,
  remoteFileBlob,
}: PdfPreviewProps) => {
  const [mergedFile, setMergedFile] = useState<File | null>(null);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isPdfRendering, setIsPdfRendering] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsPdfRendering(true);
        let blobArray: Blob[] = [];
        if (
          data &&
          emailTemplateSettings &&
          templateSettings &&
          (systemSetting || true)
        ) {
          const localPdfBlob = await reactPdf(
            <PdfFile {...{ data, emailTemplateSettings, templateSettings }} />
          ).toBlob();
          blobArray.push(localPdfBlob);
        }
        if (remoteFileBlob) {
          blobArray.push(remoteFileBlob);
        }
        if (blobArray.length > 0) {
          const mergedPdfBlob = await mergePDFs(blobArray);
          const convertedBlob = new Blob([mergedPdfBlob], {
            type: "application/pdf",
          });
          const url = URL.createObjectURL(convertedBlob);

          setMergedFile(blobToFile(convertedBlob, "talha" || "output.pdf"));
          setMergedPdfUrl(url);
        }
      } catch (err) {
        setIsPdfRendering(false);
        console.error("Error merging PDFs:", err);
      }
    })();
  }, [
    data,
    remoteFileBlob,
    systemSetting,
    emailTemplateSettings,
    templateSettings,
  ]);

  useEffect(() => {
    if (mergedPdfUrl) setIsPdfRendering(false);
  }, [mergedPdfUrl]);

  return { mergedFile, mergedPdfUrl, isPdfRendering };
};
