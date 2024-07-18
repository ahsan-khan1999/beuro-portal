import React from "react";
import { Lead } from "@/types/leads";
import { useRouter } from "next/router";
import { formatDate } from "@/utils/utility";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Button } from "@/base-components/ui/button/button";
import { CancelFillIcon } from "@/assets/svgs/components/cancel-icon";
import { Appointments } from "@/types/appointments";
import { DEFAULT_APPOINTMETNS } from "@/utils/static";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { OutlineButton } from "@/base-components/ui/button/outline-button";

export interface ApointmentsTableProps {
  dataToAdd: Appointments[];
  onStatusChange: (id: string, status: string, type: string) => void;
  onAppointmentSchedule: () => void;
}

const TableRows = ({
  dataToAdd,
  onStatusChange,
  onAppointmentSchedule,
}: ApointmentsTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const itemsValue = [
    `${translate("sidebar.customer.appointments.pending")}`,
    `${translate("sidebar.customer.appointments.completed")}`,
    `${translate("sidebar.customer.appointments.cancelled")}`,
  ];

  const items = Object.keys(staticEnums["AppointmentStatus"]).map(
    (item, index) => ({
      item: { label: itemsValue[index], value: item },
    })
  );

  const appointmentsArray = Array.from({ length: 10 }, (_, index) => ({
    ...DEFAULT_APPOINTMETNS,
    id: index + 1,
  }));

  return (
    <div
      className={`overflow-y-visible ${
        dataToAdd && dataToAdd.length <= 4 ? "h-[550px]" : ""
      }`}
    >
      {appointmentsArray?.map((item, index) => {
        // const customerType = item?.customerDetail
        //   ?.customerType as keyof (typeof staticEnums)["CustomerType"];
        // const name =
        //   customerType === 1
        //     ? item?.customerDetail?.companyName
        //     : item?.customerDetail?.fullName;
        // const heading =
        //   customerType === 1
        //     ? translate("common.company_name")
        //     : translate("common.customer_name");

        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <div
                // onClick={() => {
                //   router.push({
                //     pathname: "/leads/details",
                //     query: { ...router.query, lead: item?.id },
                //   });
                // }}
                onClick={() => {}}
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px)_minmax(80px,_80px)_minmax(200px,3fr)_minmax(150px,_150px)_minmax(150px,150px)_minmax(250px,_3fr)_minmax(140px,_140px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(70px,_70px)_minmax(100px,_100%)_minmax(140px,_140px)] xlg:grid-cols-[minmax(70px,_70px)_minmax(70px,_70px)_minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(140px,_140px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(70px,_70px)_minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(140px,_140px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(70px,_70px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(100px,_100%)_minmax(140px,_140px)] xLarge:grid-cols-[minmax(70px,_70px)_minmax(100px,_100px)_minmax(70px,_3fr)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(60px,_4fr)_minmax(140px,_140px)] maxLarge:grid-cols-[minmax(70px,_70px)_minmax(70px,_70px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(100px,_100%)_minmax(140px,_140px)] xMaxLarge:grid-cols-[minmax(70px,_70px)_minmax(70px,_70px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(100px,_100%)_minmax(140px,_140px)] xMaxProLarge:grid-cols-[minmax(70px,_70px)_minmax(70px,_70px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(100px,_100%)_minmax(140px,_140px)] border-t border-t-[#E7EAEE]`}
              >
                <span className="py-4 truncate">{item.id}</span>
                <div className="flex items-center gap-x-1">
                  {/* {(item?.customerDetail
                    ?.customerType as keyof (typeof staticEnums)["CustomerType"]) ===
                  1 ? (
                    <span className="py-4 truncate text-lg font-medium text-primary">
                      {item?.customerDetail?.companyName}
                    </span>
                  ) : (
                    <span className="py-4 truncate">
                      {item?.customerDetail?.fullName}
                    </span>
                  )} */}
                  {item.lead_id}
                </div>
                <span className="py-4 truncate mlg:hidden xlg:block">
                  {item.customer}
                </span>
                <span className="py-4 mlg:hidden xMaxSize:block">
                  {item.date}
                </span>
                <span className="py-4 flex items-center mlg:hidden xLarge:block">
                  {/* {formatDate(item.createdAt)} */}
                  {item.time}
                </span>

                <div className="flex items-center gap-x-[10px]">
                  <Image
                    src={item.agent.imgProfile}
                    alt="agent profile"
                    width={32}
                    height={32}
                  />
                  <span className="py-4 truncate">{item.agent.name}</span>
                </div>
                <div
                  className="py-4 flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropDown
                    key={item.id}
                    items={items}
                    selectedItem={translate(
                      `appointments.appointment_status.pending`
                    )}
                    onItemSelected={(status) => {
                      onStatusChange(item.lead_id, status, "appointments");
                    }}
                    dropDownClassName={`${
                      item?.appointments_status === "Pending"
                        ? "bg-[#4A13E7]"
                        : item?.appointments_status === "Completed"
                        ? "bg-[#45C769]"
                        : "bg-[#D80027]"
                    } w-full rounded-lg px-4 py-[3px] flex items-center justify-center`}
                    dropDownTextClassName="text-white text-base font-medium me-1"
                    dropDownItemsContainerClassName="w-full"
                    dropDownIconClassName="text-white"
                    isThirdLastIndex={
                      dataToAdd &&
                      dataToAdd.length > 5 &&
                      index === dataToAdd.length - 3
                    }
                    isSecondLastIndex={
                      dataToAdd &&
                      dataToAdd.length > 5 &&
                      index === dataToAdd.length - 2
                    }
                    isLastIndex={
                      dataToAdd &&
                      dataToAdd.length > 5 &&
                      index === dataToAdd.length - 1
                    }
                    isLead={true}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(140px,_140px)_minmax(50px,_50px)] gap-x-3">
              <div className="py-4 flex items-center">
                {/* <Button
                  inputType="button"
                  onClick={onAppointmentSchedule}
                  className="!h-fit py-2 px-3 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-full"
                  text={translate("appointments.view_reports_btn")}
                  id="view reports"
                  iconAlt="view reports"
                /> */}
                <OutlineButton
                  inputType="button"
                  onClick={onAppointmentSchedule}
                  className="bg-white text-primary w-full border border-primary"
                  text={translate("appointments.reschedule_btn")}
                  id="view reports"
                  iconAlt="view reports"
                />
              </div>

              <div className="py-4 flex items-center">
                <span className="p-[6px]">
                  <CancelFillIcon />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
