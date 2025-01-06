import { renderToStream } from "@react-pdf/renderer";
import { NextApiRequest, NextApiResponse } from "next";
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

    const { emailTemplateSettings, templateSettings, pdfData, systemSetting } =
      req.body;

    const pdfStream = await renderToStream(
      <ReportPdf
        {...{
          data: pdfData,
          emailTemplateSettings,
          templateSettings,
          systemSetting,
          lang: pdfData?.currentLanguage,
        }}
      />
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      `Content-Disposition`,
      `attachment; filename=${pdfData?.headerDetails?.companyName}-Angebot-${pdfData?.headerDetails?.offerNo}.pdf`
    );

    pdfStream.pipe(res);

    pdfStream.once("error", (error) => {
      res.status(500).json({ message: "Failed to render PDF." });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
