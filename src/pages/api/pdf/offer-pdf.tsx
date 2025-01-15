import { NextApiRequest, NextApiResponse } from "next";
import { renderToStream } from "@react-pdf/renderer";
import { ServerPdf } from "@/components/reactPdf/server-pdf-file";
import { BASEURL } from "@/services/HttpProvider";
import { staticEnums } from "@/utils/static";

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
      `${BASEURL}/offer/${id}`,
      `${BASEURL}/setting/system-setting/`,
    ];

    const [template, emailTemplate, offerData, settings] = await Promise.all(
      endpoints.map((url) => fetch(url, { headers: commonHeaders }))
    );

    const [
      responseTemplate,
      responseMailTemplate,
      responseOffer,
      responseSettings,
    ] = await Promise.all([
      template.json(),
      emailTemplate.json(),
      offerData.json(),
      settings.json(),
    ]);

    const pdfData = responseOffer?.data?.Offer;
    const mailSetting = responseMailTemplate?.data?.MailSetting;
    const templateSetting = responseTemplate?.data?.Template;
    const systemSetting = responseSettings?.data?.Setting;

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

    const offerPDFData = {
      id: pdfData?.id,
      attachement: pdfData?.attachement,
      emailHeader: {
        offerNo: pdfData?.offerNumber,
        emailStatus: pdfData?.emailStatus,
        contractTitle: pdfData?.title,
        worker: pdfData?.createdBy?.fullName,
      },
      headerDetails: {
        offerNo: pdfData?.offerNumber,
        companyName: pdfData?.createdBy?.company?.companyName,
        offerDate: pdfData?.createdAt,
        createdBy: pdfData?.createdBy?.fullName,
        emailTemplateSettings: mailSetting,
        isReverseLogo: templateSetting?.order,
        logo: mailSetting?.logo,
      },
      contactAddress: {
        address: {
          name: pdfData?.leadID?.customerDetail?.fullName,
          companyName: pdfData?.leadID?.customerDetail?.companyName,
          city: pdfData?.leadID?.customerDetail?.address?.country,
          postalCode: pdfData?.leadID?.customerDetail?.address?.postalCode,
          streetWithNumber:
            pdfData?.leadID?.customerDetail?.address?.streetNumber,
        },
        email: pdfData?.leadID?.customerDetail?.email,
        phone: pdfData?.leadID?.customerDetail?.phoneNumber,
        mobile: pdfData?.leadID?.customerDetail?.mobileNumber,
        gender: pdfData?.leadID?.customerDetail?.gender?.toString(),
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
        discountPercentage: discountPercentage.toString(),
        updatedDiscountAmount: updatedTotalDiscount.toString(),
        grandTotal: pdfData?.total?.toString(),
        discountType: pdfData?.discountType,
        taxType: pdfData?.taxType,
        isOfferPDF: true,
        serviceDiscountSum: pdfData?.serviceDetail?.serviceDetail?.reduce(
          (acc: number, service: { discount?: number }) => {
            const price = service?.discount || 0;
            return acc + price;
          },
          0
        ),
        discountDescription: pdfData?.discountDescription,
      },
      footerDetails: {
        firstColumn: {
          companyName: pdfData?.createdBy?.company?.companyName,
          email: pdfData?.createdBy?.email,
          phoneNumber: pdfData?.createdBy?.company?.phoneNumber,
          taxNumber: pdfData?.createdBy?.company?.taxNumber,
          website: pdfData?.createdBy?.company?.website,
        },
        secondColumn: {
          address: {
            postalCode: pdfData?.createdBy?.company?.address?.postalCode,
            streetNumber: pdfData?.createdBy?.company?.address?.streetNumber,
          },
          bankDetails: {
            accountNumber:
              pdfData?.createdBy?.company?.bankDetails?.accountNumber,
            bankName: pdfData?.createdBy?.company?.bankDetails?.bankName,
            ibanNumber: pdfData?.createdBy?.company?.bankDetails?.ibanNumber,
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
        totalPages: 10,
      },
      aggrementDetails: pdfData?.additionalDetails || "",
    };

    const pdfStream = await renderToStream(
      <ServerPdf
        {...{
          data: offerPDFData,
          emailTemplateSettings: mailSetting,
          templateSettings: templateSetting,
          systemSetting: systemSetting,
          lang: currentLanguage,
          isOfferPdf: true,
          showContractSign: true,
        }}
      />
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${pdfData?.createdBy?.company?.companyName}-Angebot-${pdfData?.offerNumber}.pdf`
    );

    pdfStream.pipe(res);

    pdfStream.once("error", (error) => {
      res.status(500).json({ message: "Failed to render PDF." });
    });
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res
      .status(500)
      .json({ message: "Failed to render and merge PDFs.", error });
  }
}
