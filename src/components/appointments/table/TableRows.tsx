import React from "react";
import { Lead } from "@/types/leads";
import { useRouter } from "next/router";
import { formatDate } from "@/utils/utility";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import agentProfile from "@/assets/pngs/agent-profile.png";
import { Button } from "@/base-components/ui/button/button";
import { CancelFillIcon } from "@/assets/svgs/components/cancel-icon";

export interface LeadTableProps {
  dataToAdd: Lead[];
  handleAddNote: (
    id: string,
    refId: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleImageUpload: (
    id: string,
    refId: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  onStatusChange: (id: string, status: string, type: string) => void;
}

const TableRows = ({
  dataToAdd,
  handleAddNote,
  handleImageUpload,
  onStatusChange,
}: LeadTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const itemsValue = [
    `${translate("sidebar.customer.appointments.pending")}`,
    `${translate("sidebar.customer.appointments.completed")}`,
    `${translate("sidebar.customer.appointments.cancelled")}`,
  ];

  const items = Object.keys(staticEnums["LeadStatus"]).map((item, index) => ({
    item: { label: itemsValue[index], value: item },
  }));

  return (
    <div
      className={`overflow-y-visible ${
        dataToAdd && dataToAdd.length <= 4 ? "h-[550px]" : ""
      }`}
    >
      {dataToAdd?.map((item: Lead, index: number) => {
        const customerType = item?.customerDetail
          ?.customerType as keyof (typeof staticEnums)["CustomerType"];
        const name =
          customerType === 1
            ? item?.customerDetail?.companyName
            : item?.customerDetail?.fullName;
        const heading =
          customerType === 1
            ? translate("common.company_name")
            : translate("common.customer_name");

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
                } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(250px,4fr)_minmax(300px,_3fr)_minmax(150px,150px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(190px,_190px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(50px,_3fr)_minmax(150px,_150px)_minmax(190px,_190px)] xlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(150px,_150px)_minmax(190px,_190px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(150px,_150px)_minmax(190px,_190px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(110px,_110px)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(190px,_190px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(100px,100px)_minmax(70px,_3fr)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(60px,4fr)_minmax(160px,_160px)] border-t border-t-[#E7EAEE]`}
              >
                <span className="py-4 truncate">{item?.refID}</span>
                <div className="flex items-center gap-x-1">
                  {(item?.customerDetail
                    ?.customerType as keyof (typeof staticEnums)["CustomerType"]) ===
                  1 ? (
                    <span className="py-4 truncate text-lg font-medium text-primary">
                      {item?.customerDetail?.companyName}
                    </span>
                  ) : (
                    <span className="py-4 truncate">
                      {item?.customerDetail?.fullName}
                    </span>
                  )}
                </div>
                <span className="py-4 truncate block mlg:hidden maxSize:block">
                  {item?.customerDetail?.email}
                </span>
                <span className="py-4 truncate mlg:hidden xLarge:block">
                  {item?.customerDetail?.phoneNumber}
                </span>
                <span className="py-4 flex items-center">
                  {formatDate(item.createdAt)}
                </span>

                <div className="flex items-center gap-x-[10px]">
                  <Image
                    src={agentProfile}
                    alt="agent profile"
                    width={32}
                    height={32}
                  />
                  <span className="py-4 truncate mlg:hidden xMaxSize:block">
                    {item?.customerDetail?.address?.country}
                  </span>
                </div>
                <span
                  className="py-4 flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropDown
                    key={item.id}
                    items={items}
                    selectedItem={translate(
                      `leads.lead_dropdown_status.${item?.leadStatus}`
                    )}
                    onItemSelected={(status) => {
                      onStatusChange(item.id, status, "lead");
                    }}
                    dropDownClassName={`${
                      item?.leadStatus === "Open"
                        ? "bg-[#4A13E7]"
                        : item?.leadStatus === "InProcess"
                        ? "bg-[#f5d60f]"
                        : item?.leadStatus === "Close"
                        ? "bg-[#45C769]"
                        : "bg-[#FF0000]"
                    } w-full rounded-lg px-4 py-[3px] flex items-center justify-center`}
                    dropDownTextClassName={`${
                      item?.leadStatus === "InProcess"
                        ? "text-black"
                        : "text-white"
                    }  text-base font-medium me-1`}
                    dropDownItemsContainerClassName="w-full"
                    dropDownIconClassName={`${
                      item?.leadStatus === "InProcess"
                        ? "text-black"
                        : "text-white"
                    }`}
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
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(140px,_140px)_minmax(50px,_50px)] gap-x-3">
              <div className="py-4 flex items-center">
                <Button
                  inputType="button"
                  onClick={() => {}}
                  className="!h-fit py-2 px-3 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap"
                  text={translate("appointments.view_reports_btn")}
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
