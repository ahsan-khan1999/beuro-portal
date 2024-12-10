import React from "react";
import { useRouter } from "next/router";
import { Service } from "@/types/service";
import { germanDateFormat } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const TableRowServices = ({ servicesData }: { servicesData: Service[] }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <div>
      {servicesData?.map((item, index) => {
        return (
          <div className="flex">
            <div className="mlg:w-full">
              <div
                key={item.id}
                onClick={() =>
                  router.push({
                    pathname: "/services/details",
                    query: { ...router.query, service: item.id },
                  })
                }
                className={` ${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } pl-4 pr-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-4 xlg:gap-x-2 maxSize:gap-x-3 items-center xs:w-fit mlg:w-full xlg:w-auto grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_4fr)_minmax(150px,_150px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(300px,300px)] mlg:grid-cols-[minmax(70px,_70px),minmax(130px,_130px)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(100px,_100%)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_4fr)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(150px,_3fr)] ${
                  index !== 0 && "border-t border-t-[#E7EAEE]"
                } ${index === 0 && "mt-2"}`}
              >
                <span className="py-4 truncate">{item?.refID}</span>
                <span className="py-4 truncate">{item.serviceName}</span>
                <span className="py-4">{germanDateFormat(item.createdAt)}</span>
                <span className="py-4 ">{item.price}</span>
                <span className="py-4">{item?.unit}</span>
                <span className="py-4 mr-1 truncate">{item.description}</span>
              </div>
            </div>

            <div
              className={`grid items-center grid-cols-[minmax(90px,_90px)] ${
                index === 0 && "mt-2"
              }`}
            >
              <span
                className="flex justify-center items-center cursor-pointer"
                onClick={() =>
                  router.push({
                    pathname: "/services/details",
                    query: { ...router.query, service: item.id },
                  })
                }
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <div
                    title={translate("contracts.table_headings.edit")}
                    className="p-[5px] rounded-md w-[34px] h-[34px] border border-primary flex justify-center items-center"
                  >
                    <EditIcon />
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

export default TableRowServices;
