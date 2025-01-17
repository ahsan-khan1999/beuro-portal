import React, { useEffect, useState } from "react";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { PdfPreviewProps } from "@/types";
import { blobToFile, mergePDFs } from "@/utils/utility";
import PdfFile from "./pdf-file";
import { useAppSelector } from "@/hooks/useRedux";

export const useMergedPdfDownload = ({
  emailTemplateSettings,
  templateSettings,
  systemSetting,
  data,
  remoteFileBlob,
  fileName,
  companyName,
  isOfferPdf,
  showContractSign,
}: PdfPreviewProps) => {
  const [mergedFile, setMergedFile] = useState<File | null>(null);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isPdfRendering, setIsPdfRendering] = useState(false);
  const { currentLanguage } = useAppSelector((state) => state.global);

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
            <PdfFile
              {...{
                data,
                emailTemplateSettings,
                templateSettings,
                systemSetting,
                lang: currentLanguage,
                isOfferPdf,
                showContractSign,
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
  }, [
    data,
    remoteFileBlob,
    systemSetting,
    emailTemplateSettings,
    templateSettings,
    currentLanguage,
  ]);

  useEffect(() => {
    if (mergedPdfUrl) setIsPdfRendering(false);
  }, [mergedPdfUrl]);

  return { mergedFile, mergedPdfUrl, isPdfRendering };
};
