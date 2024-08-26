import { CustomersAdmin } from "@/types/admin/customer";
import Image from "next/image";
import React from "react";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { DropDownItem } from "@/types";
import { formatDateTimeToDate } from "@/utils/utility";
import userIcon from "@/assets/svgs/Group 48095860.svg";
import { useRouter } from "next/router";

const DetailsData = ({
  customerDetail,
  isCustomerFree,
  onHandleBack,
  handleAreYouSure,
  handleStatusChange,
}: {
  customerDetail: CustomersAdmin;
  isCustomerFree: boolean;
  onHandleBack: () => void;
  handleAreYouSure: () => void;
  handleStatusChange: (value: string) => void;
}) => {
  const router = useRouter();
  const customerStatus = [
    `${translate("customer_status.unBlock")}`,
    `${translate("customer_status.block")}`,
  ];

  const items: DropDownItem[] = [
    {
      item: {
        label: customerStatus[0],
        value: "unBlock",
      },
    },
    {
      item: {
        label: customerStatus[1],
        value: "block",
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center pb-5">
        <div className="flex items-center">
          <div onClick={onHandleBack} className="cursor-pointer">
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
            {translate("admin.customers_details.card_content.main_heading")}
          </h1>
        </div>
        <button
          onClick={handleAreYouSure}
          className="flex items-center rounded-lg border border-[#C7C7C7] px-4 py-[11px] text-[#4B4B4B] font-medium gap-3 w-fit"
        >
          {!isCustomerFree ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0_1225_39586)">
                <path
                  d="M16.3104 0.874512H3.31461C1.65918 0.874512 0.3125 2.22119 0.3125 3.87662V16.8724C0.3125 18.5278 1.65918 19.8745 3.31461 19.8745H16.3104C17.9658 19.8745 19.3125 18.5278 19.3125 16.8724V3.87662C19.3125 2.22119 17.9658 0.874512 16.3104 0.874512ZM17.3111 16.8724C17.3111 17.4241 16.8621 17.8731 16.3104 17.8731H3.31461C2.76287 17.8731 2.31399 17.4241 2.31399 16.8724V3.87662C2.31399 3.32488 2.76292 2.876 3.31461 2.876H16.3104C16.8621 2.876 17.311 3.32493 17.311 3.87662V16.8724H17.3111Z"
                  fill="#4A13E7"
                />
              </g>
              <defs>
                <clipPath id="clip0_1225_39586">
                  <rect
                    width="19"
                    height="19"
                    fill="white"
                    transform="translate(0.3125 0.874512)"
                  />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0_1231_58187)">
                <path
                  d="M16.8563 0.117188H3.8605C2.20508 0.117188 0.858398 1.46387 0.858398 3.11929V16.1151C0.858398 17.7705 2.20508 19.1172 3.8605 19.1172H16.8563C18.5117 19.1172 19.8584 17.7705 19.8584 16.1151V3.11929C19.8584 1.46387 18.5117 0.117188 16.8563 0.117188ZM17.857 16.1151C17.857 16.6668 17.408 17.1157 16.8563 17.1157H3.8605C3.30877 17.1157 2.85989 16.6668 2.85989 16.1151V3.11929C2.85989 2.56755 3.30882 2.11868 3.8605 2.11868H16.8563C17.408 2.11868 17.8569 2.56761 17.8569 3.11929V16.1151H17.857Z"
                  fill="#4A13E7"
                />
                <path
                  d="M14.7096 5.53857C14.3698 5.53857 14.0504 5.67096 13.8101 5.91135L9.1035 10.6256L7.84906 9.3713C7.60889 9.13107 7.28956 8.99874 6.94989 8.99874C6.61017 8.99874 6.29083 9.13107 6.05061 9.37124C5.81045 9.61141 5.67822 9.93074 5.67822 10.2704C5.67822 10.6101 5.81045 10.9294 6.05061 11.1695L8.2045 13.3234C8.44467 13.5636 8.764 13.696 9.10372 13.696C9.44328 13.696 9.76272 13.5636 10.0032 13.3232L15.6088 7.70952C16.1045 7.21363 16.1044 6.40685 15.6088 5.91096C15.3686 5.67085 15.0492 5.53857 14.7096 5.53857Z"
                  fill="#4A13E7"
                />
              </g>
              <defs>
                <clipPath id="clip0_1231_58187">
                  <rect
                    width="19"
                    height="19"
                    fill="white"
                    transform="translate(0.858398 0.117188)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
          {isCustomerFree
            ? `${translate(
                "admin.customers_details.card_content.make_button_checked"
              )}`
            : `${translate(
                "admin.customers_details.card_content.make_button_unchecked"
              )}`}
        </button>
      </div>

      <div className="border-t border-t-[#000] border-opacity-10 pt-5">
        <div className="grid gap-x-5 grid-cols-2 xLarge:grid-cols-[minmax(150px,_150px)_minmax(170px,_170px)_minmax(200px,_200px)_minmax(150px,_100%)_minmax(200px,_100%)] gap-y-2">
          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D] ">
              {translate("admin.customers_details.card_content.customer_id")}:
            </span>

            <span className="text-[#4B4B4B] font-medium">
              {customerDetail?.company?.refID}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D] ">
              {translate("admin.customers_details.card_content.role")}:
            </span>

            <span className=" text-[#4B4B4B] font-medium">
              {translate(`admin_role.${customerDetail?.role}`)}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D]">
              {translate("admin.customers_details.card_content.no_of_employee")}
              :
            </span>

            <span className="text-[#4B4B4B] font-medium">
              {customerDetail?.plan?.numberOfEmployees}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D]">
              {translate("admin.customers_details.card_content.plan")}:
            </span>

            <span className="text-[#4B4B4B] font-medium">
              {translate(`plan_status.${customerDetail?.plan?.planName}`)}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D]">
              {translate(
                "admin.customers_details.card_content.subscription_date"
              )}
              :
            </span>
            <span className="text-[#4B4B4B] font-medium">
              {formatDateTimeToDate(customerDetail?.plan?.createdAt)}
            </span>
          </div>
        </div>
        <div className="mt-5 flex justify-between lg:grid lg:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D] flex items-center">
              {translate("admin.customers_details.card_content.status")}:
            </span>

            <DropDown
              items={items}
              onItemSelected={(selectedItem) =>
                handleStatusChange(selectedItem)
              }
              selectedItem={customerDetail?.status}
              dropDownClassName="min-w-[108.445px] w-fit border border-primary justify-between py-1"
              dropDownTextClassName="text-primary font-medium"
              dropDownIconClassName="text-primary"
              dropDownItemsContainerClassName="border border-primary w-fit"
            />
          </div>

          <div className="flex items-center gap-x-3">
            <span className="text-[#4D4D4D] flex items-center">
              {translate("admin.customers_details.card_content.company_logo")}:
            </span>

            <Image
              src={customerDetail?.company?.logo || userIcon}
              alt="company logo"
              height={50}
              width={40}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsData;
