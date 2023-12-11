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
      {servicesData?.map((item: any) => {
        return (
          <div
            key={item.id}
            className="hover:bg-[#E9E1FF] px-5 cursor-pointer shadow-tableRow xs:w-fit mlg:w-full  xlg:w-auto grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_200px)_minmax(150px,_150px)_minmax(120px,_120px)_minmax(200px,_100%)_minmax(60px,_60px)] mlg:grid-cols-[minmax(70px,_70px),minmax(150px,_150px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(150px,_100%)_minmax(50px,_50px)] xlg:grid-cols-[minmax(80px,_80px),minmax(200px,_100%)_minmax(200px,_200px)_minmax(140px,_140px)_minmax(180px,_100%)_minmax(50px,_50px)] mt-2 bg-white rounded-md"
          >
            <span className="py-4 rounded-md flex items-center">
              {item.id.substring(0, 4)}
            </span>
            <span className="py-4 flex items-center">{item.serviceName}</span>
            <span className="py-4 flex items-center">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className="py-4 flex items-center">{item.price}</span>
            <span className="py-4 overflow-hidden overflow-ellipsis whitespace-nowrap flex items-center">
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
              <div className="cursor-pointer">
                <Image src={editIcon} alt="editIcon" />
              </div>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRowServices;
