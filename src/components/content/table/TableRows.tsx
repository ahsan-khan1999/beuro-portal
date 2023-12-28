import React from "react";
import { useRouter } from "next/router";
import { ContentTableRowTypes } from "@/types/content";
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
            className="hover:bg-[#E9E1FF] px-6 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_200px)_minmax(350px,_100%)_minmax(150px,_150px)_minmax(70px,_70px)] mlg:grid-cols-[minmax(80px,_80px),minmax(0px,_250px)_minmax(180px,_100%)_minmax(200px,_200px)_minmax(60px,_60px)] mt-2 bg-white rounded-md"
          >
            <span className="py-4 rounded-md flex items-center">
              {item.refID}
            </span>
            <span className="py-4 flex items-center ">
              {item.contentName.slice(0, 10)}
            </span>
            <span
              className="py-4 flex items-center break-all"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.offerContent.title.length > 30
                ? `${item.offerContent.title.slice(0, 30)}...`
                : item.offerContent.title}
            </span>

            <span className="py-4 flex items-center">
              {formatDateString(item?.createdAt)}
            </span>

            <span className="py-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
              >
                <path
                  d="M0.650632 14.4913C0.480224 14.3083 0.39502 14.0917 0.39502 13.8414C0.39502 13.5911 0.480224 13.3747 0.650632 13.1922L5.6436 7.83146L0.633591 2.45238C0.474543 2.28161 0.39502 2.06816 0.39502 1.81201C0.39502 1.55587 0.480224 1.33631 0.650632 1.15335C0.82104 0.970387 1.0228 0.878906 1.25592 0.878906C1.48904 0.878906 1.69058 0.970387 1.86053 1.15335L7.58625 7.31916C7.65442 7.39235 7.70281 7.47163 7.73144 7.55701C7.76007 7.6424 7.77416 7.73388 7.7737 7.83146C7.7737 7.92904 7.75939 8.02052 7.73076 8.1059C7.70213 8.19128 7.65396 8.27057 7.58625 8.34375L1.84349 14.5096C1.68444 14.6803 1.48836 14.7657 1.25524 14.7657C1.02212 14.7657 0.820586 14.6742 0.650632 14.4913Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
