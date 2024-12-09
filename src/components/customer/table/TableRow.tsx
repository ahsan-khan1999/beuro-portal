import React from "react";
import { CustomerTable } from "@/types/customer";
import { formatDateTimeToDate, germanDateFormat } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { staticEnums } from "@/utils/static";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const TableRow = ({ currentPageRows }: CustomerTable) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <>
      {currentPageRows?.map((item, index) => {
        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <div
                key={index}
                onClick={() => {
                  router.push({
                    pathname: "/customers/details",
                    query: { ...router.query, customer: item.id },
                  });
                }}
                className={`pl-4 pr-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md grid items-center gap-x-4 xs:w-fit mlg:w-full xs:grid-cols-[minmax(80px,_80px),minmax(480px,_4fr)_minmax(300px,_3fr)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(130px,_130px)] mlg:grid-cols-[minmax(60px,_60px)_minmax(90px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(130px,_130px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_4fr)_minmax(200px,_3fr)_minmax(140px,140px)_minmax(130px,_130px)_minmax(110px,_110px)_minmax(140px,_140px)] ${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } ${index !== 0 && "border-t border-t-[#E7EAEE]"} ${
                  index === 0 && "mt-2"
                }`}
              >
                <span className="py-4 truncate">{item.refID}</span>
                <div className="flex items-center gap-x-1">
                  {staticEnums["CustomerType"][
                    item?.customerType as keyof (typeof staticEnums)["CustomerType"]
                  ] === 1 ? (
                    <span className="py-4 truncate text-lg font-medium text-primary">
                      {item.companyName}
                    </span>
                  ) : (
                    <span className="py-4 truncate">{item.fullName}</span>
                  )}
                </div>

                <span className="py-4 truncate">{item.email}</span>
                <span className="py-4 truncate">{item.phoneNumber}</span>
                <span className="py-4 maxSize:flex items-center mlg:hidden">
                  {germanDateFormat(item.createdAt)}
                </span>
                <span className="py-4 flex items-center truncate">
                  {item?.address?.country}
                </span>
                <span className="py-4 flex items-center truncate">
                  {translate(`customer_type.${item.customerType}`)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(90px,_90px)]">
              <div
                key={index}
                onClick={() => {
                  router.push({
                    pathname: "/customers/details",
                    query: { ...router.query, customer: item.id },
                  });
                }}
                className="flex justify-center items-center cursor-pointer"
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <div
                    className="p-[5px] rounded-md w-[34px] h-[34px] border border-primary flex justify-center items-center"
                    title={translate("customers.table_headings.edit")}
                  >
                    <EditIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TableRow;
