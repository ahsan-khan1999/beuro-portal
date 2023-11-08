import { CustomersAdmin } from "@/types/admin/customer";
import Image from "next/image";
import React from "react";
const DetailsData = ({
  customerDetail,
  handlePreviousClick,
}: {
  customerDetail: CustomersAdmin;
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
            Customers Details
          </h1>
        </div>
        <button className="flex items-center rounded-lg border border-[#C7C7C7] px-4 py-[11px] text-[#4B4B4B] font-medium gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clip-path="url(#clip0_2278_94181)">
              <path
                d="M16.9725 0.234375H3.97671C2.32129 0.234375 0.974609 1.58105 0.974609 3.23648V16.2323C0.974609 17.8877 2.32129 19.2344 3.97671 19.2344H16.9725C18.6279 19.2344 19.9746 17.8877 19.9746 16.2323V3.23648C19.9746 1.58105 18.6279 0.234375 16.9725 0.234375ZM17.9732 16.2323C17.9732 16.784 17.5242 17.2329 16.9726 17.2329H3.97671C3.42498 17.2329 2.9761 16.784 2.9761 16.2323V3.23648C2.9761 2.68474 3.42503 2.23587 3.97671 2.23587H16.9725C17.5242 2.23587 17.9731 2.68479 17.9731 3.23648V16.2323H17.9732Z"
                fill="#4A13E7"
              />
              <path
                d="M14.3556 5.38281C14.0158 5.38281 13.6964 5.5152 13.4561 5.75559L8.7495 10.4699L7.49505 9.21554C7.25489 8.97531 6.93555 8.84298 6.59589 8.84298C6.25616 8.84298 5.93683 8.97531 5.69661 9.21548C5.45644 9.45565 5.32422 9.77498 5.32422 10.1146C5.32422 10.4543 5.45644 10.7736 5.69661 11.0138L7.8505 13.1676C8.09066 13.4079 8.41 13.5402 8.74972 13.5402C9.08927 13.5402 9.40872 13.4078 9.64916 13.1674L15.2548 7.55376C15.7505 7.05787 15.7504 6.25109 15.2548 5.7552C15.0146 5.51509 14.6952 5.38281 14.3556 5.38281Z"
                fill="#4A13E7"
              />
            </g>
            <defs>
              <clipPath id="clip0_2278_94181">
                <rect
                  width="19"
                  height="19"
                  fill="white"
                  transform="translate(0.974609 0.234375)"
                />
              </clipPath>
            </defs>
          </svg>
          Make Infinite
        </button>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div>
        <div className="flex justify-between items-center ">
          <h3 className="text-[#4D4D4D] ">
            Customer ID:
            <span className="text-[#4B4B4B] font-medium ml-3">
              {customerDetail?.id}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            Role:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.role}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            No of Employs:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.employsNumber}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            Plan:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.plans}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            Subscriptions Date:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.subscriptionDate?.toLocaleDateString()}
            </span>
          </h3>
        </div>
        <div className="mt-5 flex items-center">
          <h3 className="text-[#4D4D4D] ">
            Status:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.status}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ml-[80px] flex items-center">
            Company Logo:
            <span className="text-[#4B4B4B] font-medium ml-3">
              <Image src={customerDetail?.logo} alt="company logo" />
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default DetailsData;
