import { CustomerTable } from "@/types/customer";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import editInfo from "@/assets/svgs/edit_info.svg";
import moreInfo from "@/assets/svgs/entity_more_info.svg";

const TableRow = ({ currentPageRows }: CustomerTable) => {
  const router = useRouter();
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/customers/details",
                query: { customer: item.id },
                
              })
            }
            key={index}
            className="cursor-pointer shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(70px,_150px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md flex items-center">
              {item.refID}
            </span>
            <span className="px-6 py-4 bg-white  flex items-center">
              {item.fullName}
            </span>

            <span className="px-6 py-4 bg-white flex items-center">
              {item.email}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.phoneNumber}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.createdAt}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.address.country}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {" "}
              {item.customerType}
            </span>
            <span className="px-6 py-4 bg-white ">
              <Image src={editInfo} alt="editInfo" />
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md">
              <Image src={moreInfo} alt="moreInfo" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
