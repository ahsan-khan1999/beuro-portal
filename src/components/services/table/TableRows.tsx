import React from "react";
import { useRouter } from "next/router";
import { Service } from "@/types/service";
import editIcon from "@/assets/svgs/edit_info.svg";
import moreIcon from "@/assets/svgs/entity_more_info.svg";
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
            className="hover:bg-[#E9E1FF] px-5 cursor-pointer shadow-tableRow xs:w-fit  xlg:w-auto xs:grid-cols-[minmax(70px,_70px)_minmax(150px,_100%)_minmax(180px,_100%)_minmax(150px,_100%)_minmax(250px,_100%)_minmax(60px,_60px)] mlg:w-full mlg:grid-cols-[minmax(50px,_50px),minmax(100px,_100px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(180px,_100%)_minmax(50px,_50px)] grid xlg:grid-cols-[minmax(50px,_50px),minmax(100px,_100px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(180px,_100%)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(130px,_100%)_minmax(160px,_100%)_minmax(120px,_100%)_minmax(180px,_100%)_minmax(50px,_50px)]  mt-2 bg-white rounded-md"
          >
            <span className=" py-4  rounded-md  flex items-center">
              {item.id}
            </span>
            <span className=" py-4    flex items-center">
              {item.serviceName}
            </span>
            <span className=" py-4   flex items-center">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className=" py-4   flex items-center">
              {item.price}
            </span>
            <span className=" py-4  overflow-hidden overflow-ellipsis whitespace-nowrap flex items-center">
              {item.description}
            </span>

            <span className=" py-4  flex justify-center items-center" onClick={() =>
              router.push({
                pathname: "/services/details",
                query: { service: item.id },
              })
            }>
              <div className="p-[6px] border border-[#8F8F8F] border-opacity-10 rounded-md w-fit cursor-pointer">
                <Image src={editIcon} alt="editIcon" />
              </div>
            </span>

            <span className=" py-4 flex justify-center items-center  rounded-md" onClick={() =>
              router.push({
                pathname: "/services/details",
                query: { service: item.id },
              })
            }>
              <Image src={moreIcon} alt="moreIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRowServices;
