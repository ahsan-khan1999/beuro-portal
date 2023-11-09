import React from "react";
import { useRouter } from "next/router";
import { ContentTableRowTypes } from "@/types/content";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit_info.svg";
import moreInfoIcon from "@/assets/svgs/entity_more_info.svg";

const TableRows = ({
  contentData,
}: {
  contentData: ContentTableRowTypes[];
}) => {
  const router = useRouter();

  return (
    <div>
      {contentData?.map((item: any) => {
        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/content/details",
                query: { content: item.id },
              })
            }
            key={item.id}
            className="cursor-pointer shadow-tableRow grid grid-cols-[minmax(100px,_100px),minmax(200px,_200px)_minmax(350px,_100%)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md  flex items-center">
              {item.id}
            </span>
            <span className="px-6 py-4 bg-white   flex items-center">
              {item.name}
            </span>
            <span className="px-6 py-4 bg-white  flex items-center ">
              {item.contentTitle}
            </span>
            <span className="px-6 py-4 bg-white  flex items-center">
              {item.createdOn.toLocaleDateString()}
            </span>

            <span className="px-6 py-4 bg-white ">
              <div className="p-[6px] border border-[#8F8F8F] border-opacity-10 rounded-md w-fit cursor-pointer">
                <Image src={editIcon} alt="editIcon" />
              </div>
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
