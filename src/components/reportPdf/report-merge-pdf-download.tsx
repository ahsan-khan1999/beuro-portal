import React, { useEffect, useState } from "react";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { PdfPreviewProps, ReportPdfPreviewProps } from "@/types";
import { blobToFile, mergePDFs } from "@/utils/utility";
import { useAppSelector } from "@/hooks/useRedux";
import ReportPdf from "./generate-report-pdf";

export const useMergedReportPdfDownload = ({
  emailTemplateSettings,
  templateSettings,
  systemSetting,
  data,
  remoteFileBlob,
  fileName,
}: PdfPreviewProps) => {
  const [mergedFile, setMergedFile] = useState<File | null>(null);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isPdfRendering, setIsPdfRendering] = useState(false);
  const { currentLanguage } = useAppSelector((state) => state.global);

  const clearMergedPdfUrl = () => {
    setMergedPdfUrl(null);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsPdfRendering(true);
        let blobArray: Blob[] = [];
        if (data && (systemSetting || true)) {
          const localPdfBlob = await reactPdf(
            <ReportPdf
              {...{
                data,
                emailTemplateSettings,
                templateSettings,
                systemSetting,
                lang: currentLanguage,
              }}
            />
          ).toBlob();
          blobArray.push(localPdfBlob);
        }
        if (remoteFileBlob) {
          blobArray.push(remoteFileBlob);
        }
        if (blobArray.length > 0) {
          const mergedPdfBlob = await mergePDFs(blobArray, fileName);
          const convertedBlob = new Blob([mergedPdfBlob], {
            type: "application/pdf",
          });
          const url = URL.createObjectURL(convertedBlob);
          setMergedFile(
            blobToFile(convertedBlob, `${fileName}.pdf` || "output.pdf")
          );
          setMergedPdfUrl(url);
        }
        setIsPdfRendering(false);
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
    currentLanguage,
  ]);

  useEffect(() => {
    if (mergedPdfUrl && isPdfRendering) {
      setIsPdfRendering(false);
    }
  }, [mergedPdfUrl]);

  return { mergedFile, mergedPdfUrl, isPdfRendering, clearMergedPdfUrl };
};
