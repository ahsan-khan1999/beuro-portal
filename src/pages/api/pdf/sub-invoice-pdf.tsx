import { NextApiRequest, NextApiResponse } from "next";
import { pdf as reactPdf } from "@react-pdf/renderer";
import { ServerPdf } from "@/components/reactPdf/server-pdf-file";
import { mergePDFs } from "@/utils/utility";
import { BASEURL } from "@/services/HttpProvider";
import { staticEnums } from "@/utils/static";
import { InvoiceEmailHeaderProps, PdfProps } from "@/types";

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
      `${BASEURL}/invoice/invoice-collection/read/${id}`,
      `${BASEURL}/invoice/invoice-collection/generate-pdf/${id}`,
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
    const pdfData = responseInvoice?.data?.InvoiceCollection;
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

    const invoicePDFData: PdfProps<InvoiceEmailHeaderProps> = {
      id: pdfData?.id,
      attachement: pdfData?.attachement,
      emailHeader: {
        contractId: pdfData?.invoiceNumber,
        workerName: pdfData?.invoiceID?.createdBy?.fullName,
        contractStatus: pdfData?.invoiceStatus,
        contentName: pdfData?.invoiceID?.content?.contentName,
        contractTitle: pdfData?.title,
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
          name: pdfData?.invoiceID?.customerDetail.fullName,
          companyName: pdfData?.invoiceID?.customerDetail?.companyName,
          city: pdfData?.invoiceID?.customerDetail?.address?.country,
          postalCode: pdfData?.invoiceID?.customerDetail?.address?.postalCode,
          streetWithNumber:
            pdfData?.invoiceID?.customerDetail?.address?.streetNumber,
        },
        email: pdfData?.invoiceID?.customerDetail?.email,
        phone: pdfData?.invoiceID?.customerDetail?.phoneNumber,
        mobile: pdfData?.invoiceID?.customerDetail?.mobileNumber,
        gender: pdfData?.invoiceID?.customerDetail?.gender?.toString(),
        isReverseInfo: templateSetting?.order,
      },
      movingDetails: {
        address: pdfData?.invoiceID?.addressID?.address,
        header: pdfData?.title as string,
        workDates: pdfData?.invoiceID?.date,
        handleTitleUpdate: () => {},
        handleDescriptionUpdate: () => {},
        time: pdfData?.invoiceID?.time,
      },
      serviceItem: pdfData?.invoiceID?.serviceDetail?.serviceDetail,
      serviceItemFooter: {
        isTax: pdfData?.invoiceID?.isTax,
        isDiscount: pdfData?.invoiceID?.isDiscount,
        subTotal: pdfData?.invoiceID?.subTotal?.toString(),
        tax: pdfData?.invoiceID?.taxAmount?.toString(),
        discount: pdfData?.invoiceID?.discountAmount?.toString(),
        discountType: pdfData?.invoiceID?.discountType,
        discountPercentage: discountPercentage?.toString(),
        updatedDiscountAmount: updatedTotalDiscount?.toString(),
        grandTotal: pdfData?.invoiceID?.total?.toString(),
        invoiceCreatedAmount:
          pdfData?.invoiceID?.invoiceCreatedAmount?.toString(),
        invoicePaidAmount: pdfData?.invoiceID?.paidAmount?.toString(),
        isShowExtraAmount: true,
        isSubInvoicePdf: true,
        dueAmount: pdfData?.amount?.toString(),
        invoiceAmount: pdfData?.invoiceID?.paidAmount?.toString(),
        invoiceStatus: pdfData?.invoiceStatus?.toString(),
        taxType: pdfData?.invoiceID?.taxType,
        payments: pdfData?.payments,
        serviceDiscountSum:
          pdfData?.invoiceID?.serviceDetail?.serviceDetail?.reduce(
            (acc: number, service: { discount?: number }) => {
              const price = service?.discount || 0;
              return acc + price;
            },
            0
          ),
        discountDescription: pdfData?.invoiceID?.discountDescription,
      },
      footerDetails: {
        columnSettings: null,
      },
      aggrementDetails: pdfData?.additionalDetails || "",
      isOffer: true,
    };

    const invoiceQRCode = qrCodeData?.data?.qrcode || pdfData?.qrCode;

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
