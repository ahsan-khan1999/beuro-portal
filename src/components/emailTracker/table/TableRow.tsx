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
            className="hover:bg-[#E9E1FF] px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(150px,_150px)_minmax(240px,_100%)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(90px,_90px),minmax(130px,_100%)_minmax(160px,_100%)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] mt-2 bg-white rounded-md"
          >
            <span className="py-4  rounded-md flex items-center">
              {item.id}
            </span>
            <span className="py-4   flex items-center">{item.recipient}</span>
            <span className="xs:block mlg:hidden xlg:hidden maxSize:flex py-4  items-center">
              {item.subject}
            </span>
            <div className="py-4   flex flex-col ">
              <span>{item.sendAt.time}</span>
              <span>{item.sendAt.date}</span>
            </div>
            <div className="py-4   flex flex-col ">
              <span>{item.sendAt.time}</span>
              <span>{item.sendAt.date}</span>
            </div>
            <span className="py-4  flex justify-center items-center">
              <div
                className={`bg-[${item.status.colorClass}] text-white px-2 py-1 text-center rounded-md  w-[70px] text-sm`}
              >
                {item.status.text}
              </div>
            </span>

            <span className="py-4  flex justify-center items-center">
              <span className="p-1 border border-[#f4f4f4] rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                >
                  <path
                    opacity="0.1"
                    d="M1.12891 4.34055C1.12891 2.59917 2.54057 1.1875 4.28195 1.1875H24.7768C26.5181 1.1875 27.9298 2.59917 27.9298 4.34055V24.8354C27.9298 26.5767 26.5181 27.9884 24.7768 27.9884H4.28195C2.54057 27.9884 1.12891 26.5767 1.12891 24.8354V4.34055Z"
                    stroke="#8F8F8F"
                  />
                  <path
                    d="M14.4499 16.1375C15.3211 16.1375 16.0273 15.4299 16.0273 14.557C16.0273 13.6842 15.3211 12.9766 14.4499 12.9766C13.5788 12.9766 12.8726 13.6842 12.8726 14.557C12.8726 15.4299 13.5788 16.1375 14.4499 16.1375Z"
                    fill={item.viewMail.colorClass}
                  />
                  <path
                    d="M6.66915 15.0562C7.70759 16.36 10.7966 19.837 14.4508 19.837C18.1051 19.837 21.1941 16.3602 22.2325 15.0562C22.4559 14.7664 22.4559 14.3581 22.2325 14.0817C21.1941 12.7778 18.1051 9.30082 14.4508 9.30082C10.7966 9.28765 7.70759 12.7646 6.66915 14.0685C6.43255 14.3583 6.43255 14.7664 6.66915 15.0562ZM14.4508 11.3949C16.1991 11.3949 17.6056 12.8041 17.6056 14.5558C17.6056 16.3075 16.1991 17.7167 14.4508 17.7167C12.7026 17.7167 11.2961 16.3075 11.2961 14.5558C11.2961 12.8041 12.7026 11.3949 14.4508 11.3949Z"
                    fill={item.viewMail.colorClass}
                  />
                </svg>
              </span>
            </span>

            <span className="py-4 flex justify-center items-center  rounded-md">
              <Image src={moreInfo} alt="moreInfo" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
