import React, { useEffect, useState } from "react";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { ReportPdfPreviewProps } from "@/types";
import { blobToFile, mergePDFs } from "@/utils/utility";
import { useAppSelector } from "@/hooks/useRedux";
import ReportPdf from "./generate-report-pdf";

export const useMergedReportPdfDownload = ({
  data,
  remoteFileBlob,
  fileName,
  systemSetting,
}: ReportPdfPreviewProps) => {
  const [mergedFile, setMergedFile] = useState<File | null>(null);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isPdfRendering, setIsPdfRendering] = useState(false);
  const { currentLanguage } = useAppSelector((state) => state.global);

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
                language: currentLanguage,
                systemSetting,
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
      } catch (err) {
        setIsPdfRendering(false);
        console.error("Error merging PDFs:", err);
      }
    })();
  }, [data, remoteFileBlob, currentLanguage, systemSetting]);

  useEffect(() => {
    if (mergedPdfUrl) setIsPdfRendering(false);
  }, [mergedPdfUrl]);

  return { mergedFile, mergedPdfUrl, isPdfRendering };
};
