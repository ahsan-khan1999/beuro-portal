import { TableRowEmailTracker } from "@/types/emailTracker";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import editInfo from "@/assets/svgs/edit_info.svg";
import moreInfo from "@/assets/svgs/entity_more_info.svg";

const TableRow = ({ dataToAdd }: { dataToAdd: TableRowEmailTracker[] }) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item: any, index: number) => {
        return (
          <div
            onClick={() => router.push("/email-tracker/view-mail")}
            key={index}
            className="cursor-pointer shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_200px)_minmax(150px,_150px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md flex items-center">
              {item.id}
            </span>
            <span className="px-6 py-4 bg-white  flex items-center">
              {item.recipient}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.subject}
            </span>
            <div className="px-6 py-4 bg-white  flex flex-col ">
              <span>{item.sendAt.time}</span>
              <span>{item.sendAt.date}</span>
            </div>
            <div className="px-6 py-4 bg-white  flex flex-col ">
              <span>{item.sendAt.time}</span>
              <span>{item.sendAt.date}</span>
            </div>
            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div
                className={`bg-[${item.status.colorClass}] text-white px-2 py-1 text-center rounded-md  w-[70px] text-sm`}
              >
                {item.status.text}
              </div>
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center">
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
