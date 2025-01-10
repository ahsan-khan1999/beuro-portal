import { renderToStream } from "@react-pdf/renderer";
import { NextApiRequest, NextApiResponse } from "next";
import { ServerReportPdf } from "@/components/reportPdf/server-report-pdf";
import { BASEURL } from "@/services/HttpProvider";

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

    const { id, currentLanguage } = req.body;
    const { refreshtoken: refreshToken, accesstoken: accessToken } =
      req.headers;

    if (!accessToken || !refreshToken) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Missing or invalid tokens." });
    }

    const commonHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      accessToken: accessToken as string,
      refreshToken: refreshToken as string,
    };

    const endpoints = [
      `${BASEURL}/setting/template`,
      `${BASEURL}/setting/mail-setting/mail-setting`,
      `${BASEURL}/offer/${id}`,
      `${BASEURL}/setting/system-setting/`,
    ];

    const [template, emailTemplate, offerData, settings] = await Promise.all(
      endpoints.map((url) => fetch(url, { headers: commonHeaders }))
    );

    const qrCodeResponse = await fetch(
      `${BASEURL}/contract/generate-QrCode/${id}`,
      {
        headers: commonHeaders,
      }
    );

    const [
      responseTemplate,
      responseMailTemplate,
      responseOffer,
      responseSettings,
      qrCodeData,
    ] = await Promise.all([
      template.json(),
      emailTemplate.json(),
      offerData.json(),
      settings.json(),
      qrCodeResponse.ok ? qrCodeResponse.blob() : null,
    ]);

    const pdfStream = await renderToStream(
      <ServerReportPdf
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
