import { BackIcon } from "@/assets/svgs/components/back-icon";
import { updateQuery } from "@/utils/update-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Appointments, Report } from "@/types/appointments";
import { germanDateFormat } from "@/utils/utility";
import { PrintIcon } from "@/assets/svgs/components/print-icon";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";
import { useAppSelector } from "@/hooks/useRedux";
import { ImageUploadIcon } from "@/assets/svgs/components/image-upload-icon";
import { WriteIcon } from "@/assets/svgs/components/write-icon";
import { staticEnums } from "@/utils/static";

export interface AppointmentsDetailCardProps {
  appointmentDetails: Report;
  onDownload: () => void;
  onPrint: () => void;
  details?: Appointments;

  handleNotes: (
    id: string,
    refID: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleUploadImages: (
    id: string,
    refID: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  isLoad: boolean;
}

export const AppointmentPdfCard = ({
  appointmentDetails,
  onDownload,
  onPrint,
  details,
  handleUploadImages,
  isLoad,
  handleNotes,
}: AppointmentsDetailCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  const handleBack = () => {
    if (router.query.isCompany) {
      router.pathname = "/appointments";
    } else if (router.query.isLead) {
      router.pathname = "/agent/leads";
    } else if (router.query.isCompanyLead) {
      router.pathname = "/leads";
    } else {
      router.pathname = "/agent/appointments";
    }

    delete router.query["appointment"];
    delete router.query["reportId"];
    delete router.query["isCompany"];
    delete router.query["isLead"];
    delete router.query["isCompanyLead"];
    updateQuery(router, router.locale as string);
  };

  const customerType = details?.leadID?.customerDetail
    ?.customerType as keyof (typeof staticEnums)["CustomerType"];

  const name =
    customerType === 1
      ? details?.leadID?.customerDetail?.companyName
      : details?.leadID?.customerDetail?.fullName;

  const heading =
    customerType === 1
      ? translate("common.company_name")
      : translate("common.customer_name");

  return (
    <div className="bg-white pt-5 pl-5 pr-6 pb-[37px] rounded-lg">
      <div className="flex items-center justify-between border-b border-b-[#000] border-opacity-10 pb-5">
        <div className="flex items-center gap-x-4">
          <BackIcon onClick={handleBack} />
          <h1 className="text-[#222B45] font-medium xMini:font-semibold text-base xMini:text-2xl">
            {translate("appointments.detail_heading")}
          </h1>
        </div>
        <div className="flex items-center gap-x-2 xMini:gap-x-4">
          <PrintIcon onClick={onPrint} />
          <DownloadIcon onClick={onDownload} />
        </div>
      </div>

      <div className="flex flex-col mlg:flex-row justify-between mlg:items-center">
        <div className="flex flex-col gap-y-4 mt-[10px] mlg:mt-[34px]">
          <div className="grid grid-cols-1 xMini:grid-cols-3 items-center mlg:gap-x-20 gap-y-4">
            <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[65px] w-fit">
                {translate("appointments.detail_data.lead_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {appointmentDetails?.appointmentID?.leadID?.refID}
              </span>
            </div>
            <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[130px] w-fit">
                {translate("appointments.detail_data.appointment_id")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {appointmentDetails?.appointmentID?.leadID?.refID}
              </span>
            </div>
            <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[60px] w-fit">
                {translate("appointments.detail_data.status")}:
              </span>
              {!isLoad &&
                appointmentDetails?.appointmentID?.appointmentStatus && (
                  <div
                    className={`${
                      appointmentDetails?.appointmentID?.appointmentStatus ===
                      "Pending"
                        ? "bg-[#4A13E7]"
                        : appointmentDetails?.appointmentID
                            ?.appointmentStatus === "Completed"
                        ? "bg-[#45C769]"
                        : "bg-[#D80027]"
                    } w-[140px] rounded-lg px-4 py-2 flex items-center justify-center`}
                  >
                    <span className="text-sm font-normal text-white">
                      {translate(
                        `appointments.appointment_status.${appointmentDetails?.appointmentID?.appointmentStatus}`
                      )}
                    </span>
                  </div>
                )}
            </div>
          </div>
          <div className="grid grid-cols-1 xMini:grid-cols-3 items-center mlg:gap-x-20 gap-y-4">
            {appointmentDetails?.appointmentID?.leadID?.customerDetail
              ?.companyName && (
              <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
                <span className="text-base text-[#5C5C5C] font-medium min-w-[150px]">
                  {translate("appointments.table_headings.company_name")}:
                </span>
                <span className="text-base text-[#5C5C5C] font-nomal truncate">
                  {
                    appointmentDetails?.appointmentID?.leadID?.customerDetail
                      ?.companyName
                  }
                </span>
              </div>
            )}
            <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium">
                {translate("appointments.detail_data.date")}:
              </span>
              {appointmentDetails?.appointmentID?.date && (
                <span className="text-base text-[#5C5C5C] font-nomal">
                  {appointmentDetails?.appointmentID?.date
                    ? germanDateFormat(appointmentDetails?.appointmentID?.date)
                    : ""}
                </span>
              )}
            </div>
            <div className="flex xs:justify-between xMini:justify-start xMini:flex-col mlg:flex-row mlg:items-center gap-x-[10px]">
              <span className="text-base text-[#5C5C5C] font-medium min-w-[100px] w-fit">
                {translate("appointments.detail_data.created_by")}:
              </span>
              <span className="text-base text-[#5C5C5C] font-nomal">
                {user?.fullName}
              </span>
            </div>
            <div className="flex justify-between gap-x-3 items-center mt-2 md:mt-0">
              <div className="flex items-center gap-[11px] min-w-[100px]">
                <span className="font-normal text-[#848484] text-sm mlg:text-base">
                  {translate("offers.card_content.images")}:
                </span>

                {!isLoad && (
                  <span
                    className="cursor-pointer"
                    onClick={(e) =>
                      handleUploadImages(
                        details?.leadID?.id || "",
                        details?.leadID?.refID || "",
                        name || "",
                        heading,
                        e
                      )
                    }
                  >
                    <ImageUploadIcon
                      pathClass={
                        details?.leadID?.isImageAdded ? "#FF0000" : "#4A13E7"
                      }
                    />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-[11px]">
                <span className="font-normal text-[#848484] text-sm mlg:text-base">
                  {translate("offers.card_content.notes")}:
                </span>

                {!isLoad && (
                  <span
                    className="cursor-pointer"
                    onClick={(e) =>
                      handleNotes(
                        details?.id || "",
                        details?.leadID?.refID || "",
                        name || "",
                        heading,
                        e
                      )
                    }
                  >
                    <WriteIcon
                      pathClass={
                        details?.leadID?.isNoteCreated ? "#FF0000" : "#4A13E7"
                      }
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
