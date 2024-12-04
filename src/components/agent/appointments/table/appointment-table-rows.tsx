import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { Appointments } from "@/types/appointments";
import {
  convertToLocal,
  formatDateTimeToDate,
  viewConvertUTCToLocalDate,
} from "@/utils/utility";
import { Button } from "@/base-components/ui/button/button";
import { OutlineButton } from "@/base-components/ui/button/outline-button";
import { AddImageIcon } from "@/assets/svgs/components/add-image-icon";
import { AddNoteIcon } from "@/assets/svgs/components/add-note-icon";
import { useReportUpdatedPdf } from "@/hooks/appointments/useReportUpdatedPdf";
import { updateQuery } from "@/utils/update-query";
export interface ApointmentsTableProps {
  dataToAdd: Appointments[];
  onStatusChange: (id: string, status: string, type: string) => void;
  onAppointmentCreate: (id: string) => void;
  isAgent?: boolean;
  handleNotes: (
    id: string,
    refId: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>,
    leadId?: string
  ) => void;
  handleImageUpload: (
    id: string,
    refId: string,
    name: string,
    heading: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handlePdfPreview: (item: any) => void;
}

export const AppointmentTableRows = ({
  dataToAdd,
  onStatusChange,
  onAppointmentCreate,
  isAgent,
  handleNotes,
  handleImageUpload,
  handlePdfPreview,
}: ApointmentsTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const handlePreview = (id: string) => {
    router.push({
      pathname: `/agent/appointments/pdf`,
      query: { ...router.query, reportId: id },
    });
  };

  const handleClickRow = (isSubmited: boolean, id: string) => {
    if (isSubmited) {
      router.push({
        pathname: "/agent/appointments/report-detail",
        query: { ...router.query, reportId: id },
      });
    } else {
      router.push({
        pathname: "/agent/appointments/details",
        query: {
          ...router.query,
          appointment: id,
        },
      });
    }
  };

  const handleReportDetail = (id: string) => {
    router.push({
      pathname: "/agent/appointments/report-detail",
      query: { ...router.query, reportId: id },
    });
  };

  const handleAppointmentRoute = (id: string) => {
    router.push({
      pathname: "/agent/appointments/details",
      query: {
        ...router.query,
        appointment: id,
      },
    });
  };

  return (
    <div className={`overflow-y-visible`}>
      {dataToAdd?.map((item, index) => {
        const customerType = item?.leadID?.customerDetail
          ?.customerType as keyof (typeof staticEnums)["CustomerType"];

        const name =
          customerType === 1
            ? item?.leadID?.customerDetail?.companyName
            : item?.leadID?.customerDetail?.fullName;

        const heading =
          customerType === 1
            ? translate("common.company_name")
            : translate("common.customer_name");

        const localStartTime = item?.startTime
          ? convertToLocal(item?.startTime).time
          : "";
        const localEndTime = item?.endTime
          ? convertToLocal(item?.endTime).time
          : "";

        return (
          <div>
            <div
              onClick={() => handleClickRow(item?.isReportSubmitted, item.id)}
              className={`${index % 2 === 0 ? "bg-white" : "bg-tableRowBg"} ${
                index !== 0 && "border-t border-t-[#E7EAEE]"
              } grid 
              grid-cols-[minmax(100px,15%)_minmax(100px,_15%)_minmax(80px,_12%)_minmax(80px,_23%)_minmax(100px,15%)_minmax(150px,20%)] 
              items-center gap-x-2 bg-primary rounded-lg px-2 py-1 !min-h-[70px] cursor-pointer hover:bg-[#E9E1FF]`}
            >
              <div>
                <span className="text-xs md:sm xl:text-base hidden xl:flex">
                  {item.leadID?.customerDetail?.fullName?.length > 24
                    ? item.leadID?.customerDetail?.fullName.slice(0, 24) + ".."
                    : item.leadID?.customerDetail?.fullName}
                </span>
                <span className="text-xs md:sm xl:text-base hidden md:flex xl:hidden">
                  {item.leadID?.customerDetail?.fullName?.length > 18
                    ? item.leadID?.customerDetail?.fullName.slice(0, 18) + ".."
                    : item.leadID?.customerDetail?.fullName}
                </span>
                <span className="text-xs md:sm xl:text-base flex md:hidden">
                  {item.leadID?.customerDetail?.fullName?.length > 14
                    ? item.leadID?.customerDetail?.fullName.slice(0, 14) + ".."
                    : item.leadID?.customerDetail?.fullName}
                </span>
              </div>

              <div>
                <span className="text-xs md:sm xl:text-base hidden md:flex">
                  {item.leadID?.customerDetail?.companyName}
                </span>
                <span className="text-xs md:sm xl:text-base flex md:hidden">
                  {item.leadID?.customerDetail?.companyName?.length > 12
                    ? item.leadID?.customerDetail?.companyName.slice(0, 12) +
                      ".."
                    : item.leadID?.customerDetail?.companyName}
                </span>
              </div>

              <div className="flex flex-col  gap-y-1">
                <span className="text-xs md:sm xl:text-base ml-1">
                  {formatDateTimeToDate(item?.date)}
                </span>
                <div className="flex max-w-[150px] flex-wrap gap-x-1 items-center ">
                  <p className="text-xs leading-4 md:sm xl:text-base">
                    {localStartTime}
                  </p>

                  <p className="text-xs md:sm xl:text-base p-0 m-0">-</p>

                  <p className="text-xs md:sm xl:text-base p-0 m-0">
                    {localEndTime}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs md:sm xl:text-base leading-5">
                  {item?.canton}
                </p>
              </div>
              <div>
                <div
                  className={`${
                    item?.leadID?.isOfferCreated === true
                      ? "bg-[#45C769]"
                      : "bg-[#FB9600]"
                  } text-white px-2 py-2 text-center rounded-md w-full min-w-[110px] max-w-[150px] text-xs`}
                >
                  <span className="text-white text-xs">
                    {item.leadID?.isOfferCreated === true
                      ? translate(`leads.created`)
                      : translate(`leads.not_created`)}
                  </span>
                </div>
              </div>
              <div className="pl-2">
                <div
                  className="flex items-center gap-x-1 2xl:gap-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="justify-center items-center cursor-pointer hidden 2xl:flex"
                    onClick={(e) =>
                      handleImageUpload(
                        item?.id,
                        item?.leadID?.refID,
                        name,
                        heading,
                        e as React.MouseEvent<HTMLSpanElement>
                      )
                    }
                    title={translate("leads.table_headings.images")}
                  >
                    <AddImageIcon isImageAdded={item?.leadID?.isImageAdded} />
                  </div>
                  <div
                    className="justify-center items-center cursor-pointer hidden 2xl:flex"
                    onClick={(e) =>
                      handleNotes(
                        item?.id,
                        item?.leadID?.refID,
                        name,
                        heading,
                        e,
                        item?.leadID?.id
                      )
                    }
                    title={translate("leads.table_headings.note")}
                  >
                    <AddNoteIcon isNoteCreated={item?.leadID?.isNoteCreated} />
                  </div>

                  <div className="flex items-center w-full">
                    {item?.isReportSubmitted ? (
                      <OutlineButton
                        inputType="button"
                        onClick={() => handlePreview(item?.id)}
                        className="bg-white py-2 px-1 xl:px-2 text-primary xl:text-[#45C769] !min-w-[140px] w-full border border-primary xl:border-[#45C769] hover:border-buttonHover !text-xs !lg:text-sm !2xl:text-lg !h-fit"
                        text={translate("appointments.view_reports_btn")}
                        id="view reports"
                        iconAlt="view reports"
                      />
                    ) : (
                      <Button
                        inputType="button"
                        onClick={() => handleClickRow(false, item.id)}
                        className="!h-fit py-[10px] px-1 md:px-2 flex items-center !min-w-[140px] !text-xs !lg:text-sm !2xl:text-base font-medium bg-primary text-white rounded-md w-full"
                        text={translate("appointments.sub_report_1")}
                        id="view reports"
                        iconAlt="view reports"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* {isAgent ? (
              <>
                <div className="mlg:hidden">
                  <div
                    onClick={
                      item?.isReportSubmitted
                        ? handleReportDetail
                        : handleAppointmentRoute
                    }
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                    } ${index !== 0 && "border-t border-t-[#E7EAEE]"} ${
                      index === 0 && "mt-2"
                    } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-1 grid xs:grid-cols-[minmax(100px,100%)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(170px,170px)] xAir:grid-cols-[minmax(80px,100%)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(170px,170px)]`}
                  >
                    
                    <span className="py-4 truncate">
                      {item.leadID?.customerDetail?.fullName}
                    </span>
                    <span className="py-4 hidden xAir:block">
                      {formatDateTimeToDate(item.date)}
                    </span>
                    <span className="py-4">
                      {localStartTime}- {localEndTime}
                    </span>
                    <span className="py-4 truncate">{item?.canton}</span>

                    <div
                      className="py-4 flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item?.isReportSubmitted ? (
                        <OutlineButton
                          inputType="button"
                          onClick={() => handlePreview(item?.id)}
                          className="bg-white text-primary w-full border border-primary py-[5px] !h-fit"
                          text={translate("appointments.view_reports_btn")}
                          id="view reports"
                          iconAlt="view reports"
                        />
                      ) : (
                        <Button
                          inputType="button"
                          onClick={handleAppointmentRoute}
                          className="!h-fit py-2 px-3 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-full"
                          text={translate("appointments.sub_report")}
                          id="view reports"
                          iconAlt="view reports"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <div
              className={`${isAgent ? "hidden mlg:flex" : "flex"}`}
              key={index}
            >
              <div className="mlg:w-full">
                <div
                  onClick={
                    item?.isReportSubmitted
                      ? handleReportDetail
                      : handleAppointmentRoute
                  }
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                  } ${index !== 0 && "border-t border-t-[#E7EAEE]"} ${
                    index === 0 && "mt-2"
                  } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px)_minmax(200px,3fr)_minmax(250px,_3fr)_minmax(150px,_150px)_minmax(150px,150px)_minmax(180px,_180px)_minmax(160px,_160px)] mlg:grid-cols-[minmax(65px,_65px)_minmax(80px,_100%)_minmax(170px,_170px)_minmax(160px,_160px)] xlg:grid-cols-[minmax(65px,_65px)_minmax(60px,_4fr)_minmax(170px,_170px)_minmax(160px,_160px)] maxSize:grid-cols-[minmax(65px,_65px)_minmax(80px,_3fr)_minmax(100px,_4fr)_minmax(170px,_170px)_minmax(160px,_160px)] xMaxSize:grid-cols-[minmax(65px,_65px)_minmax(130px,_130px)_minmax(140px,_100%)_minmax(90px,_90px)_minmax(170px,_170px)_minmax(160px,_160px)] xLarge:grid-cols-[minmax(65px,_65px)_minmax(60px,_3fr)_minmax(70px,_4fr)_minmax(90px,_90px)_minmax(110px,_110px)_minmax(170px,_170px)_minmax(160px,_160px)]`}
                >
                  
                  <div className="flex items-center gap-x-1">
                    {item?.leadID?.refID}
                  </div>
                  <span className="py-4 truncate">
                    {item.leadID?.customerDetail?.fullName}
                  </span>
                  <span className="py-4 truncate mlg:hidden maxSize:block">
                    {item?.createdBy?.company?.companyName}
                  </span>
                  <span className="py-4 mlg:hidden xMaxSize:block">
                    {viewConvertUTCToLocalDate(item.startTime)}
                  </span>
                  <div className="py-4 flex items-center mlg:hidden xLarge:block">
                    <span className="text-sm text-[#191D23] font-semibold">
                      {localStartTime}
                    </span>{" "}
                    -{" "}
                    <span className="text-sm text-[#191D23] font-semibold">
                      {localEndTime}
                    </span>
                  </div>

                  <span className="py-4 truncate">{item?.canton}</span>

                  <span className="py-4 flex justify-center items-center">
                    <div
                      className={`${
                        item?.leadID?.isOfferCreated === true
                          ? "bg-[#45C769]"
                          : "bg-[#FB9600]"
                      }
                  } text-white px-2 py-2 text-center rounded-md min-w-[70px] w-full text-sm`}
                    >
                      {item.leadID?.isOfferCreated === true
                        ? translate(`leads.created`)
                        : translate(`leads.not_created`)}
                    </div>
                  </span>
                </div>
              </div>

              <div
                className={`grid grid-cols-[minmax(180px,_180px)] maxLarge:grid-cols-[minmax(40px,_40px)_minmax(40px,_40px)_minmax(180px,_180px)] gap-x-2 ${
                  index === 0 && "mt-2"
                }`}
              >
                <div
                  className="py-3 hidden maxLarge:flex justify-center items-center cursor-pointer"
                  onClick={(e) =>
                    handleImageUpload(
                      item?.id,
                      item?.leadID?.refID,
                      name,
                      heading,
                      e as React.MouseEvent<HTMLSpanElement>
                    )
                  }
                  title={translate("leads.table_headings.images")}
                >
                  <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                    <AddImageIcon isImageAdded={item?.leadID?.isImageAdded} />
                  </span>
                </div>
                <div
                  className="py-3 hidden maxLarge:flex justify-center items-center cursor-pointer"
                  onClick={(e) =>
                    handleNotes(
                      item?.id,
                      item?.leadID?.refID,
                      name,
                      heading,
                      e,
                      item?.leadID?.id
                    )
                  }
                  title={translate("leads.table_headings.note")}
                >
                  <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                    <AddNoteIcon isNoteCreated={item?.leadID?.isNoteCreated} />
                  </span>
                </div>
                <div className="py-4 flex items-center">
                  {item?.isReportSubmitted ? (
                    <OutlineButton
                      inputType="button"
                      onClick={() => handlePreview(item?.id)}
                      className="bg-white text-[#45C769] w-full border border-[#45C769] hover:border-buttonHover py-[5px] !h-fit"
                      text={translate("appointments.view_reports_btn")}
                      id="view reports"
                      iconAlt="view reports"
                    />
                  ) : (
                    <Button
                      inputType="button"
                      onClick={handleAppointmentRoute}
                      className="!h-fit py-2 px-3 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-full"
                      text={translate("appointments.sub_report_1")}
                      id="view reports"
                      iconAlt="view reports"
                    />
                  )}
                </div>
              </div>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};
