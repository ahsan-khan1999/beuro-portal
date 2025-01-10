import { NextApiRequest, NextApiResponse } from "next";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { ServerPdf } from "@/components/reactPdf/server-pdf-file";
import { mergePDFs } from "@/utils/utility";
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

    const { offerID, currentLanguage } = req.body;
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
      `${BASEURL}/offer/${offerID}`,
      `${BASEURL}/setting/system-setting/`,
    ];

    const [template, emailTemplate, offerData, settings] = await Promise.all(
      endpoints.map((url) => fetch(url, { headers: commonHeaders }))
    );

    const qrCodeResponse = await fetch(
      `${BASEURL}/contract/generate-QrCode/${offerID}`,
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

    const pdfData = responseOffer?.data?.Offer;
    const blobArray: Blob[] = [];

    const pdfBlob = await reactPdf(
      <ServerPdf
        {...{
          data: pdfData,
          emailTemplateSettings: responseMailTemplate?.MailSetting,
          templateSettings: responseTemplate?.Template,
          systemSetting: responseSettings?.Setting,
          lang: currentLanguage,
          isOfferPdf: true,
          showContractSign: true,
        }}
      />
    ).toBlob();
    blobArray.push(pdfBlob);

    if (qrCodeData) blobArray.push(qrCodeData);

    const mergedPdfBlob =
      blobArray.length > 1
        ? await mergePDFs(blobArray, pdfData?.headerDetails?.offerNo)
        : pdfBlob;

    const buffer = Buffer.from(await mergedPdfBlob.arrayBuffer());

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
