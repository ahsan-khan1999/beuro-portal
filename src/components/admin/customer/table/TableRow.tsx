import { CustomersAdmin } from "@/types/admin/customer";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import userIcon from "@/assets/svgs/Group 48095860.svg";
import { useTranslation } from "next-i18next";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";

const TableRow = ({
  currentPageRows,
  onStatusChange,
}: {
  currentPageRows: CustomersAdmin[];
  onStatusChange: (value: string) => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const itemsValue = [
    `${translate(
      "admin.customers_details.card_content.customer_status.block"
    )}`,
    `${translate(
      "admin.customers_details.card_content.customer_status.unBlock"
    )}`,
  ];

  const items = Object.keys(staticEnums["User"]["accountStatus"]).map(
    (item, index) => ({
      item: { label: itemsValue[index], value: item },
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
                    pathname: "/admin/customers/details",
                    query: { customer: item.id },
                  })
                }
                className={` ${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } hover:bg-[#E9E1FF] pl-4 pr-1 gap-x-4 items-center rounded-md cursor-pointer xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(300px,_4fr)_minmax(120px,_120px)] mlg:grid-cols-[minmax(50px,_50px),minmax(80px,_80px)_minmax(150px,2fr)_minmax(100px,_3fr)_minmax(100px,_100px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(100px,_100px)_minmax(150px,3fr)_minmax(150px,3fr)_minmax(100px,_4fr)_minmax(100px,_100px)] border-t border-t-[#E7EAEE]`}
              >
                <span className="py-4">{item?.company?.refID}</span>
                <div className="py-4 flex items-center justify-center">
                  <span className="border-2 border-[#D9D9D9] rounded-full p-1 h-[40px] w-[40px] flex items-center justify-center">
                    <Image
                      src={item?.company?.logo || userIcon}
                      alt="company logo"
                      height={29}
                      width={28}
                    />
                  </span>
                </div>
                <span className="py-4 truncate mlg:hidden maxSize:block">
                  {item?.company?.companyName}
                </span>
                <span className="py-4 truncate">{item?.fullName}</span>
                <span className="truncate py-4">{item?.email}</span>
                <span className="py-4 truncate">
                  {item &&
                    item.plan &&
                    item.plan.planName &&
                    translate(`plan_status.${item.plan.planName}`)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(120px,_120px)_minmax(50px,_50px)]">
              {/* <span className="py-4 flex items-center">
                <div
                  className={`${
                    item.status == "unBlock" ? "bg-[#4A13E7]" : "bg-[#FF0000]"
                  } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm `}
                >
                  {translate(`customer_status.${item.status}`)}
                </div>
              </span> */}

              <span
                className="py-4 flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <DropDown
                  items={items}
                  onItemSelected={(selectedItem) =>
                    onStatusChange(selectedItem)
                  }
                  selectedItem={translate(`customer_status.${item.status}`)}
                  dropDownClassName={`w-full rounded-lg px-4 py-[3px] flex items-center justify-center gap-x-1 ${
                    item?.status === "block" ? "bg-[#F00]" : "bg-primary"
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

              <span
                className="flex justify-center items-center"
                onClick={() =>
                  router.push({
                    pathname: "/admin/customers/details",
                    query: { customer: item.id },
                  })
                }
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg cursor-pointer">
                  <div className="p-[5px] rounded-md w-[34px] h-[34px] border border-primary flex justify-center items-center">
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
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
