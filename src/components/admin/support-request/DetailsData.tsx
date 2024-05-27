import React from "react";
import { useRouter } from "next/router";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { DropDownItem } from "@/types";
import { ContactSupport } from "@/api/slices/contactSupport/contactSupportSlice";
import { formatDateTimeToDate } from "@/utils/utility";

const DetailsData = ({
  supportDetail,
  status,
  handlePreviousClick,
  handleStatusUpadte,
}: {
  supportDetail: ContactSupport | null;
  status: DropDownItem[];
  handlePreviousClick: () => void;
  handleStatusUpadte: (value: string) => void;
}) => {
  const router = useRouter();

  const itemStatus: DropDownItem[] = [
    {
      item: {
        label: `${translate("support_request_status.pending")}`,
        value: "pending",
      },
    },
    {
      item: {
        label: `${translate("support_request_status.resolved")}`,
        value: "resolved",
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center border-b border-b-[#000] border-opacity-10 pb-5">
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
                x="0.750977"
                y="0.5"
                width="39.2105"
                height="39"
                rx="7.5"
                fill="white"
                stroke="#4A13E7"
              />
              <path
                d="M23.7911 13.2658C23.975 13.4498 24.0783 13.6993 24.0783 13.9594C24.0783 14.2196 23.975 14.4691 23.7911 14.6531L18.9346 19.5095L23.7911 24.366C23.9698 24.551 24.0687 24.7989 24.0664 25.0561C24.0642 25.3134 23.961 25.5594 23.7791 25.7413C23.5972 25.9232 23.3511 26.0264 23.0939 26.0287C22.8366 26.0309 22.5888 25.932 22.4038 25.7533L16.8537 20.2032C16.6697 20.0192 16.5664 19.7697 16.5664 19.5095C16.5664 19.2494 16.6697 18.9999 16.8537 18.8159L22.4038 13.2658C22.5878 13.0818 22.8373 12.9785 23.0974 12.9785C23.3576 12.9785 23.6071 13.0818 23.7911 13.2658Z"
                fill="#4A13E7"
              />
            </svg>
          </div>
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("admin.support_requests.card_content.heading")}
          </h1>
        </div>
        <button
          onClick={() =>
            router.push({
              pathname: "/admin/customers/details",
              query: { customer: supportDetail?.createdBy?.id },
            })
          }
          className="flex items-center rounded-lg border border-primary px-4 py-[11px] text-[#4B4B4B] font-medium gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="19"
            viewBox="0 0 21 19"
            fill="none"
          >
            <path
              d="M10.6943 7.56927C12.5661 7.56927 14.0834 6.05191 14.0834 4.18015C14.0834 2.30838 12.5661 0.791016 10.6943 0.791016C8.82254 0.791016 7.30518 2.30838 7.30518 4.18015C7.30518 6.05191 8.82254 7.56927 10.6943 7.56927Z"
              fill="#4A13E7"
            />
            <path
              d="M17.5508 7.56929C18.7341 7.56929 19.6933 6.61003 19.6933 5.42673C19.6933 4.24343 18.7341 3.28418 17.5508 3.28418C16.3675 3.28418 15.4082 4.24343 15.4082 5.42673C15.4082 6.61003 16.3675 7.56929 17.5508 7.56929Z"
              fill="#4A13E7"
            />
            <path
              d="M3.83787 7.56929C5.02116 7.56929 5.98042 6.61003 5.98042 5.42673C5.98042 4.24343 5.02116 3.28418 3.83787 3.28418C2.65457 3.28418 1.69531 4.24343 1.69531 5.42673C1.69531 6.61003 2.65457 7.56929 3.83787 7.56929Z"
              fill="#4A13E7"
            />
            <path
              d="M5.94912 9.49318C5.10573 8.80219 4.34193 8.89366 3.36676 8.89366C1.90826 8.89366 0.72168 10.0732 0.72168 11.5228V15.7771C0.72168 16.4066 1.2355 16.9185 1.86736 16.9185C4.59526 16.9185 4.26663 16.9678 4.26663 16.8008C4.26663 13.7862 3.90956 11.5755 5.94912 9.49318Z"
              fill="#4A13E7"
            />
            <path
              d="M11.6221 8.90925C9.91881 8.76718 8.4383 8.91088 7.1613 9.96494C5.02432 11.6766 5.43557 13.9814 5.43557 16.8009C5.43557 17.5468 6.0425 18.1651 6.7998 18.1651C15.0226 18.1651 15.3499 18.4303 15.8375 17.3505C15.9974 16.9853 15.9536 17.1014 15.9536 13.6081C15.9536 10.8334 13.5511 8.90925 11.6221 8.90925Z"
              fill="#4A13E7"
            />
            <path
              d="M18.0218 8.89356C17.0413 8.89356 16.2817 8.80303 15.4395 9.49308C17.4638 11.5599 17.1219 13.6198 17.1219 16.8007C17.1219 16.9688 16.8491 16.9184 19.4803 16.9184C20.1348 16.9184 20.6669 16.3882 20.6669 15.7365V11.5227C20.6669 10.0731 19.4803 8.89356 18.0218 8.89356Z"
              fill="#4A13E7"
            />
          </svg>
          {translate("admin.support_requests.card_content.button")}
        </button>
      </div>
      <div className="flex flex-col gap-y-3 mlg:flex-row mlg:space-x-20 mlg:items-center mt-5">
        <div className="flex items-center gap-x-3">
          <span className="text-base font-medium text-[#4D4D4D]">
            {translate("admin.support_requests.card_content.customer_id")}:
          </span>
          <span className="text-primary font-medium">
            {supportDetail?.createdBy?.company?.refID}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="text-base font-medium text-[#4D4D4D]">
            {translate("admin.support_requests.card_content.request_date")}:
          </span>
          <span className="text-primary font-medium">
            {supportDetail && formatDateTimeToDate(supportDetail?.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="text-base font-medium text-[#4D4D4D]">
            {translate("admin.support_requests.card_content.status")}:
          </span>

          <span>
            <DropDown
              items={itemStatus}
              onItemSelected={(selectedItem) =>
                handleStatusUpadte(selectedItem)
              }
              selectedItem={translate(
                `support_request_status.${supportDetail?.status}`
              )}
              dropDownClassName="px-3 border border-primary justify-between py-[3px]"
              dropDownTextClassName="text-primary font-medium"
              dropDownIconClassName="text-primary ml-2"
              dropDownItemsContainerClassName="border border-primary w-full"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default DetailsData;
