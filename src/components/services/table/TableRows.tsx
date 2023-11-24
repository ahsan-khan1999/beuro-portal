import React from "react";
import { useRouter } from "next/router";
import { Service } from "@/types/service";
import editIcon from "@/assets/svgs/edit_info.svg";
import moreIcon from "@/assets/svgs/entity_more_info.svg";
import Image from "next/image";
import { formatDateTimeToDate } from "@/utils/utility";

const TableRowServices = ({
  servicesData,
}: {
  servicesData: Service[];
}) => {
  const router = useRouter();

  return (
    <div>
      {servicesData?.map((item: any) => {
        return (
          <div

            key={item.id}
            className="cursor-pointer shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md  flex items-center">
              {item.id}
            </span>
            <span className="px-6 py-4 bg-white   flex items-center">
              {item.serviceName}
            </span>
            <span className="px-6 py-4 bg-white  flex items-center">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className="px-6 py-4 bg-white  flex items-center">
              {item.price}
            </span>
            <span className="px-6 py-4 bg-white overflow-hidden overflow-ellipsis whitespace-nowrap flex items-center">
              {item.description}
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center" onClick={() =>
              router.push({
                pathname: "/services/details",
                query: { service: item.id },
              })
            }>
              <div className="p-[6px] border border-[#8F8F8F] border-opacity-10 rounded-md w-fit cursor-pointer">
                <Image src={editIcon} alt="editIcon" />
              </div>
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md" onClick={() =>
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
