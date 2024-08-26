import React from "react";
import { useRouter } from "next/router";
import { ContentTableRowTypes } from "@/types/content";
<<<<<<< HEAD
import { formatDateString } from "@/utils/functions";
import Link from "next/link";
=======
>>>>>>> 48d4a8a098b45b87ddfc9bedff9928a9da3bf9bb

const TableRows = ({
  contentData,
}: {
  contentData: ContentTableRowTypes[];
}) => {
  const router = useRouter();

  return (
    <div>
      {contentData?.map((item, index) => {
        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <Link
                key={item.id}
<<<<<<< HEAD
                href={{
                  pathname: "/content/details",
                  query: { ...router.query, content: item.id },
                }}
                className="px-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-3 xs:w-fit items-center xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(300px,_4fr)_minmax(350px,_3fr)_minmax(150px,_150px)] mlg:grid-cols-[minmax(70px,_70px),minmax(250px,_250px)_minmax(100px,_100%)_minmax(180px,_180px)] xlg:grid-cols-[minmax(80px,_80px),minmax(20px,_4fr)_minmax(180px,_3fr)_minmax(200px,_200px)] border-t border-t-[#E7EAEE]"
=======
                onClick={() => {
                  router.push({
                    pathname: "/content/details",
                    query: { ...router.query, content: item.id },
                  });
                }}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } pl-4 pr-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-3 xs:w-fit items-center xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(300px,_3fr)_minmax(350px,_4fr)] mlg:grid-cols-[minmax(70px,_70px),minmax(250px,_250px)_minmax(100px,_100%)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_3fr)_minmax(180px,_4fr)] border-t border-t-[#E7EAEE]`}
>>>>>>> 48d4a8a098b45b87ddfc9bedff9928a9da3bf9bb
              >
                <span className="py-4 truncate">{item.refID}</span>
                <span className="py-4 truncate">{item.contentName}</span>
                <span className="py-4 truncate">{item.offerContent.title}</span>

                {/* <span className="py-4 flex items-center">
                  {formatDateString(item?.createdAt)}
<<<<<<< HEAD
                </span>
              </Link>
=======
                </span> */}
              </div>
>>>>>>> 48d4a8a098b45b87ddfc9bedff9928a9da3bf9bb
            </div>

            <div className="grid grid-cols-[minmax(90px,_90px)]">
              <span className="flex items-center justify-center cursor-pointer">
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
<<<<<<< HEAD
                  <Link
                    href={{
                      pathname: "/content/details",
                      query: { ...router.query, content: item.id },
=======
                  <div
                    onClick={() => {
                      router.push({
                        pathname: "/content/details",
                        query: { ...router.query, content: item.id },
                      });
>>>>>>> 48d4a8a098b45b87ddfc9bedff9928a9da3bf9bb
                    }}
                    title={translate("contracts.table_headings.edit")}
                    className="p-[5px] rounded-md w-[34px] h-[34px] border border-primary flex justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="15"
                      viewBox="0 0 8 15"
                      fill="#4A13E7"
                    >
                      <path
                        d="M0.650632 14.4913C0.480224 14.3083 0.39502 14.0917 0.39502 13.8414C0.39502 13.5911 0.480224 13.3747 0.650632 13.1922L5.6436 7.83146L0.633591 2.45238C0.474543 2.28161 0.39502 2.06816 0.39502 1.81201C0.39502 1.55587 0.480224 1.33631 0.650632 1.15335C0.82104 0.970387 1.0228 0.878906 1.25592 0.878906C1.48904 0.878906 1.69058 0.970387 1.86053 1.15335L7.58625 7.31916C7.65442 7.39235 7.70281 7.47163 7.73144 7.55701C7.76007 7.6424 7.77416 7.73388 7.7737 7.83146C7.7737 7.92904 7.75939 8.02052 7.73076 8.1059C7.70213 8.19128 7.65396 8.27057 7.58625 8.34375L1.84349 14.5096C1.68444 14.6803 1.48836 14.7657 1.25524 14.7657C1.02212 14.7657 0.820586 14.6742 0.650632 14.4913Z"
                        fill="#4A13E7"
                      />
                    </svg>
                  </Link>
                </div>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
