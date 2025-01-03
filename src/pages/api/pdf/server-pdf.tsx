import { NextApiRequest, NextApiResponse } from "next";
import { renderToStream } from "@react-pdf/renderer";
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

    const { emailTemplateSettings, templateSettings, offer, systemSetting } =
      req.body;

    const pdfStream = await renderToStream(
      <ServerPdf
        {...{
          data: offer,
          emailTemplateSettings,
          templateSettings,
          systemSetting,
          lang: "de",
          isOfferPdf: true,
          showContractSign: true,
        }}
      />
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      `Content-Disposition`,
      `attachment; filename=${offer?.headerDetails?.companyName}-Angebot-${offer?.headerDetails?.offerNo}.pdf`
    );

    pdfStream.pipe(res);

    pdfStream.once("error", (error) => {
      res.status(500).json({ message: "Failed to render PDF." });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
