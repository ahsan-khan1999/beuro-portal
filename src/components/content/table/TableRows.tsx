import React from "react";
import { useRouter } from "next/router";
import { ContentTableRowTypes } from "@/types/content";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

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
              <div
                key={item.id}
                onClick={() => {
                  router.push({
                    pathname: "/content/details",
                    query: { ...router.query, content: item.id },
                  });
                }}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } pl-4 pr-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-3 xs:w-fit items-center xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(300px,_3fr)_minmax(350px,_4fr)] mlg:grid-cols-[minmax(70px,_70px),minmax(250px,_250px)_minmax(100px,_100%)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_3fr)_minmax(180px,_4fr)] ${
                  index !== 0 && "border-t border-t-[#E7EAEE]"
                } ${index === 0 && "mt-2"}`}
              >
                <span className="py-4 truncate">{item.refID}</span>
                <span className="py-4 truncate">{item.contentName}</span>
                <span className="py-4 truncate">{item.offerContent.title}</span>

                {/* <span className="py-4 flex items-center">
                  {formatDateString(item?.createdAt)}
                </span> */}
              </div>
            </div>

            <div className="grid grid-cols-[minmax(90px,_90px)]">
              <span className="flex items-center justify-center cursor-pointer">
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <div
                    onClick={() => {
                      router.push({
                        pathname: "/content/details",
                        query: { ...router.query, content: item.id },
                      });
                    }}
                    title={translate("contracts.table_headings.edit")}
                    className="p-[5px] rounded-md w-[34px] h-[34px] border border-primary flex justify-center items-center"
                  >
                    <EditIcon />
                  </div>
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
