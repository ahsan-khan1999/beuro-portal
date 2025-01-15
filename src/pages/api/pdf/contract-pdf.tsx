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
      `${BASEURL}/contract/${id}`,
      `${BASEURL}/setting/system-setting/`,
    ];

    const [template, emailTemplate, contractData, settings] = await Promise.all(
      endpoints.map((url) => fetch(url, { headers: commonHeaders }))
    );

    // const contractQRCode = await fetch(
    //   `${BASEURL}/contract/generate-QrCode/${id}`,
    //   {
    //     headers: commonHeaders,
    //   }
    // );

    const [
      responseTemplate,
      responseMailTemplate,
      responseContract,
      responseSettings,
      //   qrCodeData,
    ] = await Promise.all([
      template.json(),
      emailTemplate.json(),
      contractData.json(),
      settings.json(),
      //   contractQRCode.ok ? contractQRCode.blob() : null,
    ]);

    const mailSetting = responseMailTemplate?.data?.MailSetting;
    const templateSetting = responseTemplate?.data?.Template;
    const systemSetting = responseSettings?.data?.Setting;

    const pdfData = responseContract?.data?.Contract;
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

    const contractPDFData: PdfProps<ContractEmailHeaderProps> = {
      id: pdfData?.id,
      attachement: pdfData?.attachement,
      emailHeader: {
        offerNo: pdfData?.contractNumber,
        emailStatus: pdfData?.contractStatus,
        contractTitle: pdfData?.title,
        worker: pdfData?.offerID?.createdBy?.fullName,
      },
      headerDetails: {
        offerNo: pdfData?.contractNumber,
        offerDate: pdfData?.createdAt,
        createdBy: pdfData?.offerID?.createdBy?.fullName,
        logo: mailSetting?.logo,
        emailTemplateSettings: mailSetting,
        isReverseLogo: templateSetting?.order,
        fileType: "contract",
        companyName: pdfData?.offerID?.createdBy?.company?.companyName,
      },
      contactAddress: {
        address: {
          name: pdfData?.offerID?.leadID?.customerDetail?.fullName,
          companyName: pdfData?.offerID?.leadID?.customerDetail?.companyName,
          city: pdfData?.offerID?.leadID?.customerDetail?.address?.country,
          postalCode:
            pdfData?.offerID?.leadID?.customerDetail?.address?.postalCode,
          streetWithNumber:
            pdfData?.offerID?.leadID?.customerDetail?.address?.streetNumber,
        },
        email: pdfData?.offerID?.leadID?.customerDetail?.email,
        phone: pdfData?.offerID?.leadID?.customerDetail?.phoneNumber,
        mobile: pdfData?.offerID?.leadID?.customerDetail?.mobileNumber,
        gender: pdfData?.offerID?.leadID?.customerDetail?.gender?.toString(),
        isReverseInfo: templateSetting?.order,
      },
      movingDetails: {
        address: pdfData?.offerID?.addressID?.address,
        header: pdfData?.title,
        workDates: pdfData?.offerID?.date,
        handleTitleUpdate: () => {},
        handleDescriptionUpdate: () => {},
        time: pdfData?.offerID?.time,
      },
      serviceItem: pdfData?.offerID?.serviceDetail?.serviceDetail,
      serviceItemFooter: {
        isTax: pdfData?.offerID?.isTax,
        isDiscount: pdfData?.offerID?.isDiscount,
        subTotal: pdfData?.offerID?.subTotal?.toString(),
        tax: pdfData?.offerID?.taxAmount?.toString(),
        discount: pdfData?.offerID?.discountAmount?.toString(),
        discountType: pdfData?.offerID?.discountType,
        discountPercentage: discountPercentage?.toString(),
        updatedDiscountAmount: updatedTotalDiscount?.toString(),
        grandTotal: pdfData?.offerID?.total?.toString(),
        taxType: pdfData?.offerID?.taxType,
        isContractPDF: true,
        serviceDiscountSum:
          pdfData?.offerID?.serviceDetail?.serviceDetail?.reduce(
            (acc: number, service: { discount?: number }) => {
              const price = service?.discount || 0;
              return acc + price;
            },
            0
          ),
        discountDescription: pdfData?.offerID?.discountDescription,
      },
      footerDetails: {
        firstColumn: {
          companyName: "",
          email: "",
          phoneNumber: "",
          taxNumber: 0,
          website: "",
        },
        secondColumn: {
          address: {
            postalCode: "",
            streetNumber: "",
          },
          bankDetails: {
            accountNumber: "",
            bankName: "",
            ibanNumber: "",
          },
        },
        thirdColumn: {
          row1: "Standorte",
          row2: "bern-Solothurn",
          row3: "Aargau-Luzern",
          row4: "Basel-Zürich",
          row5: "",
        },
        fourthColumn: {},
        columnSettings: null,
        currPage: 1,
        totalPages: 0,
      },
      aggrementDetails: pdfData?.additionalDetails || "",
    };

    const qrCode = pdfData?.qrCode;

    const pdfBlob = await reactPdf(
      <ServerPdf
        {...{
          data: contractPDFData,
          emailTemplateSettings: mailSetting,
          templateSettings: templateSetting,
          systemSetting: systemSetting,
          qrCode: qrCode,
          lang: currentLanguage,
          showContractSign: true,
        }}
      />
    ).toBlob();
    blobArray.push(pdfBlob);

    if (qrCode) {
      try {
        const remotePdfResponse = await fetch(qrCode);
        if (!remotePdfResponse.ok) {
          console.warn(`Failed to fetch remote PDF: ${qrCode}`);
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
