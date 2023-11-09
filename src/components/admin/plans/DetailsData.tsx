import { SupportRequestAdmin } from "@/types/admin/support-request";
import Image from "next/image";
import React from "react";
const DetailsData = ({
  supportDetail,
  handlePreviousClick,
}: {
  supportDetail: SupportRequestAdmin;
  handlePreviousClick: () => void;
}) => {
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <div onClick={handlePreviousClick} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
            >
              <rect
                x="0.644531"
                y="0.5"
                width="39.2105"
                height="39"
                rx="7.5"
                fill="white"
                stroke="#C7C7C7"
              />
              <path
                d="M23.6836 13.2658C23.8676 13.4498 23.9709 13.6993 23.9709 13.9594C23.9709 14.2196 23.8676 14.4691 23.6836 14.6531L18.8272 19.5095L23.6836 24.366C23.8624 24.551 23.9612 24.7989 23.959 25.0561C23.9568 25.3134 23.8536 25.5594 23.6717 25.7413C23.4898 25.9232 23.2437 26.0264 22.9865 26.0287C22.7292 26.0309 22.4814 25.932 22.2964 25.7533L16.7462 20.2032C16.5623 20.0192 16.459 19.7697 16.459 19.5095C16.459 19.2494 16.5623 18.9999 16.7462 18.8159L22.2964 13.2658C22.4803 13.0818 22.7298 12.9785 22.99 12.9785C23.2502 12.9785 23.4997 13.0818 23.6836 13.2658Z"
                fill="#4B4B4B"
              />
            </svg>
          </div>
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            Request Details
          </h1>
        </div>
        <button className="flex items-center rounded-lg border border-[#C7C7C7] px-4 py-[11px] text-[#4B4B4B] font-medium gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="19"
            viewBox="0 0 21 19"
            fill="none"
          >
            <path
              d="M10.6552 7.56927C12.527 7.56927 14.0444 6.05191 14.0444 4.18015C14.0444 2.30838 12.527 0.791016 10.6552 0.791016C8.78348 0.791016 7.26611 2.30838 7.26611 4.18015C7.26611 6.05191 8.78348 7.56927 10.6552 7.56927Z"
              fill="#4B4B4B"
            />
            <path
              d="M17.5117 7.56929C18.695 7.56929 19.6542 6.61003 19.6542 5.42673C19.6542 4.24343 18.695 3.28418 17.5117 3.28418C16.3284 3.28418 15.3691 4.24343 15.3691 5.42673C15.3691 6.61003 16.3284 7.56929 17.5117 7.56929Z"
              fill="#4B4B4B"
            />
            <path
              d="M3.7988 7.56929C4.9821 7.56929 5.94136 6.61003 5.94136 5.42673C5.94136 4.24343 4.9821 3.28418 3.7988 3.28418C2.6155 3.28418 1.65625 4.24343 1.65625 5.42673C1.65625 6.61003 2.6155 7.56929 3.7988 7.56929Z"
              fill="#4B4B4B"
            />
            <path
              d="M5.91006 9.49318C5.06667 8.80219 4.30287 8.89366 3.3277 8.89366C1.8692 8.89366 0.682617 10.0732 0.682617 11.5228V15.7771C0.682617 16.4066 1.19644 16.9185 1.8283 16.9185C4.5562 16.9185 4.22757 16.9678 4.22757 16.8008C4.22757 13.7862 3.8705 11.5755 5.91006 9.49318Z"
              fill="#4B4B4B"
            />
            <path
              d="M11.583 8.90925C9.87975 8.76718 8.39924 8.91088 7.12224 9.96494C4.98526 11.6766 5.39651 13.9814 5.39651 16.8009C5.39651 17.5468 6.00344 18.1651 6.76073 18.1651C14.9835 18.1651 15.3108 18.4303 15.7984 17.3505C15.9583 16.9853 15.9145 17.1014 15.9145 13.6081C15.9145 10.8334 13.512 8.90925 11.583 8.90925Z"
              fill="#4B4B4B"
            />
            <path
              d="M17.9828 8.89356C17.0022 8.89356 16.2426 8.80303 15.4004 9.49308C17.4247 11.5599 17.0829 13.6198 17.0829 16.8007C17.0829 16.9688 16.8101 16.9184 19.4412 16.9184C20.0957 16.9184 20.6278 16.3882 20.6278 15.7365V11.5227C20.6278 10.0731 19.4412 8.89356 17.9828 8.89356Z"
              fill="#4B4B4B"
            />
          </svg>
          Customer Details
        </button>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex space-x-20 items-center ">
        <h3 className="text-[#4D4D4D] ">
          Customer ID:
          <span className="text-[#4B4B4B] font-medium ml-3">
            {supportDetail?.id}
          </span>
        </h3>
        <h3 className="text-[#4D4D4D] ">
          Request Date:
          <span className="ml-3 text-[#4B4B4B] font-medium">
            {supportDetail?.requestDate?.toLocaleDateString()}
          </span>
        </h3>
        <h3 className="text-[#4D4D4D] ">
          Status:
          <span className="ml-3 text-[#4B4B4B] font-medium">
            {supportDetail?.status}
          </span>
        </h3>
      </div>
    </>
  );
};

export default DetailsData;
