import { useRouter } from "next/router";
import React from "react";
import { formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { staticEnums } from "@/utils/static";
import { ContactSupport } from "@/api/slices/contactSupport/contactSupportSlice";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";

const TableRow = ({
  currentPageRows,
  onStatusChange,
}: {
  currentPageRows: ContactSupport[];
  onStatusChange: (id: string, status: string, type: string) => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const itemStatus = [
    `${translate("support_request_status.pending")}`,
    `${translate("support_request_status.resolved")}`,
  ];

  const items = Object.keys(staticEnums["SupportRequest"]).map(
    (item, index) => ({
      item: { label: itemStatus[index], value: item },
    })
  );

  return (
    <div
      className={`overflow-y-visible ${
        currentPageRows && currentPageRows.length <= 4 ? "h-[550px]" : ""
      }`}
    >
      {currentPageRows?.map((item, index) => {
        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <div
                onClick={() =>
                  router.push({
                    pathname: "/admin/support-request/details",
                    query: { supportRequest: item.id },
                  })
                }
                className={` ${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } hover:bg-[#E9E1FF] pl-4 pr-1 border-t border-t-[#E7EAEE] cursor-pointer xs:w-fit xlg:w-auto mlg:w-full grid gap-x-4 xs:grid-cols-[minmax(70px,_70px),minmax(200px,_3fr)_minmax(300px,_4fr)_minmax(180px,_180px)_minmax(160px,_160px)] mlg:grid-cols-[minmax(60px,_60px),minmax(100px,_100%)_minmax(160px,_160px)_minmax(130px,_130px)] xlg:grid-cols-[minmax(60px,_60px),minmax(150px,_3fr)_minmax(150px,_4fr)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(60px,_60px),minmax(150px,_3fr)_minmax(150px,_4fr)_minmax(140px,_140px)_minmax(130px,_130px)]`}
              >
                <span className="py-4 truncate">{item?.refID}</span>
                <span className="py-4 truncate">
                  {item?.createdBy?.fullName}
                </span>
                <span className="truncate py-4 block mlg:hidden xlg:block">
                  {item?.createdBy?.email}
                </span>
                <span className="py-4 truncate xlg:hidden maxSize:block">
                  {item?.createdBy?.company?.mobileNumber}
                </span>
                <span className="py-4 truncate">
                  {formatDateTimeToDate(item?.createdAt)}
                </span>
              </div>
            </div>

            <div className="gap-x-3 grid grid-cols-[minmax(140px,_140px)_minmax(50px,_50px)]">
              <span
                className="py-4 flex justify-center items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* <div
                  className={`${
                    item?.status == "resolved" ? "bg-[#4A13E7]" : "bg-[#FE9244]"
                  } text-white px-2 py-1 text-center rounded-md min-w-[90px] w-fit truncate text-sm`}
                >
                  {translate(`support_request_status.${item?.status}`)}
                </div> */}
                <DropDown
                  items={items}
                  onItemSelected={(status) => {
                    onStatusChange(item.id, status, "support_request");
                  }}
                  selectedItem={translate(
                    `support_request_status.${item.status}`
                  )}
                  dropDownClassName={`w-full rounded-lg px-4 py-[3px] flex items-center justify-center gap-x-1 ${
                    item?.status == "resolved" ? "bg-[#4A13E7]" : "bg-[#FE9244]"
                  }`}
                  dropDownTextClassName="text-white"
                  dropDownIconClassName="text-white"
                  dropDownItemsContainerClassName="w-full"
                  isSecondLastIndex={
                    currentPageRows &&
                    currentPageRows.length > 5 &&
                    index === currentPageRows.length - 2
                  }
                  isLastIndex={
                    currentPageRows &&
                    currentPageRows.length > 5 &&
                    index === currentPageRows.length - 1
                  }
                  isAdminCustomer={true}
                />
              </span>
              <div className="flex justify-center items-center">
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg cursor-pointer">
                  <div
                    onClick={() =>
                      router.push({
                        pathname: "/admin/support-request/details",
                        query: { supportRequest: item.id },
                      })
                    }
                    className="p-[5px] rounded-md w-[34px] h-[34px] border border-primary flex justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="15"
                      viewBox="0 0 8 15"
                      fill="#4A13E7"
                    >
                      <path
                        d="M0.461667 14.0655C0.291259 13.8825 0.206055 13.6659 0.206055 13.4156C0.206055 13.1653 0.291259 12.9489 0.461667 12.7665L5.45463 7.40568L0.444626 2.0266C0.285579 1.85583 0.206055 1.64238 0.206055 1.38623C0.206055 1.13008 0.291259 0.91053 0.461667 0.727568C0.632076 0.544606 0.833839 0.453125 1.06696 0.453125C1.30008 0.453125 1.50161 0.544606 1.67157 0.727568L7.39729 6.89338C7.46545 6.96657 7.51385 7.04585 7.54247 7.13123C7.5711 7.21662 7.58519 7.3081 7.58474 7.40568C7.58474 7.50326 7.57042 7.59474 7.54179 7.68012C7.51316 7.7655 7.465 7.84478 7.39729 7.91797L1.65453 14.0838C1.49548 14.2545 1.29939 14.3399 1.06628 14.3399C0.833157 14.3399 0.631621 14.2485 0.461667 14.0655Z"
                        fill="#4A13E7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
