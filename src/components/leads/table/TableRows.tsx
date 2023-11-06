import { LeadsTableRowTypes } from "@/types/leads";
import Image from "next/image";
import React from "react";
import moreInfo from "@/assets/svgs/entity_more_info.svg";
import { useRouter } from "next/router";

const TableRows = ({
  dataToAdd,
  openModal,
  handleImageUpload,
}: {
  dataToAdd: LeadsTableRowTypes[];
  openModal: (
    item: LeadsTableRowTypes,
    e: React.MouseEvent<HTMLImageElement>
  ) => void;
  handleImageUpload: (
    item: LeadsTableRowTypes,
    e: React.MouseEvent<HTMLImageElement>
  ) => void;
}) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item: any, index: number) => {
        return (
          <div
            onClick={() => router.push("/leads/details")}
            key={index}
            className="cursor-pointer shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md flex items-center">
              {item.id}
            </span>
            <span className="px-6 py-4 bg-white  flex items-center">
              {item.name}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.email}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.phone}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.createdOn.toLocaleDateString()}
            </span>
            <span className="px-6 py-4 bg-white ">{item.location}</span>
            <span className="px-6 py-4 bg-white ">
              <div
                className={`${
                  item.status.includes("Open")
                    ? "bg-primary"
                    : item.status.includes("Close")
                    ? "bg-[#FE9244]"
                    : "bg-[#FF376F]"
                } text-white px-2 py-1 text-center rounded-md  w-[70px] text-sm`}
              >
                {item.status}
              </div>
            </span>
            <span className="px-6 py-4 flex justify-center items-center  bg-white ">
              <Image
                src={item.editImg}
                alt="edit_img_icon"
                className="cursor-pointer"
                onClick={(e) => handleImageUpload(item, e)}
              />
            </span>
            <span className="px-6 py-4 flex justify-center items-center bg-white ">
              <Image
                src={item.editNote}
                alt="edit_note_icon"
                className="cursor-pointer"
                onClick={(e) => openModal(item, e)}
              />
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

export default TableRows;
