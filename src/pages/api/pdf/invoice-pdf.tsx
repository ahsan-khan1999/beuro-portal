import { NextApiRequest, NextApiResponse } from "next";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { ServerPdf } from "@/components/reactPdf/server-pdf-file";
import { mergePDFs } from "@/utils/utility";
import { BASEURL } from "@/services/HttpProvider";
import { staticEnums } from "@/utils/static";
import { ContractEmailHeaderProps, PdfProps } from "@/types";

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
      `${BASEURL}/invoice/${id}`,
      `${BASEURL}/invoice/generate-QrCode/${id}`,
      `${BASEURL}/setting/system-setting/`,
    ];

    const [template, emailTemplate, invoiceData, qrCode, settings] =
      await Promise.all(
        endpoints.map((url) => fetch(url, { headers: commonHeaders }))
      );

    const [
      responseTemplate,
      responseMailTemplate,
      responseInvoice,
      qrCodeData,
      responseSettings,
    ] = await Promise.all([
      template.json(),
      emailTemplate.json(),
      invoiceData.json(),
      qrCode.json(),
      settings.json(),
    ]);

    const mailSetting = responseMailTemplate?.data?.MailSetting;
    const templateSetting = responseTemplate?.data?.Template;
    const systemSetting = responseSettings?.data?.Setting;
    const pdfData = responseInvoice?.data?.Invoice;
    const blobArray: Blob[] = [];

    let serviceDiscountSum = pdfData?.serviceDetail?.serviceDetail?.reduce(
      (acc: number, service: { discount?: number }) => {
        const price = service?.discount || 0;
        return acc + price;
      },
      0
    );

    const updatedTotalDiscount =
      (pdfData?.subTotal / 100) * pdfData?.discountAmount;

    let discountPercentage;
    if (
      staticEnums["DiscountType"][
        pdfData?.payload
          ?.discountType as keyof (typeof staticEnums)["DiscountType"]
      ] === 1
    ) {
      discountPercentage =
        ((pdfData?.discountAmount + serviceDiscountSum) / pdfData?.subTotal) *
        100;
    } else {
      discountPercentage =
        ((updatedTotalDiscount + serviceDiscountSum) / pdfData?.subTotal) * 100;
    }

    const invoicePDFData: PdfProps<ContractEmailHeaderProps> = {
      id: pdfData?.id,
      attachement: pdfData?.attachement,
      emailHeader: {
        offerNo: pdfData?.invoiceNumber,
        emailStatus: pdfData?.invoiceStatus,
        contractTitle: pdfData?.title,
        worker: pdfData?.createdBy?.fullName,
      },
      headerDetails: {
        offerNo: pdfData?.invoiceNumber,
        offerDate: pdfData?.createdAt,
        createdBy: pdfData?.createdBy?.fullName,
        emailTemplateSettings: mailSetting,
        isReverseLogo: templateSetting?.order,
        logo: mailSetting?.logo,
        fileType: "invoice",
        companyName: pdfData?.createdBy?.company?.companyName,
      },
      contactAddress: {
        address: {
          name: pdfData?.customerDetail?.fullName,
          companyName: pdfData?.customerDetail?.companyName,
          city: pdfData?.customerDetail?.address?.country,
          postalCode: pdfData?.customerDetail?.address?.postalCode,
          streetWithNumber: pdfData?.customerDetail?.address?.streetNumber,
        },
        email: pdfData?.customerDetail?.email,
        phone: pdfData?.customerDetail?.phoneNumber,
        mobile: pdfData?.customerDetail?.mobileNumber,

        gender: pdfData?.customerDetail?.gender?.toString(),
        isReverseInfo: templateSetting?.order,
      },
      movingDetails: {
        address: pdfData?.addressID?.address,
        header: pdfData?.title,
        workDates: pdfData?.date,
        handleTitleUpdate: () => {},
        handleDescriptionUpdate: () => {},
        time: pdfData?.time,
      },
      serviceItem: pdfData?.serviceDetail?.serviceDetail,
      serviceItemFooter: {
        isTax: pdfData?.isTax,
        isDiscount: pdfData?.isDiscount,
        subTotal: pdfData?.subTotal?.toString(),
        tax: pdfData?.taxAmount?.toString(),
        discount: pdfData?.discountAmount?.toString(),
        discountType: pdfData?.discountType,
        discountPercentage: discountPercentage?.toString(),
        updatedDiscountAmount: updatedTotalDiscount?.toString(),
        grandTotal: pdfData?.total?.toString(),
        invoicePaidAmount: pdfData?.paidAmount.toString(),
        invoiceAmount: pdfData?.paidAmount?.toString(),
        invoiceStatus: pdfData?.invoiceStatus?.toString(),
        taxType: pdfData?.taxType,
        payments: pdfData?.payments,
        serviceDiscountSum: pdfData?.serviceDetail?.serviceDetail?.reduce(
          (acc: number, service: { discount?: number }) => {
            const price = service?.discount || 0;
            return acc + price;
          },
          0
        ),
        discountDescription: pdfData?.discountDescription,
        isMainInvoice: true,
      },
      footerDetails: {
        columnSettings: null,
      },
      aggrementDetails: pdfData?.additionalDetails || "",
    };

    const invoiceQRCode = qrCodeData?.data?.qrcode;

    const pdfBlob = await reactPdf(
      <ServerPdf
        {...{
          data: invoicePDFData,
          emailTemplateSettings: mailSetting,
          templateSettings: templateSetting,
          systemSetting: systemSetting,
          qrCode: invoiceQRCode,
          lang: currentLanguage,
        }}
      />
    ).toBlob();
    blobArray.push(pdfBlob);

    if (invoiceQRCode) {
      try {
        const remotePdfResponse = await fetch(invoiceQRCode);
        if (!remotePdfResponse.ok) {
          console.warn(`Failed to fetch remote PDF: ${invoiceQRCode}`);
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
      `attachment; filename=${pdfData?.headerDetails?.companyName}-Rechnung-${
        pdfData?.invoiceNumber || "file"
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
