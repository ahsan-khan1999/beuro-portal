import { CustomersAdmin } from "@/types/admin/customer";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import userIcon from "@/assets/svgs/Group 48095860.svg";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { WithTooltip } from "@/base-components/ui/tooltip/tooltip";
import { IconButton } from "@/base-components/ui/button/icon-button";
import { BlockIcon } from "@/assets/svgs/components/block-icon";
import { UnBlockIcon } from "@/assets/svgs/components/unblock-icon";

export interface AdminCustomerTableProps {
  currentPageRows: CustomersAdmin[];
  onBlockUser: (id: string, status: string) => void;
}

const TableRow = ({
  currentPageRows,
  onBlockUser,
}: AdminCustomerTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  // const customerStatus = [
  //   `${translate("customer_status.Block")}`,
  //   `${translate("customer_status.Active")}`,
  // ];

  // const items = Object?.keys(staticEnums["User"]["status"]).map(
  //   (item, index) => ({
  //     item: { label: customerStatus[index], value: item },
  //   })
  // );

  return (
    <div
      className={`overflow-y-visible ${
        currentPageRows && currentPageRows?.length <= 4 ? "h-[550px]" : ""
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
                    query: { ...router.query, customer: item?.id },
                  })
                }
                className={`${index % 2 === 0 ? "bg-white" : "bg-tableRowBg"} ${
                  index === 0 && "mt-2"
                } hover:bg-[#E9E1FF] pl-4 pr-1 gap-x-4 items-center rounded-md cursor-pointer xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(200px,_2fr)_minmax(200px,_2fr)_minmax(300px,_4fr)_minmax(120px,_120px)_minmax(120px,_120px)] mlg:grid-cols-[minmax(50px,_50px),minmax(80px,_80px)_minmax(120px,2fr)_minmax(80px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(100px,_100px)_minmax(120px,3fr)_minmax(120px,3fr)_minmax(80px,_4fr)_minmax(120px,_120px)_minmax(100px,_100px)] ${
                  index !== 0 && "border-t border-t-[#E7EAEE]"
                }`}
              >
                <span className="py-4">{item?.company?.refID}</span>
                <div className="flex items-center justify-center">
                  <span className="border-2 border-[#D9D9D9] rounded-full p-1 h-[55px] w-[55px] flex items-center justify-center">
                    <Image
                      src={item?.company?.logo || userIcon}
                      alt=""
                      className="rounded-full"
                      quality={100}
                      layout="responsive"
                      width={48}
                      height={48}
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
                    item?.plan &&
                    item?.plan?.planName &&
                    translate(`plan_status.${item?.plan?.planName}`)}
                </span>
                <span className="py-4 flex items-center">
                  <div
                    className={`${
                      item.status == "Active" ? "bg-[#45C769]" : "bg-[#FF0000]"
                    } text-white px-2 py-2 text-center rounded-md w-full text-sm`}
                  >
                    {translate(`customer_status.${item.status}`)}
                  </div>
                </span>
              </div>
            </div>

            <div className="gap-x-2 grid grid-cols-[minmax(32px,_32px)_minmax(50px,_50px)] pl-4">
              {/* <span
                className="py-4 flex items-center pl-1"
                onClick={(e) => e.stopPropagation()}
              >
                <DropDown
                  items={items}
                  onItemSelected={(status) =>
                    onStatusChange(item.id, status, "admin_customer")
                  }
                  selectedItem={translate(`customer_status.${item?.status}`)}
                  dropDownClassName={`w-full rounded-lg px-4 py-[5px] flex items-center justify-center gap-x-1 ${
                    item?.status === "block" ? "bg-[#F00]" : "bg-primary"
                  }`}
                  dropDownTextClassName="text-white"
                  dropDownIconClassName="text-white"
                  dropDownItemsContainerClassName="w-full"
                  isSecondLastIndex={
                    currentPageRows &&
                    currentPageRows?.length > 5 &&
                    index === currentPageRows?.length - 2
                  }
                  isLastIndex={
                    currentPageRows &&
                    currentPageRows?.length > 5 &&
                    index === currentPageRows?.length - 1
                  }
                  isAdminCustomer={true}
                />
              </span> */}

              {item?.status === "Active" ? (
                <WithTooltip
                  children={
                    <IconButton
                      icon={<BlockIcon className="w-8 h-8" />}
                      onClick={() => onBlockUser(item.id, item?.status)}
                    />
                  }
                  tooltipContent={translate("customer_status.Block")}
                />
              ) : (
                <WithTooltip
                  children={
                    <IconButton
                      icon={<UnBlockIcon />}
                      onClick={() => onBlockUser(item.id, item?.status)}
                    />
                  }
                  tooltipContent={translate("customer_status.Active")}
                />
              )}

              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() =>
                  router.push({
                    pathname: "/admin/customers/details",
                    query: { ...router.query, customer: item?.id },
                  })
                }
                title={translate("leads.table_headings.edit")}
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <span className="p-[5px] rounded-md w-[32px] h-[32px] border border-primary flex justify-center items-center">
                    <EditIcon />
                  </span>
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
