import { CustomerTable } from "@/types/admin/customer";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import moreInfoIcon from "@/assets/svgs/entity_more_info.svg";

const TableRow = ({ currentPageRows }: CustomerTable) => {
  const router = useRouter();
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/admin/customers/details",
                query: { customer: item.id },
              })
            }
            key={index}
            className="hover:bg-[#E9E1FF] bg-white px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(60px,_60px),minmax(80px,_80px)_minmax(200px,_200px)_minmax(160px,_160px)_minmax(240px,_100%)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(150px,_100%)_minmax(140px,_140px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(150px,_100%)_minmax(140px,_140px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(180px,_180px)_minmax(140px,_140px)_minmax(160px,_100%)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(40px,_40px)] mt-2  rounded-md"
          >
            <span className="py-4  rounded-md flex items-center">
              {item.id}
            </span>
            <span className="py-4  flex items-center justify-center">
              <Image
                src={item.logo}
                alt="company logo"
              />
            </span>
            <span className="py-4  flex items-center">
              {item.companyName}
            </span>
            <span className="py-4  flex items-center">
              {item.customerName}
            </span>
            <span className="xs:flex mlg:hidden xlg:hidden maxSize:flex py-4  items-center">
              {item.email}
            </span>
            <span className="py-4  flex items-center">
              {item.plans}
            </span>
            <span className="py-4  flex items-center justify-center">
              <div
                className={`${
                  item.status.includes("Active")
                    ? "bg-[#4A13E7]"
                    : "bg-[#FF0000]"
                } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm`}
              >
                {item.status}
              </div>
            </span>
            <span className="py-4  flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
              >
                <rect
                  x="1.24072"
                  y="0.96875"
                  width="39"
                  height="39"
                  rx="7.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
                <path
                  d="M16.9082 19.8602H8.35358C7.98078 19.8602 7.67822 19.5879 7.67822 19.2524C7.67822 18.9168 7.98078 18.6445 8.35358 18.6445H16.9082C17.281 18.6445 17.5836 18.9168 17.5836 19.2524C17.5836 19.5879 17.281 19.8602 16.9082 19.8602Z"
                  fill="#4A13E7"
                />
                <path
                  d="M13.5326 22.898C13.3597 22.898 13.1869 22.8388 13.0553 22.7198C12.7915 22.4822 12.7915 22.0973 13.0553 21.8598L15.9549 19.2503L13.0553 16.6415C12.7915 16.404 12.7915 16.019 13.0553 15.7816C13.3191 15.5442 13.7468 15.5442 14.0108 15.7816L17.3876 18.8207C17.6514 19.0581 17.6514 19.4431 17.3876 19.6807L14.0108 22.7198C13.8784 22.8388 13.7054 22.898 13.5326 22.898Z"
                  fill="#4A13E7"
                />
                <path
                  d="M22.087 30.1933C21.0937 30.1933 20.2861 29.4663 20.2861 28.5724V13.9846C20.2861 13.2918 20.776 12.6734 21.5053 12.4456L26.9154 10.8223C28.1257 10.4884 29.2909 11.2965 29.2909 12.3639V26.9516C29.2909 27.6438 28.801 28.2612 28.0726 28.4898L22.6606 30.1139C22.4634 30.169 22.2807 30.1933 22.087 30.1933ZM27.4899 11.9586C27.4313 11.9586 27.3819 11.9651 27.3288 11.9797L21.9412 13.5964C21.7646 13.6516 21.6369 13.812 21.6369 13.9846V28.5724C21.6369 28.8489 21.9699 29.0353 22.2482 28.9566L27.6358 27.3398C27.8114 27.2846 27.9402 27.1242 27.9402 26.9516V12.3639C27.9402 12.141 27.7385 11.9586 27.4899 11.9586Z"
                  fill="#4A13E7"
                />
                <path
                  d="M15.5587 14.7944C15.1859 14.7944 14.8833 14.5221 14.8833 14.1866V12.9709C14.8833 11.7415 15.9935 10.7422 17.3595 10.7422H27.4899C27.8627 10.7422 28.1653 11.0145 28.1653 11.35C28.1653 11.6855 27.8627 11.9578 27.4899 11.9578H17.3595C16.7391 11.9578 16.234 12.4125 16.234 12.9709V14.1866C16.234 14.5221 15.9315 14.7944 15.5587 14.7944Z"
                  fill="#4A13E7"
                />
                <path
                  d="M20.9615 27.7612H17.3595C15.9935 27.7612 14.8833 26.7619 14.8833 25.5325V24.3168C14.8833 23.9813 15.1859 23.709 15.5587 23.709C15.9315 23.709 16.234 23.9813 16.234 24.3168V25.5325C16.234 26.0909 16.7391 26.5455 17.3595 26.5455H20.9615C21.3343 26.5455 21.6369 26.8179 21.6369 27.1534C21.6369 27.4889 21.3343 27.7612 20.9615 27.7612Z"
                  fill="#4A13E7"
                />
              </svg>
            </span>

            <span className="py-4 flex justify-center items-center  rounded-md">
              <Image src={moreInfoIcon} alt="moreInfoIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
