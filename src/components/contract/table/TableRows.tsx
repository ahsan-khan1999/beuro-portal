import { contractTableTypes } from "@/types/contract";
import Image from "next/image";
import React from "react";
import moreInfoIcon from "@/assets/svgs/entity_more_info.svg";
import { useRouter } from "next/router";

const TableRows = ({ dataToAdd }: { dataToAdd: contractTableTypes[] }) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item: any, index: number) => {
        return (
          <div
            onClick={() => router.push("/contract/details")}
            key={index}
            className="cursor-pointer shadow-tableRow grid grid-cols-[minmax(120px,_120px),minmax(200px,_100%)_minmax(250px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_100%)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md flex  items-center">
              {item.id}
            </span>
            <span className="px-6 py-4 bg-white  flex  items-center">
              {item.customer}
            </span>
            <span className="px-6 py-4 bg-white flex  items-center">
              {item.contractTitle}
            </span>
            <span className="px-6 py-4 bg-white flex  items-center">
              {item.totalPrice}
            </span>
            <span className="px-6 py-4 bg-white flex  items-center">
              {item.createdOn.toLocaleDateString()}
            </span>
            <span className="flex justify-center items-center bg-white">
              <div
                className={`${
                  item.payment.includes("Cash")
                    ? "bg-[#45C769]"
                    : "bg-[#FE9244]"
                } text-white px-2 py-1 text-center rounded-md  w-[64px] text-sm`}
              >
                {item.payment}
              </div>
            </span>

            <span className="flex justify-center items-center bg-white ">
              <div
                className={`${
                  item.status.includes("Open")
                    ? "bg-[#4A13E7]"
                    : item.status.includes("Confirmed")
                    ? "bg-[#45C769]"
                    : "bg-[#FF0000]"
                } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm`}
              >
                {item.status}
              </div>
            </span>
            <span className="px-6 py-4 flex justify-center items-center  bg-white ">
              <Image src={item.editImg} alt="edit_img_icon" />
            </span>
            <span className="px-6 py-4 flex justify-center items-center bg-white ">
              <Image src={item.editNote} alt="edit_note_icon" />
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md">
              <Image src={moreInfoIcon} alt="moreInfoIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
