import React from "react";
import { useRouter } from "next/router";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { Appointments } from "@/types/appointments";
import { formatDateTimeToDate } from "@/utils/utility";
import { Button } from "@/base-components/ui/button/button";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { OutlineButton } from "@/base-components/ui/button/outline-button";

export interface ApointmentsTableProps {
  dataToAdd: Appointments[];
  onStatusChange: (id: string, status: string, type: string) => void;
  onAppointmentCreate: (id: string) => void;
  isAgent?: boolean;
}

export const AppointmentTableRows = ({
  dataToAdd,
  onStatusChange,
  onAppointmentCreate,
  isAgent,
}: ApointmentsTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const itemsValue = [
    `${translate("appointments.appointment_status.Pending")}`,
    `${translate("appointments.appointment_status.Completed")}`,
    `${translate("appointments.appointment_status.Cancelled")}`,
  ];

  const items = Object.keys(staticEnums["AppointmentStatus"]).map(
    (item, index) => ({
      item: { label: itemsValue[index], value: item },
    })
  );

  return (
    <div
      className={`overflow-y-visible ${
        dataToAdd && dataToAdd?.length <= 4 ? "h-[550px]" : ""
      }`}
    >
      {dataToAdd?.map((item, index) => {
        const handleAppointmentRoute = () => {
          router.push({
            pathname: "/agent/appointments/report-detail",
            query: { ...router.query, report: item?.id },
          });
        };

        const handlePdfPreview = () => {
          router.push({
            pathname: `/agent/appointments/pdf`,
            query: { ...router.query, reportId: item?.id },
          });
        };
        return (
          <div>
            {isAgent ? (
              <>
                <div className="mlg:hidden">
                  <div
                    onClick={handleAppointmentRoute}
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                    } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-1 grid xs:grid-cols-[minmax(65px,_65px)_minmax(80px,100%)_minmax(140px,_140px)_minmax(180px,180px)] border-t border-t-[#E7EAEE]`}
                  >
                    <div className="flex items-center gap-x-1">
                      {item?.leadID?.refID}
                    </div>
                    <span className="py-4 truncate">
                      {item.leadID?.customerDetail?.fullName}
                    </span>

                    <div
                      className="py-4 flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropDown
                        key={item?.id}
                        items={items}
                        selectedItem={translate(
                          `appointments.appointment_status.${item?.appointmentStatus}`
                        )}
                        onItemSelected={(status) => {
                          onStatusChange(item?.id, status, "appointment");
                        }}
                        dropDownClassName={`${
                          item?.appointmentStatus === "Pending"
                            ? "bg-[#4A13E7]"
                            : item?.appointmentStatus === "Completed"
                            ? "bg-[#45C769]"
                            : "bg-[#D80027]"
                        } w-full rounded-lg px-4 py-[5px] flex items-center justify-center`}
                        dropDownTextClassName="text-white text-base font-medium me-1"
                        dropDownItemsContainerClassName="w-full"
                        dropDownIconClassName="text-white"
                        isSecondLastIndex={index === dataToAdd?.length - 2}
                        isLastIndex={index === dataToAdd?.length - 1}
                        isContract={true}
                      />
                    </div>

                    <div className="py-4 flex items-center">
                      {item?.isReportSubmitted ? (
                        <OutlineButton
                          inputType="button"
                          onClick={handlePdfPreview}
                          className="bg-white text-primary w-full border border-primary py-[5px] !h-fit"
                          text={translate("appointments.view_reports_btn")}
                          id="view reports"
                          iconAlt="view reports"
                        />
                      ) : (
                        <Button
                          inputType="button"
                          onClick={() => {
                            router.push({
                              pathname: "/agent/appointments/details",
                              query: {
                                ...router.query,
                                appointment: item?.id,
                              },
                            });
                          }}
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
                  onClick={handleAppointmentRoute}
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                  } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px)_minmax(80px,_80px)_minmax(200px,3fr)_minmax(250px,_3fr)_minmax(150px,_150px)_minmax(150px,150px)_minmax(180px,_180px)_minmax(130px,_130px)] mlg:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(80px,_100%)_minmax(170px,_170px)_minmax(130px,_130px)] xlg:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(100px,_4fr)_minmax(170px,_170px)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(80px,_3fr)_minmax(100px,_4fr)_minmax(170px,_170px)_minmax(130px,_130px)] xMaxSize:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(150px,_150px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(130px,_130px)] xLarge:grid-cols-[minmax(60px,_60px)_minmax(60px,_60px)_minmax(70px,_3fr)_minmax(60px,_4fr)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(170px,_170px)_minmax(130px,_130px)] border-t border-t-[#E7EAEE]`}
                >
                  <span className="py-4 truncate">{item?.leadID?.refID}</span>
                  <div className="flex items-center gap-x-1">
                    {item?.leadID?.refID}
                  </div>
                  <span className="py-4 truncate">
                    {item.leadID?.customerDetail?.fullName}
                  </span>

                  <span className="py-4 truncate mlg:hidden maxSize:block">
                    {item.leadID?.customerDetail?.companyName}
                  </span>

                  <span className="py-4 mlg:hidden xMaxSize:block">
                    {formatDateTimeToDate(item.date)}
                  </span>

                  <div className="py-4 flex items-center mlg:hidden xLarge:block">
                    <span className="text-sm text-[#191D23] font-semibold">
                      {item.startTime}
                    </span>{" "}
                    -{" "}
                    <span className="text-sm text-[#191D23] font-semibold">
                      {item.endTime}
                    </span>
                  </div>

                  <div
                    className="py-4 flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropDown
                      key={item?.id}
                      items={items}
                      selectedItem={translate(
                        `appointments.appointment_status.${item?.appointmentStatus}`
                      )}
                      onItemSelected={(status) => {
                        onStatusChange(item?.id, status, "appointment");
                      }}
                      dropDownClassName={`${
                        item?.appointmentStatus === "Pending"
                          ? "bg-[#4A13E7]"
                          : item?.appointmentStatus === "Completed"
                          ? "bg-[#45C769]"
                          : "bg-[#D80027]"
                      } w-full rounded-lg px-4 py-[5px] flex items-center justify-center`}
                      dropDownTextClassName="text-white text-base font-medium me-1"
                      dropDownItemsContainerClassName="w-full"
                      dropDownIconClassName="text-white"
                      isSecondLastIndex={index === dataToAdd?.length - 2}
                      isLastIndex={index === dataToAdd?.length - 1}
                      isContract={true}
                    />
                  </div>

                  <span className="py-4 flex justify-center items-center">
                    <div
                      className={`${
                        item?.leadID?.isOfferCreated === true
                          ? "bg-primary"
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

              <div className="grid grid-cols-[minmax(180px,_180px)]">
                <div className="py-4 flex items-center">
                  {item?.isReportSubmitted ? (
                    <OutlineButton
                      inputType="button"
                      onClick={handlePdfPreview}
                      className="bg-white text-primary w-full border border-primary py-[5px] !h-fit"
                      text={translate("appointments.view_reports_btn")}
                      id="view reports"
                      iconAlt="view reports"
                    />
                  ) : (
                    <Button
                      inputType="button"
                      onClick={() => {
                        router.push({
                          pathname: "/agent/appointments/details",
                          query: { ...router.query, appointment: item?.id },
                        });
                      }}
                      className="!h-fit py-2 px-3 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-full"
                      text={translate("appointments.sub_report")}
                      id="view reports"
                      iconAlt="view reports"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
