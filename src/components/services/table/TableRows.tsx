import React from "react";
import { useRouter } from "next/router";
import { Service } from "@/types/service";
import editIcon from "@/assets/svgs/edit_info.svg";
import Image from "next/image";
import { formatDateTimeToDate } from "@/utils/utility";

const TableRowServices = ({ servicesData }: { servicesData: Service[] }) => {
  const router = useRouter();

  return (
    <div>
      {servicesData?.map((item) => {
        return (
          <div
            key={item.id}
            className="hover:bg-[#E9E1FF] px-6 cursor-pointer shadow-tableRow xs:w-fit mlg:w-full xlg:w-auto grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_200px)_minmax(150px,_150px)_minmax(120px,_120px)_minmax(200px,_100%)_minmax(60px,_60px)] mlg:grid-cols-[minmax(70px,_70px),minmax(150px,_150px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(150px,_100%)_minmax(50px,_50px)] xlg:grid-cols-[minmax(80px,_80px),minmax(200px,_100%)_minmax(200px,_200px)_minmax(140px,_140px)_minmax(180px,_100%)_minmax(50px,_50px)] mt-2 bg-white rounded-md"
          >
            <span className="py-4 flex items-center">
              {item?.refID}
            </span>
            <span className="py-4 flex items-center">{item.serviceName}</span>
            <span className="py-4 flex items-center">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className="py-4 flex items-center">{item.price}</span>
            <span className="break-all py-4 overflow-hidden overflow-ellipsis whitespace-nowrap flex items-center">
              {item.description}
            </span>

            <span
              className="py-4 flex justify-center items-center"
              onClick={() =>
                router.push({
                  pathname: "/services/details",
                  query: { service: item.id },
                })
              }
            >
              <span className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                >
                  <path
                    d="M0.461667 14.0655C0.291259 13.8825 0.206055 13.6659 0.206055 13.4156C0.206055 13.1653 0.291259 12.9489 0.461667 12.7665L5.45463 7.40568L0.444626 2.0266C0.285579 1.85583 0.206055 1.64238 0.206055 1.38623C0.206055 1.13008 0.291259 0.91053 0.461667 0.727568C0.632076 0.544606 0.833839 0.453125 1.06696 0.453125C1.30008 0.453125 1.50161 0.544606 1.67157 0.727568L7.39729 6.89338C7.46545 6.96657 7.51385 7.04585 7.54247 7.13123C7.5711 7.21662 7.58519 7.3081 7.58474 7.40568C7.58474 7.50326 7.57042 7.59474 7.54179 7.68012C7.51316 7.7655 7.465 7.84478 7.39729 7.91797L1.65453 14.0838C1.49548 14.2545 1.29939 14.3399 1.06628 14.3399C0.833157 14.3399 0.631621 14.2485 0.461667 14.0655Z"
                    fill="black"
                  />
                </svg>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRowServices;
