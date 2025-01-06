import { NextApiRequest, NextApiResponse } from "next";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { mergePDFs } from "@/utils/utility";
import ReportPdf from "@/components/reportPdf/generate-report-pdf";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ message: "Only POST requests are allowed" });
    }

    const {
      emailTemplateSettings,
      templateSettings,
      pdfData,
      systemSetting,
      qrCodeUrl,
    } = req.body;

    const blobArray: Blob[] = [];

    const pdfBlob = await reactPdf(
      <ReportPdf
        {...{
          data: pdfData,
          emailTemplateSettings,
          templateSettings,
          systemSetting,
          lang: pdfData?.currentLanguage,
        }}
      />
    ).toBlob();
    blobArray.push(pdfBlob);

    if (qrCodeUrl) {
      try {
        const remotePdfResponse = await fetch(qrCodeUrl);
        if (!remotePdfResponse.ok) {
          console.warn(`Failed to fetch remote PDF: ${qrCodeUrl}`);
        } else {
          const remotePdfBlob = await remotePdfResponse.blob();
          blobArray.push(remotePdfBlob);
        }
      } catch (err) {
        console.warn("Error fetching remote PDF:", err);
      }
    }

    const mergedPdfBlob =
      blobArray?.length > 1
        ? await mergePDFs(blobArray, pdfData?.headerDetails?.offerNo)
        : pdfBlob;

    const arrayBuffer = await mergedPdfBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${pdfData?.headerDetails?.companyName}-Vertrag-${
        pdfData?.headerDetails?.offerNo || "file"
      }.pdf`
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res
      .status(500)
      .json({ message: "Failed to render and merge PDFs.", error });
  }
}
