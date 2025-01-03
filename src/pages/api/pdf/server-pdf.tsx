import { renderToStream } from "@react-pdf/renderer";
import { NextApiRequest, NextApiResponse } from "next";
import { ServerPdf } from "@/components/reactPdf/server-pdf-file";

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
      <ServerPdf
        {...{
          data: pdfData,
          emailTemplateSettings,
          templateSettings,
          systemSetting,
          lang: pdfData?.currentLanguage,
          ispdfDataPdf: pdfData.ispdfData,
          showContractSign: true,
        }}
      />
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      `Content-Disposition`,
      `attachment; filename=${pdfData?.headerDetails?.companyName}-Angebot-${pdfData?.headerDetails?.pdfDataNo}.pdf`
    );

    pdfStream.pipe(res);

    pdfStream.once("error", (error) => {
      res.status(500).json({ message: "Failed to render PDF." });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
