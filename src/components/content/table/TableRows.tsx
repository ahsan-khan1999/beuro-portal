import React from "react";
import { useRouter } from "next/router";
import { ContentTableRowTypes } from "@/types/content";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit_info.svg";
import moreInfoIcon from "@/assets/svgs/entity_more_info.svg";
import { formatDateString } from "@/utils/functions";

const TableRows = ({
  contentData,
}: {
  contentData: ContentTableRowTypes[];
}) => {
  const router = useRouter();

  return (
    <div>
      {contentData?.map((item) => {
        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/content/details",
                query: { content: item.id },
              })
            }
            key={item.id}
            className="hover:bg-[#E9E1FF] px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_200px)_minmax(250px,_100%)_minmax(150px,_150px)_minmax(70px,_70px)] mlg:grid-cols-[minmax(80px,_80px),minmax(300px,_300px)_minmax(180px,_100%)_minmax(200px,_200px)_minmax(60px,_60px)] mt-2 bg-white rounded-md"
          >
            <span className="py-4 rounded-md flex items-center">
              {item.refID}
            </span>
            <span className="py-4 flex items-center">{item.contentName}</span>
            <span className="py-4 flex items-center ">
              {item.offerContent.title}
            </span>
            <span className="py-4 flex items-center">
              {formatDateString(item?.createdAt)}
            </span>

            <span className="py-4 flex items-center justify-center">
              <Image src={editIcon} alt="editIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
