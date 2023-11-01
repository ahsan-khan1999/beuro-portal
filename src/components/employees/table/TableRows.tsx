import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { TRowEmployees } from "@/types/employee";
import editInfoIcon from "@/assets/svgs/edit_info.svg";
import morefoIcon from "@/assets/svgs/entity_more_info.svg";

const TableHeadings = ({ employsData }: { employsData: TRowEmployees[] }) => {
  const router = useRouter();

  return (
    <div>
      {employsData?.map((item: any) => {
        return (
          <div
            key={item.id}
            className="shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_200px)_minmax(200px,_200px)_minmax(_150px,_150px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white roeditInfoIconunded-md flex  items-center">
              {item.id}
            </span>
            <span className="px-6 py-4 bg-white   flex  items-center">
              {item.name}
            </span>
            <span className="px-6 py-4 bg-white   flex  items-center">
              {item.email}
            </span>
            <span className="px-6 py-4 bg-white   flex  items-center">
              {item.phone}
            </span>
            <span className="px-6 py-4 bg-white   flex  items-center">
              {item.designation}
            </span>
            <span className="px-6 py-4 bg-white  flex  items-center">
              {item.createdOn.toLocaleDateString()}
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div
                onClick={() => router.push("/employees/details")}
                className="p-[6px] border border-[#8F8F8F] border-opacity-10 rounded-md w-fit cursor-pointer"
              >
                <Image src={editInfoIcon} alt="editInfoIcon" />
              </div>
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md cursor-pointer">
              <Image src={morefoIcon} alt="morefoIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableHeadings;
