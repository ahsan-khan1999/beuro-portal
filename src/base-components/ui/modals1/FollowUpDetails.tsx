import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { FollowUpDetailsProps } from "@/types/follow-up";
import { formatAddress } from "@/utils/utility";
import moment from "moment";
import { useTranslation } from "next-i18next";

export interface details {
  label: string;
  value?: string;
}

const FollowUpDetails = ({
  onClose,
  handleAddPostPonedNote,
  handleAddRemarks,
  status,
  followUpDetails,
}: FollowUpDetailsProps) => {
  const { t: translate } = useTranslation();

  const detailsData: details[] = [
    {
      label: `${translate("follow_up.follow_up_details.name")}`,
      value: followUpDetails?.customer?.fullName,
    },
    {
      label: `${translate("follow_up.follow_up_details.customer_type")}`,
      value: followUpDetails?.customer?.customerType,
    },
    {
      label: `${translate("follow_up.follow_up_details.email")}`,
      value: followUpDetails?.customer?.email,
    },
    {
      label: `${translate("follow_up.follow_up_details.phone_number")}`,
      value: followUpDetails?.customer?.phoneNumber,
    },

    {
      label: `${translate("follow_up.follow_up_details.mobile_number")}`,
      value: followUpDetails?.customer?.mobileNumber,
    },
    {
      label: `${translate("follow_up.follow_up_details.address_detail")}`,
      value: formatAddress(followUpDetails?.customer?.address),
    },
  ];

  const leadsDetails: details[] = [
    {
      label: `${translate("follow_up.follow_up_details.required_service")}`,
      value: followUpDetails?.lead?.leadStatus,
    },
    {
      label: `${translate("follow_up.follow_up_details.desire_date")}`,
      value: moment(followUpDetails?.lead?.createdAt).format("DD/MM/YYY hh:mm"),
    },
    {
      label: `${translate("follow_up.follow_up_details.flexibility")}`,
      value: moment(followUpDetails?.lead?.createdAt).format("DD/MM/YYY hh:mm"),
    },
    {
      label: `${translate("follow_up.follow_up_details.budget")}`,
      value: followUpDetails?.lead?.leadStatus,
    },
  ];

  const addressDetails: details[] = [
    {
      label: translate("follow_up.address_details.street_no"),
      value: followUpDetails?.lead?.customerDetail?.address?.streetNumber,
    },
    {
      label: translate("follow_up.address_details.post_code"),
      value: followUpDetails?.lead?.customerDetail?.address?.postalCode,
    },
    {
      label: translate("follow_up.address_details.country"),
      value: followUpDetails?.lead?.customerDetail?.address?.country,
    },
    {
      label: translate("follow_up.address_details.description"),
      value: followUpDetails?.lead?.customerDetail?.address?.description,
    },
  ];


  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[1200px] min-h-fit"
    >
      <main className="relative pt-[28px] pb-[37px] px-[40px]">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />

        {/* <div className="flex flex-col"> */}
        <section className="flex justify-between items-center mb-5 border-b border-b-[#000] border-opacity-10 pb-5">
          <h2 className="font-medium text-2xl text-black">
            {translate("follow_up.main_heading")}
          </h2>
          <div className="flex items-center gap-x-[14px] mr-5">
            {/*@ts-ignore  */}
            {!followUpDetails?.isPostponed && (
              <>
                <span
                  onClick={() => handleAddPostPonedNote()}
                  className="border border-[#C7C7C7] rounded-lg flex items-center gap-x-3 pl-4 pr-2 py-[6px] cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="21"
                    viewBox="0 0 23 21"
                    fill="none"
                  >
                    <path
                      d="M18.9734 2.1116H16.8256V1.10902C16.8256 0.843123 16.7124 0.588113 16.511 0.400094C16.3096 0.212074 16.0365 0.106445 15.7517 0.106445C15.4669 0.106445 15.1937 0.212074 14.9923 0.400094C14.7909 0.588113 14.6778 0.843123 14.6778 1.10902V2.1116H8.23435V1.10902C8.23435 0.843123 8.12121 0.588113 7.91982 0.400094C7.71842 0.212074 7.44527 0.106445 7.16045 0.106445C6.87564 0.106445 6.60248 0.212074 6.40109 0.400094C6.19969 0.588113 6.08655 0.843123 6.08655 1.10902V2.1116H3.93875C3.0843 2.1116 2.26484 2.42849 1.66066 2.99255C1.05647 3.55661 0.717041 4.32164 0.717041 5.11934V17.1503C0.717041 17.948 1.05647 18.713 1.66066 19.2771C2.26484 19.8411 3.0843 20.158 3.93875 20.158H18.9734C19.8278 20.158 20.6473 19.8411 21.2515 19.2771C21.8556 18.713 22.1951 17.948 22.1951 17.1503V5.11934C22.1951 4.32164 21.8556 3.55661 21.2515 2.99255C20.6473 2.42849 19.8278 2.1116 18.9734 2.1116ZM20.0473 17.1503C20.0473 17.4162 19.9341 17.6712 19.7327 17.8592C19.5313 18.0472 19.2582 18.1529 18.9734 18.1529H3.93875C3.65393 18.1529 3.38078 18.0472 3.17938 17.8592C2.97799 17.6712 2.86484 17.4162 2.86484 17.1503V10.1322H20.0473V17.1503ZM20.0473 8.12707H2.86484V5.11934C2.86484 4.85344 2.97799 4.59843 3.17938 4.41041C3.38078 4.22239 3.65393 4.11676 3.93875 4.11676H6.08655V5.11934C6.08655 5.38524 6.19969 5.64025 6.40109 5.82827C6.60248 6.01629 6.87564 6.12191 7.16045 6.12191C7.44527 6.12191 7.71842 6.01629 7.91982 5.82827C8.12121 5.64025 8.23435 5.38524 8.23435 5.11934V4.11676H14.6778V5.11934C14.6778 5.38524 14.7909 5.64025 14.9923 5.82827C15.1937 6.01629 15.4669 6.12191 15.7517 6.12191C16.0365 6.12191 16.3096 6.01629 16.511 5.82827C16.7124 5.64025 16.8256 5.38524 16.8256 5.11934V4.11676H18.9734C19.2582 4.11676 19.5313 4.22239 19.7327 4.41041C19.9341 4.59843 20.0473 4.85344 20.0473 5.11934V8.12707Z"
                      fill="#4A13E7"
                    />
                  </svg>
                  {translate("follow_up.post_pond_button")}
                </span>
              </>
            )}

            {!followUpDetails?.isCompleted && (
              <span
                onClick={() => handleAddRemarks()}
                className="border border-[#C7C7C7] rounded-lg flex items-center gap-x-3 pl-4 pr-2 py-[6px] cursor-pointer "
              >
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
                {translate("follow_up.mark_as_complete")}
              </span>
            )}

            {followUpDetails.isCompleted && (
              <span className="border border-[#C7C7C7] rounded-lg flex items-center gap-x-3 pl-4 pr-2 py-[6px] cursor-default ">
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
                {translate("follow_up.completed_button")}
              </span>
            )}
          </div>
        </section>

        {followUpDetails?.isCompleted ? (
          <div className="flex flex-col gap-y-1 mt-1">
            <p className="text-[#4D4D4D] text-sm font-normal">
              {translate("follow_up.follow_up_details.remark")}
            </p>
            <p className="text-[#484848] text-base font-normal">
              {followUpDetails?.completeRemarks}
            </p>
          </div>
        ) : followUpDetails?.isPostponed ? (
          <div className="flex flex-col gap-y-1 mt-1">
            <p className="text-[#4D4D4D] text-sm font-normal">
              {translate("follow_up.follow_up_details.postpond_note")}
            </p>
            <p className="text-[#484848] text-base font-normal">
              {followUpDetails?.postPonedNote}
            </p>
          </div>
        ) : null}

        <div className="min-h-[600px] max-h-[600px] overflow-y-scroll">
          <section className="grid grid-cols-2 mt-[30px] mb-[18px] ">
            <div className="flex flex-col border-r border-[#000] border-opacity-10 pr-5">
              <article className="flex gap-x-[50px] items-center">
                <h2 className="text-lg font-medium text-[#393939]">
                  {translate("follow_up.customer_detail_heading")}
                </h2>
                <span className="text-lg font-medium text-[#4A13E7]">
                  {translate("follow_up.follow_up_details.id")}:{" "}
                  {followUpDetails?.customer?.refID}
                </span>
              </article>

              <div className="grid grid-cols-2 gap-x-3 mt-[22px]">
                {detailsData.map((item, index) => (
                  <div className="flex flex-col gap-y-[10px] mb-5" key={index}>
                    <p className="text-sm font-normal text-[#4D4D4D]">
                      {item.label}
                    </p>
                    <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col pl-[30px]">
              <h2 className="text-lg font-medium text-[#393939]">
                {translate("follow_up.follow_up_detail_heading")}
              </h2>

              <div className="flex flex-col gap-y-[10px] mb-5">
                <p className="text-sm font-normal text-[#4D4D4D]">
                  {translate("follow_up.additional_detail_heading")}
                </p>
                <p className="border border-[#EBEBEB] rounded-lg p-4 handleFollowUpsDetailstext-[#4B4B4B] font-medium text-base min-h-[58px]">
                  {followUpDetails?.additionalDetails}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-3 border-t border-[#000] border-opacity-10 pt-3">
            <div className="flex flex-col">
              <article className="flex gap-x-[50px] items-center">
                <h2 className="text-lg font-medium text-[#393939]">
                  {translate("follow_up.lead_detail_heading")}
                </h2>
                <span className="text-lg font-medium text-[#4A13E7]">
                  {translate("follow_up.follow_up_details.id")}:{" "}
                  {followUpDetails?.lead?.refID}
                </span>
              </article>

              <div className="grid grid-cols-4 gap-x-[25px] mt-[23px]">
                {leadsDetails.map((item, index) => (
                  <div className="flex flex-col gap-y-[10px]" key={index}>
                    <p className="text-sm font-normal text-[#4D4D4D]">
                      {item.label}
                    </p>
                    <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <h2 className="text-base font-normal text-[#8F8F8F]">
                {translate("follow_up.address_detail_heading")}
              </h2>

              <div className="grid grid-cols-[minmax(200px,_100%)_minmax(100px,_100%)_minmax(200px,_100%)_minmax(400px,_100%)] gap-x-[25px] mt-3">
                {addressDetails.map((item, index) => (
                  <div className="flex flex-col gap-y-[10px]" key={index}>
                    <p className="text-sm font-normal text-[#4D4D4D]">
                      {item.label}
                    </p>
                    <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base min-h-[58px] truncate">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        {/* </div> */}
      </main>
    </BaseModal>
  );
};

export default FollowUpDetails;
