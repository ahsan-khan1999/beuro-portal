import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ReportPDFProps } from "@/types";
import { staticEnums } from "@/utils/static";
import { readReportDetails } from "@/api/slices/appointment/appointmentSlice";
import { useRouter } from "next/router";
import { useMergedReportPdfDownload } from "@/components/reportPdf/report-merge-pdf-download";
import { Report } from "@/types/appointments";
import {
  readSystemSettings,
  SystemSetting,
} from "@/api/slices/settingSlice/settings";

export const useReportPdf = () => {
  const [reportData, setReportData] = useState<ReportPDFProps>();
  const [pdfFile, setPdfFile] = useState(null);
  const [remoteFileBlob, setRemoteFileBlob] = useState<Blob | null>();

  const [systemSetting, setSystemSettings] = useState<SystemSetting | null>(
    null
  );

  const {
    appointment: { reportDetails, isLoading },
    global: { currentLanguage },
  } = useAppSelector((state) => state);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { reportId } = router.query;

  useEffect(() => {
    (async () => {
      if (reportId) {
        const [reportData, settings] = await Promise.all([
          dispatch(readReportDetails({ params: { filter: reportId } })),
          dispatch(readSystemSettings()),
        ]);

        if (settings?.payload?.Setting) {
          setSystemSettings({ ...settings?.payload?.Setting });
        }

        if (reportData?.payload) {
          const reportDetails: Report = reportData?.payload;
          let serviceDiscountSum =
            reportDetails?.serviceDetail?.serviceDetail?.reduce(
              (acc, service) => {
                const price = service?.discount || 0;
                return acc + price;
              },
              0
            );

          const updatedTotalDiscount =
            (reportDetails?.subTotal / 100) * reportDetails?.discountAmount;

          let discountPercentage;
          if (
            staticEnums["DiscountType"][
              reportData?.payload
                ?.discountType as keyof (typeof staticEnums)["DiscountType"]
            ] === 1
          ) {
            discountPercentage =
              ((reportDetails?.discountAmount + serviceDiscountSum) /
                reportDetails?.subTotal) *
              100;
          } else {
            discountPercentage =
              ((updatedTotalDiscount + serviceDiscountSum) /
                reportDetails?.subTotal) *
              100;
          }
          let formatData: ReportPDFProps = {
            appointmentID: {
              leadID: {
                refID: reportDetails?.appointmentID?.leadID?.refID,
              },
            },
            headerDetails: {
              date: reportDetails?.appointmentID?.date,
            },
            contactAddress: {
              name: reportDetails?.customerDetail?.fullName,
              email: reportDetails?.customerDetail?.email,
              phone: reportDetails?.customerDetail?.phoneNumber,
            },
            movingDetails: {
              address: reportDetails?.addressID?.address,
            },
            houseDetails: {
              livingRoomDetails: {
                sofa: reportDetails?.livingRoomDetails?.sofa,
                teacherDesk: reportDetails?.livingRoomDetails?.teacherDesk,
                tvTable: reportDetails?.livingRoomDetails?.tvTable,
                armchair: reportDetails?.livingRoomDetails?.armchair,
                table: reportDetails?.livingRoomDetails?.table,
                shelf: reportDetails?.livingRoomDetails?.shelf,
                LSofa: reportDetails?.livingRoomDetails?.LSofa,
                TV: reportDetails?.livingRoomDetails?.TV,
                decoBig: reportDetails?.livingRoomDetails?.decoBig,
                box: reportDetails?.livingRoomDetails?.box,
                descriptions: reportDetails?.livingRoomDetails?.descriptions,
              },
              kitchenDetails: {
                oven: reportDetails?.kitchenDetails?.oven,
                refrigerator: reportDetails?.kitchenDetails?.refrigerator,
                freezer: reportDetails?.kitchenDetails?.freezer,
                stove: reportDetails?.kitchenDetails?.stove,
                microwave: reportDetails?.kitchenDetails?.microwave,
                coffeeMachine: reportDetails?.kitchenDetails?.coffeeMachine,
                washingMachine: reportDetails?.kitchenDetails?.washingMachine,
                tumbler: reportDetails?.kitchenDetails?.tumbler,
                shelf: reportDetails?.kitchenDetails?.shelf,
                box: reportDetails?.kitchenDetails?.box,
                descriptions: reportDetails?.kitchenDetails?.descriptions,
              },
              bedRoomDetails: {
                bed: reportDetails?.bedRoomDetails?.bed,
                doubleBed: reportDetails?.bedRoomDetails?.doubleBed,
                armchair: reportDetails?.bedRoomDetails?.armchair,
                smallWardrobe: reportDetails?.bedRoomDetails?.smallWardrobe,
                mediumWardrobe: reportDetails?.bedRoomDetails?.mediumWardrobe,
                largeWardrobe: reportDetails?.bedRoomDetails?.largeWardrobe,
                dressingTable: reportDetails?.bedRoomDetails?.dressingTable,
                nightstand: reportDetails?.bedRoomDetails?.nightstand,
                shelf: reportDetails?.bedRoomDetails?.shelf,
                desk: reportDetails?.bedRoomDetails?.desk,
                plants: reportDetails?.bedRoomDetails?.plants,
                box: reportDetails?.bedRoomDetails?.box,
                descriptions: reportDetails?.bedRoomDetails?.descriptions,
              },
              roomDetails: {
                bed: reportDetails?.roomDetails?.bed,
                doubleBed: reportDetails?.roomDetails?.doubleBed,
                armchair: reportDetails?.roomDetails?.armchair,
                smallWardrobe: reportDetails?.roomDetails?.smallWardrobe,
                mediumWardrobe: reportDetails?.roomDetails?.mediumWardrobe,
                largeWardrobe: reportDetails?.roomDetails?.largeWardrobe,
                shelf: reportDetails?.roomDetails?.shelf,
                desk: reportDetails?.roomDetails?.desk,
                tv: reportDetails?.roomDetails?.tv,
                tvTable: reportDetails?.roomDetails?.tvTable,
                nightstand: reportDetails?.roomDetails?.nightstand,
                box: reportDetails?.roomDetails?.box,
                descriptions: reportDetails?.roomDetails?.descriptions,
              },
              outDoorDetails: {
                grill: reportDetails?.outDoorDetails?.grill,
                table: reportDetails?.outDoorDetails?.table,
                chairs: reportDetails?.outDoorDetails?.chairs,
                sofa: reportDetails?.outDoorDetails?.sofa,
                shelf: reportDetails?.outDoorDetails?.shelf,
                umbrella: reportDetails?.outDoorDetails?.umbrella,
                pots: reportDetails?.outDoorDetails?.pots,
                plants: reportDetails?.outDoorDetails?.plants,
                herbGarden: reportDetails?.outDoorDetails?.herbGarden,
                lawnmower: reportDetails?.outDoorDetails?.lawnmower,
                descriptions: reportDetails?.outDoorDetails?.descriptions,
              },
              basementAtticDetails: {
                washingMachine:
                  reportDetails?.basementAtticDetails?.washingMachine,
                tumbler: reportDetails?.basementAtticDetails?.tumbler,
                shelf: reportDetails?.basementAtticDetails?.shelf,
                disposal: reportDetails?.basementAtticDetails?.disposal,
                bicycle: reportDetails?.basementAtticDetails?.bicycle,
                stroller: reportDetails?.basementAtticDetails?.stroller,
                furniture: reportDetails?.basementAtticDetails?.furniture,
                boxes: reportDetails?.basementAtticDetails?.boxes,
                descriptions: reportDetails?.basementAtticDetails?.descriptions,
              },
              specialItemsDetails: {
                aquarium: reportDetails?.specialItemsDetails?.aquarium,
                piano: reportDetails?.specialItemsDetails?.piano,
                gymEquipment: reportDetails?.specialItemsDetails?.gymEquipment,
                electronics: reportDetails?.specialItemsDetails?.electronics,
                pool: reportDetails?.specialItemsDetails?.pool,
                safe: reportDetails?.specialItemsDetails?.safe,
                lamp: reportDetails?.specialItemsDetails?.lamp,
                descriptions: reportDetails?.specialItemsDetails?.descriptions,
              },
            },
            offerDetails: {
              employees: reportDetails?.offerDetails?.employees,
              deliveryVehicle: reportDetails?.offerDetails?.deliveryVehicle,
              hours: reportDetails?.offerDetails?.hours,
              cleaningWithHandoverGuarantee:
                reportDetails?.offerDetails?.cleaningWithHandoverGuarantee,
              broomClean: reportDetails?.offerDetails?.broomClean,
              priceCHF: reportDetails?.offerDetails?.priceCHF,
              remarks: reportDetails?.offerDetails?.remarks,
              noteAndInformation:
                reportDetails?.offerDetails?.noteAndInformation,
            },
            serviceItem: reportDetails?.serviceDetail?.serviceDetail,
            serviceItemFooter: {
              isTax: reportDetails?.isTax,
              isDiscount: reportDetails?.isDiscount,
              subTotal: reportDetails?.subTotal?.toString(),
              tax: reportDetails?.taxAmount?.toString(),
              discount: reportDetails?.discountAmount?.toString(),
              discountPercentage: discountPercentage.toString(),
              updatedDiscountAmount: updatedTotalDiscount.toString(),
              grandTotal: reportDetails?.total?.toString(),
              discountType: reportDetails?.discountType,
              taxType: reportDetails?.taxType,
              isOfferPDF: true,
              serviceDiscountSum:
                reportDetails?.serviceDetail?.serviceDetail?.reduce(
                  (acc, service) => {
                    const price = service?.discount || 0;

                    return acc + price;
                  },
                  0
                ),
              discountDescription: reportDetails?.discountDescription,
            },
          };

          setReportData(formatData);
        }
      }
    })();
  }, [reportId]);

  const fileName = "Report - " + reportData?.appointmentID?.leadID?.refID;

  const reportDataProps = useMemo(
    () => ({
      data: reportData,
      fileName,
      remoteFileBlob,
      systemSetting,
    }),
    [reportData, fileName, remoteFileBlob, systemSetting]
  );

  const { mergedFile, mergedPdfUrl, isPdfRendering } =
    useMergedReportPdfDownload(reportDataProps);

  const handleDonwload = () => {
    if (mergedPdfUrl) {
      const url = mergedPdfUrl;
      console.log(url, "url");

      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        reportDetails?.appointmentID?.leadID?.createdBy +
        "-" +
        reportDetails?.id
      }.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    if (mergedPdfUrl) {
      let printWindow = window.open(mergedPdfUrl, "_blank");
      if (!printWindow) return;
      printWindow.onload = function () {
        printWindow?.print();
      };
    }
  };

  return {
    reportData,
    currentLanguage,
    isLoading,
    handleDonwload,
    handlePrint,
    pdfFile,
    setPdfFile,
    mergedFile,
    mergedPdfUrl,
    isPdfRendering,
    reportDetails,
  };
};
