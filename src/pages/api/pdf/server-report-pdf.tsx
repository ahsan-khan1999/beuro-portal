import { renderToStream } from "@react-pdf/renderer";
import { NextApiRequest, NextApiResponse } from "next";
import { ServerReportPdf } from "@/components/reportPdf/server-report-pdf";
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
      `${BASEURL}/lead/report/${id}`,
      `${BASEURL}/setting/system-setting/`,
    ];

    const [template, emailTemplate, reportData, settings] = await Promise.all(
      endpoints.map((url) => fetch(url, { headers: commonHeaders }))
    );

    const [
      responseTemplate,
      responseMailTemplate,
      responseReport,
      responseSettings,
    ] = await Promise.all([
      template.json(),
      emailTemplate.json(),
      reportData.json(),
      settings.json(),
    ]);

    const mailSetting = responseMailTemplate?.data?.MailSetting;
    const templateSetting = responseTemplate?.data?.Template;
    const systemSetting = responseSettings?.data?.Setting;

    const report = responseReport?.data?.Report;

    let serviceDiscountSum = report?.serviceDetail?.serviceDetail?.reduce(
      (acc: number, service: { discount?: number }) => {
        const price = service?.discount || 0;
        return acc + price;
      },
      0
    );

    const updatedTotalDiscount =
      (report?.subTotal / 100) * report?.discountAmount;

    let discountPercentage;
    if (
      staticEnums["DiscountType"][
        report?.payload
          ?.discountType as keyof (typeof staticEnums)["DiscountType"]
      ] === 1
    ) {
      discountPercentage =
        ((report?.discountAmount + serviceDiscountSum) / report?.subTotal) *
        100;
    } else {
      discountPercentage =
        ((updatedTotalDiscount + serviceDiscountSum) / report?.subTotal) * 100;
    }

    // Report PDF data
    const reportPDFData: PdfProps<ContractEmailHeaderProps> = {
      id: report?.id,
      headerDetails: {
        offerNo: report?.appointmentID?.leadID?.refID,
        offerDate: report?.createdAt,
        createdBy: report?.appointmentID?.createdBy?.fullName || "",
        logo: mailSetting?.logo,
        emailTemplateSettings: mailSetting,
        isReverseLogo: templateSetting?.order,
        fileType: "report",
      },
      contactAddress: {
        address: {
          name: report?.customerDetail?.fullName,
          city: report?.customerDetail?.address?.country,
          postalCode: report?.customerDetail?.address?.postalCode,
          streetWithNumber: report?.customerDetail?.address?.streetNumber,
        },
        email: report?.customerDetail?.email,
        customerType: report?.customerDetail?.customerType,
        companyName: report?.customerDetail?.companyName,
        phone: report?.customerDetail?.phoneNumber,
        mobile: report?.customerDetail?.mobileNumber,
        gender: report?.customerDetail?.gender?.toString(),
        isReverseInfo: templateSetting?.order,
      },
      movingDetails: {
        address: report?.addressID?.address,
        workDates: report?.date,
        time: report?.time,
      },
      houseDetails: {
        livingRoomDetails: {
          sofa: report?.livingRoomDetails?.sofa,
          teacherDesk: report?.livingRoomDetails?.teacherDesk,
          tvTable: report?.livingRoomDetails?.tvTable,
          armchair: report?.livingRoomDetails?.armchair,
          table: report?.livingRoomDetails?.table,
          shelf: report?.livingRoomDetails?.shelf,
          LSofa: report?.livingRoomDetails?.LSofa,
          TV: report?.livingRoomDetails?.TV,
          decoBig: report?.livingRoomDetails?.decoBig,
          box: report?.livingRoomDetails?.box,
          descriptions: report?.livingRoomDetails?.descriptions,
        },
        generalRoomDetails: report?.generalRoomDetails,
        kitchenDetails: {
          oven: report?.kitchenDetails?.oven,
          refrigerator: report?.kitchenDetails?.refrigerator,
          freezer: report?.kitchenDetails?.freezer,
          stove: report?.kitchenDetails?.stove,
          microwave: report?.kitchenDetails?.microwave,
          coffeeMachine: report?.kitchenDetails?.coffeeMachine,
          washingMachine: report?.kitchenDetails?.washingMachine,
          tumbler: report?.kitchenDetails?.tumbler,
          shelf: report?.kitchenDetails?.shelf,
          box: report?.kitchenDetails?.box,
          descriptions: report?.kitchenDetails?.descriptions,
        },
        bedRoomDetails: {
          bed: report?.bedRoomDetails?.bed,
          doubleBed: report?.bedRoomDetails?.doubleBed,
          armchair: report?.bedRoomDetails?.armchair,
          smallWardrobe: report?.bedRoomDetails?.smallWardrobe,
          mediumWardrobe: report?.bedRoomDetails?.mediumWardrobe,
          largeWardrobe: report?.bedRoomDetails?.largeWardrobe,
          dressingTable: report?.bedRoomDetails?.dressingTable,
          nightstand: report?.bedRoomDetails?.nightstand,
          shelf: report?.bedRoomDetails?.shelf,
          desk: report?.bedRoomDetails?.desk,
          plants: report?.bedRoomDetails?.plants,
          box: report?.bedRoomDetails?.box,
          descriptions: report?.bedRoomDetails?.descriptions,
        },
        roomDetails: {
          bed: report?.roomDetails?.bed,
          doubleBed: report?.roomDetails?.doubleBed,
          armchair: report?.roomDetails?.armchair,
          smallWardrobe: report?.roomDetails?.smallWardrobe,
          mediumWardrobe: report?.roomDetails?.mediumWardrobe,
          largeWardrobe: report?.roomDetails?.largeWardrobe,
          shelf: report?.roomDetails?.shelf,
          desk: report?.roomDetails?.desk,
          tv: report?.roomDetails?.tv,
          tvTable: report?.roomDetails?.tvTable,
          nightstand: report?.roomDetails?.nightstand,
          box: report?.roomDetails?.box,
          descriptions: report?.roomDetails?.descriptions,
        },
        outDoorDetails: {
          grill: report?.outDoorDetails?.grill,
          table: report?.outDoorDetails?.table,
          chairs: report?.outDoorDetails?.chairs,
          sofa: report?.outDoorDetails?.sofa,
          shelf: report?.outDoorDetails?.shelf,
          umbrella: report?.outDoorDetails?.umbrella,
          pots: report?.outDoorDetails?.pots,
          plants: report?.outDoorDetails?.plants,
          herbGarden: report?.outDoorDetails?.herbGarden,
          lawnmower: report?.outDoorDetails?.lawnmower,
          descriptions: report?.outDoorDetails?.descriptions,
        },
        basementAtticDetails: {
          washingMachine: report?.basementAtticDetails?.washingMachine,
          tumbler: report?.basementAtticDetails?.tumbler,
          shelf: report?.basementAtticDetails?.shelf,
          disposal: report?.basementAtticDetails?.disposal,
          bicycle: report?.basementAtticDetails?.bicycle,
          stroller: report?.basementAtticDetails?.stroller,
          furniture: report?.basementAtticDetails?.furniture,
          boxes: report?.basementAtticDetails?.boxes,
          descriptions: report?.basementAtticDetails?.descriptions,
        },
        specialItemsDetails: {
          aquarium: report?.specialItemsDetails?.aquarium,
          piano: report?.specialItemsDetails?.piano,
          gymEquipment: report?.specialItemsDetails?.gymEquipment,
          electronics: report?.specialItemsDetails?.electronics,
          pool: report?.specialItemsDetails?.pool,
          safe: report?.specialItemsDetails?.safe,
          lamp: report?.specialItemsDetails?.lamp,
          descriptions: report?.specialItemsDetails?.descriptions,
        },
      },
      offerDetails: {
        employees: report?.offerDetails?.employees,
        deliveryVehicle: report?.offerDetails?.deliveryVehicle,
        hours: report?.offerDetails?.hours,
        cleaningWithHandoverGuarantee:
          report?.offerDetails?.cleaningWithHandoverGuarantee,
        broomClean: report?.offerDetails?.broomClean,
        priceCHF: report?.offerDetails?.priceCHF,
        remarks: report?.offerDetails?.remarks,
        noteAndInformation: report?.offerDetails?.noteAndInformation,
      },
      serviceItem: report?.serviceDetail?.serviceDetail,
      serviceItemFooter: {
        isTax: report?.isTax,
        isDiscount: report?.isDiscount,
        subTotal: report?.subTotal?.toString(),
        tax: report?.taxAmount?.toString(),
        discount: report?.discountAmount?.toString(),
        discountPercentage: discountPercentage.toString(),
        updatedDiscountAmount: updatedTotalDiscount.toString(),
        grandTotal: report?.total?.toString(),
        discountType: report?.discountType,
        taxType: report?.taxType,
        isOfferPDF: true,
        serviceDiscountSum: report?.serviceDetail?.serviceDetail?.reduce(
          (acc: number, service: { discount?: number }) => {
            const price = service?.discount || 0;
            return acc + price;
          },
          0
        ),
        discountDescription: report?.discountDescription,
      },
      footerDetails: {
        columnSettings: null,
        currPage: 1,
        totalPages: 10,
      },
      aggrementDetails: "",
    };

    const pdfStream = await renderToStream(
      <ServerReportPdf
        {...{
          data: reportPDFData,
          emailTemplateSettings: mailSetting,
          templateSettings: templateSetting,
          systemSetting: systemSetting,
          lang: currentLanguage,
        }}
      />
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      `Content-Disposition`,
      `attachment; filename=${report?.appointmentID?.createdBy?.company?.companyName}-Bericht-${report?.appointmentID?.leadID?.refID}.pdf`
    );

    pdfStream.pipe(res);

    pdfStream.once("error", (error) => {
      res.status(500).json({ message: "Failed to render PDF." });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
