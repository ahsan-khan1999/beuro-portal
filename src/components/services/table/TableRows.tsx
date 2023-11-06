import React from "react";
import { useRouter } from "next/router";
import { TRowServices } from "@/types/service";
import editIcon from "@/assets/svgs/edit_info.svg";
import moreIcon from "@/assets/svgs/entity_more_info.svg";
import Image from "next/image";

const TableRowServices = ({
  servicesData,
}: {
  servicesData: TRowServices[];
}) => {
  const router = useRouter();

  return (
    <div>
      {servicesData?.map((item: any) => {
        return (
          <div
            key={item.id}
            className="shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white  ">{item.service}</span>
            <span className="px-6 py-4 bg-white ">
              {item.createdOn.toLocaleDateString()}
            </span>
            <span className="px-6 py-4 bg-white ">
              {item.price.value} {item.price.currency}
            </span>
            <span className="px-6 py-4 bg-white overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.description}
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div
                onClick={() =>
                  router.push({
                    pathname: "/services/details",
                    query: { service: item.id },
                  })
                }
                className="p-[6px] border border-[#8F8F8F] border-opacity-10 rounded-md w-fit cursor-pointer"
              >
                <Image src={editIcon} alt="editIcon" />
              </div>
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md">
              <Image src={moreIcon} alt="moreIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRowServices;
