import {
  SystemSetting,
  getTemplateSettings,
  readEmailSettings,
  readSystemSettings,
} from "@/api/slices/settingSlice/settings";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EmailTemplate } from "@/types/settings";
import { ContractEmailHeaderProps, PdfProps, TemplateType } from "@/types";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { updateQuery } from "@/utils/update-query";
import { staticEnums } from "@/utils/static";
import { readReportDetails } from "@/api/slices/appointment/appointmentSlice";
import { Report } from "@/types/appointments";
import { useMergedReportPdfDownload } from "@/components/reportPdf/report-merge-pdf-download";

export const useReportUpdatedPdf = () => {
  const [reportData, setReportData] = useState<PdfProps>();
  const { user } = useAppSelector((state) => state.auth);
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );

  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);

  const [activeButtonId, setActiveButtonId] = useState<"post" | "email" | null>(
    null
  );

  const [pdfFile, setPdfFile] = useState(null);
  const [systemSetting, setSystemSettings] = useState<SystemSetting | null>(
    null
  );

  const { isLoading, reportDetails } = useAppSelector(
    (state) => state.appointment
  );
  const { modal, loading: loadingGlobal } = useAppSelector(
    (state) => state.global
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { reportId } = router.query;
  const [remoteFileBlob, setRemoteFileBlob] = useState<Blob | null>();

  useEffect(() => {
    (async () => {
      if (reportId) {
        const [template, emailTemplate, reportData, settings] =
          await Promise.all([
            dispatch(getTemplateSettings()),
            dispatch(readEmailSettings()),
            dispatch(readReportDetails({ params: { filter: reportId } })),
            dispatch(readSystemSettings()),
          ]);
        if (template?.payload?.Template) {
          const {
            firstColumn,
            fourthColumn,
            isFirstColumn,
            isFourthColumn,
            isSecondColumn,
            isThirdColumn,
            secondColumn,
            thirdColumn,
            order,
          }: TemplateType = template.payload.Template;

          setTemplateSettings(() => ({
            firstColumn,
            secondColumn,
            thirdColumn,
            fourthColumn,
            isFirstColumn,
            isFourthColumn,
            isSecondColumn,
            isThirdColumn,
            order,
          }));
        }
        if (emailTemplate?.payload) {
          setEmailTemplateSettings({
            logo: emailTemplate?.payload?.logo,
            FooterColour: emailTemplate?.payload?.FooterColour,
            headerColour: "ffffff",
            email: emailTemplate?.payload?.email,
            mobileNumber: emailTemplate?.payload?.mobileNumber,
            phoneNumber: emailTemplate?.payload?.phoneNumber,
            textColour: emailTemplate?.payload?.textColour,
          });
        }

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

          let formatData: PdfProps<ContractEmailHeaderProps> = {
            id: reportDetails?.id,
            headerDetails: {
              offerNo: reportDetails?.appointmentID?.leadID?.refID,
              offerDate: reportDetails?.createdAt,
              createdBy: user?.fullName || "",
              logo: emailTemplate?.payload?.logo,
              emailTemplateSettings: emailTemplate?.payload,
              isReverseLogo: template.payload.Template?.order,
              fileType: "report",
              desireDate: reportDetails?.desireDate,
            },
            contactAddress: {
              address: {
                name: reportDetails?.customerDetail?.fullName,
                city: reportDetails?.customerDetail?.address?.country,
                postalCode: reportDetails?.customerDetail?.address?.postalCode,
                streetWithNumber:
                  reportDetails?.customerDetail?.address?.streetNumber,
              },
              email: reportDetails?.customerDetail?.email,
              customerType: reportDetails?.customerDetail?.customerType,
              companyName: reportDetails?.customerDetail?.companyName,
              desireDate: reportDetails?.desireDate,
              phone: reportDetails?.customerDetail?.phoneNumber,
              mobile: reportDetails?.customerDetail?.mobileNumber,
              gender: reportDetails?.customerDetail?.gender?.toString(),
              isReverseInfo: template.payload.Template?.order,
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
              generalRoomDetails: reportDetails?.generalRoomDetails,
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
            footerDetails: {
              columnSettings: null,
              currPage: 1,
              totalPages: 10,
            },
            aggrementDetails: "",
          };

          setReportData(formatData);
        }
      }
    })();
  }, [reportId]);

  const fileName = reportData?.emailHeader?.offerNo;
  const reportDataProps = useMemo(
    () => ({
      emailTemplateSettings,
      templateSettings,
      data: reportData,
      fileName,
      remoteFileBlob,
      systemSetting,
      isOfferPdf: true,
      showContractSign: true,
      companyName: reportData?.headerDetails?.companyName,
    }),
    [
      emailTemplateSettings,
      templateSettings,
      reportData,
      fileName,
      remoteFileBlob,
      systemSetting,
    ]
  );

  const { mergedFile, mergedPdfUrl, isPdfRendering, clearMergedPdfUrl } =
    useMergedReportPdfDownload(reportDataProps);

  function downloadPdf(pdfBlob: Blob, title: string): void {
    // Check if the browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      // Safari-specific handling
      const reader = new FileReader();

      reader.onload = function () {
        const link = document.createElement("a");
        link.href = reader.result as string;
        link.download = `safari browser.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      reader.readAsDataURL(pdfBlob); // Convert Blob to a Data URL
    } else {
      // Non-Safari browsers
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `other browser.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the Blob URL
    }
  }
  async function fetchAndDownloadPdf(
    url: string,
    title: string
  ): Promise<void> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }
      const pdfBlob: Blob = await response.blob();
      downloadPdf(pdfBlob, title);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }

  const handleDonwload = () => {
    if (mergedPdfUrl) {
      let companyName =
        reportDetails?.appointmentID?.createdBy?.company?.companyName;
      let leadID = reportDetails?.appointmentID?.leadID?.refID;
      let title = companyName ? `${companyName} - ${leadID}` : leadID;

      // console.log("title:", title);
      const url = mergedPdfUrl;
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      // fetchAndDownloadPdf(mergedPdfUrl, title);
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

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const onSuccess = () => {
    router.pathname = "/offers";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  return {
    reportData,
    templateSettings,
    emailTemplateSettings,
    activeButtonId,
    modal,
    loadingGlobal,
    pdfFile,
    setPdfFile,
    handleDonwload,
    handlePrint,
    onClose,
    onSuccess,
    systemSetting,
    reportDetails,
    mergedFile,
    mergedPdfUrl: reportId && !isPdfRendering ? mergedPdfUrl : null,
    isPdfRendering,
    isLoading: isLoading || isPdfRendering,
    loading: isLoading,
    clearMergedPdfUrl,
  };
};
