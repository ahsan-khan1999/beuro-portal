import { CustomerTable } from "@/types/customer";
import { useRouter } from "next/router";
import React from "react";

const TableRow = ({ currentPageRows }: CustomerTable) => {
  const router = useRouter();
  return (
    <>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/customers/details",
                query: { customer: item.id },
              })
            }
            key={index}
            className="hover:bg-[#E9E1FF] bg-white cursor-pointer px-6 shadow-tableRow grid gap-x-4 xs:w-fit mlg:w-full xs:grid-cols-[minmax(50px,_50px),minmax(150px,_150px)_minmax(250px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(150px,_100%)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(190px,_100%)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(40px,_40px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(110px,_110px)_minmax(150px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(40px,_40px)] xMaxSize:grid-cols-[minmax(50px,_50px),minmax(150px,_150px)_minmax(180px,_100%)_minmax(140px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(40px,_40px)] mt-2  rounded-md"
          >
            <span className=" py-4 rounded-md flex items-center">
              {item.refID}
            </span>
            <span className=" py-4 flex items-center">{item.fullName}</span>

            <span className=" py-4 flex items-center">{item.email}</span>
            <span className=" py-4 flex items-center">{item.phoneNumber}</span>
            <span className=" py-4 xlg:flex items-center mlg:hidden ">
              {item.createdAt}
            </span>
            <span className=" py-4 flex items-center">
              {item.address.country}
            </span>
            <span className="py-4 flex items-center"> {item.customerType}</span>
            <span className=" flex justify-center items-center">
              <div className="p-[5px] rounded-md border border-[#8F8F8F] border-opacity-10 w-[27px] h-[27px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.8694 2.80119C12.2787 2.41607 12.8246 2.20703 13.3849 2.20703C13.9453 2.20703 14.4912 2.41607 14.9005 2.80119L14.9005 2.80126L15.0224 2.91593L15.0225 2.91601C15.4332 3.3027 15.6731 3.83715 15.6731 4.40475C15.6731 4.97235 15.4332 5.5068 15.0225 5.89349L15.0224 5.89356L13.9028 6.94726C13.8999 6.95003 13.897 6.95278 13.8941 6.9555L6.81563 13.6176C6.71969 13.7079 6.60165 13.7713 6.47339 13.8015L3.64006 14.4681C3.38351 14.5285 3.11411 14.4498 2.93043 14.2608C2.74675 14.0718 2.67575 13.8003 2.74341 13.5455L3.45175 10.8789C3.48767 10.7436 3.5607 10.6212 3.66259 10.5253L10.742 3.86226C10.7449 3.85947 10.7479 3.8567 10.7508 3.85397L11.8693 2.80126L11.8694 2.80119ZM11.2599 5.43468L4.84652 11.4708L4.51432 12.7215L5.93405 12.3874L12.2906 6.40475L11.2599 5.43468ZM13.3849 5.37481L12.3543 4.40475L12.8973 3.89364C12.8973 3.89361 12.8974 3.89359 12.8974 3.89356C13.0194 3.7788 13.194 3.70703 13.3849 3.70703C13.5759 3.70703 13.7505 3.7788 13.8725 3.89356C13.8725 3.89359 13.8726 3.89362 13.8726 3.89364L13.9943 4.00815C14.1147 4.12154 14.1731 4.26524 14.1731 4.40475C14.1731 4.54422 14.1147 4.68789 13.9943 4.80126C13.9943 4.80129 13.9943 4.80131 13.9943 4.80134L13.3849 5.37481ZM9.09328 13.7381C9.09328 13.3239 9.42906 12.9881 9.84328 12.9881H15.5099C15.9242 12.9881 16.2599 13.3239 16.2599 13.7381C16.2599 14.1523 15.9242 14.4881 15.5099 14.4881H9.84328C9.42906 14.4881 9.09328 14.1523 9.09328 13.7381Z"
                    fill="#4A13E7"
                  />
                </svg>
              </div>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default TableRow;
