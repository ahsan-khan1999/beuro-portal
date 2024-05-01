import React from "react";
import { useRouter } from "next/router";
import { Service } from "@/types/service";
import { formatDateTimeToDate } from "@/utils/utility";

const TableRowServices = ({ servicesData }: { servicesData: Service[] }) => {
  const router = useRouter();

  return (
    <div>
      {servicesData?.map((item) => {
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
                className="gap-x-4 xlg:gap-x-2 maxSize:gap-x-3 cursor-pointer hover:bg-[#E9E1FF] items-center xs:w-fit mlg:w-full xlg:w-auto grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_4fr)_minmax(150px,_150px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(300px,300px)] mlg:grid-cols-[minmax(70px,_70px),minmax(130px,_130px)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(100px,_100%)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_4fr)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(150px,_3fr)] border-t border-t-[#E7EAEE]"
              >
                <span className="py-4 truncate">{item?.refID}</span>
                <span className="py-4 truncate">{item.serviceName}</span>
                <span className="py-4">
                  {formatDateTimeToDate(item.createdAt)}
                </span>
                <span className="py-4 ">{item.price}</span>
                <span className="py-4">{item?.unit}</span>
                <span className="py-4 mr-1 truncate">{item.description}</span>
              </div>
            </div>

            {/* <div className="flex"> */}
            <div className="grid grid-cols-[minmax(90px,_90px)]">
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
            {/* </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default TableRowServices;
