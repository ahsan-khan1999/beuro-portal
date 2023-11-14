import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";

type details = {
  label: string;
  value: string;
};

const FollowUpDetails = ({
  onClose,
  handleAddPostPonedNote,
  handleAddRemarks,
}: {
  onClose: () => void;
  handleAddPostPonedNote: Function;
  handleAddRemarks: Function;
}) => {
  const detailsData: details[] = [
    {
      label: "Name",
      value: "Rahal Ahmed",
    },
    {
      label: "Customer Type",
      value: "Individual",
    },
    {
      label: "Email Address",
      value: "rahal.ahmad@gmail.com",
    },
    {
      label: "Phone Number",
      value: "+49 445612 2112",
    },

    {
      label: "Mobile Number",
      value: "+49 445612 2112",
    },
    {
      label: "Address Details",
      value: `Mohrenstrasse 37 10117 Berlin`,
    },
  ];

  const followUpDetails: details[] = [
    {
      label: "Title/Subject",
      value: "Offerten Follow up",
    },
    {
      label: "Follow up Date and Time",
      value: "22:10:06,  12 September 2023",
    },
    {
      label: "Follow Up type",
      value: "Reason",
    },
  ];

  const leadsDetails: details[] = [
    {
      label: "Required Service ",
      value: "Cleaning",
    },
    {
      label: "Desire Date and time",
      value: "22:10:06,  12 September 2023",
    },
    {
      label: "Flexibility",
      value: "25/09 to 28/09",
    },
    {
      label: "Budget",
      value: "Less then 1000CHF",
    },
  ];

  const addressDetails: details[] = [
    {
      label: "Street NO.",
      value: "Zweibrückenstraße, 12 ",
    },
    {
      label: "Post Code",
      value: "1234",
    },
    {
      label: "Country",
      value: "Switzerland",
    },
    {
      label: "Description",
      value: "Lorem ipsum dolor sit amet, sit dolr s...View more",
    },
  ];

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="w-full max-w-[1200px] min-h-[752.521px] max-h-[752.521px] overflow-scroll"
      >
        <main className="relative pt-[28px] pb-[37px] px-[40px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <div className="flex flex-col">
            <section className="flex justify-between items-center mb-5">
              <h2 className="font-medium text-2xl text-black">Details</h2>
              <div className="flex items-center gap-x-[14px] mr-5">
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
                  Postponed
                </span>
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
                    <g clip-path="url(#clip0_1225_39586)">
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
                  Mark as Complete
                </span>
              </div>
            </section>

            <hr className="opacity-10" />

            <div className="flex flex-col gap-y-1 mt-1">
              <p className="text-[#4D4D4D] text-sm font-normal ">
                Your Postponed Note
              </p>
              <p className="text-[#484848] text-base font-normal ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. sitl
                Pellentesque viverra Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>

            <section className="grid grid-cols-2 mt-[30px] mb-[18px]">
              {/* customer details */}
              <div className="flex flex-col border-r border-[#000] border-opacity-10 pr-5">
                <article className="flex gap-x-[50px] items-center">
                  <h2 className="text-lg font-medium text-[#393939]">
                    Customer Details
                  </h2>
                  <span className="text-lg font-medium text-[#4A13E7]">
                    ID: 001
                  </span>
                </article>

                <div className="grid grid-cols-2 gap-x-3 mt-[22px]">
                  {detailsData.map((item, index) => (
                    <div
                      className="flex flex-col gap-y-[10px] mb-5"
                      key={index}
                    >
                      <p className="text-sm font-normal text-[#4D4D4D]">
                        {item.label}
                      </p>
                      <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* follow up details */}
              <div className="flex flex-col pl-[30px]">
                <h2 className="text-lg font-medium text-[#393939]">
                  Follow up Details
                </h2>

                <div className="grid grid-cols-2 gap-x-3 mt-[22px]">
                  {followUpDetails.map((item, index) => (
                    <div
                      className="flex flex-col gap-y-[10px] mb-5"
                      key={index}
                    >
                      <p className="text-sm font-normal text-[#4D4D4D]">
                        {item.label}
                      </p>
                      <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-y-[10px] mb-5">
                  <p className="text-sm font-normal text-[#4D4D4D]">
                    Additional Detail
                  </p>
                  <p className="border border-[#EBEBEB] rounded-lg p-4 handleFollowUpsDetailstext-[#4B4B4B] font-medium text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    sitl Pellentesque viverra venenatis velit et tristique. Nam
                    quis a eros sit amet ipsum imperdiet molestie Etiam
                    ut....View more
                  </p>
                </div>
              </div>
            </section>

            <hr className="opacity-10" />

            {/* Below part */}
            <section className="mt-3 ">
              {/* Leads details */}
              <div className="flex flex-col">
                <article className="flex gap-x-[50px] items-center">
                  <h2 className="text-lg font-medium text-[#393939]">
                    Lead Details
                  </h2>
                  <span className="text-lg font-medium text-[#4A13E7]">
                    ID: 001-1
                  </span>
                </article>

                <div className="grid grid-cols-4 gap-x-[25px] mt-[23px]">
                  {leadsDetails.map((item, index) => (
                    <div className="flex flex-col gap-y-[10px] " key={index}>
                      <p className="text-sm font-normal text-[#4D4D4D]">
                        {item.label}
                      </p>
                      <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address details */}
              <div className="flex flex-col mt-5">
                <h2 className="text-base font-normal text-[#8F8F8F]">
                  Address Details
                </h2>

                <div className="grid grid-cols-[minmax(200px,_100%)_minmax(100px,_100%)_minmax(200px,_100%)_minmax(400px,_100%)] gap-x-[25px] mt-3">
                  {addressDetails.map((item, index) => (
                    <div className="flex flex-col gap-y-[10px]" key={index}>
                      <p className="text-sm font-normal text-[#4D4D4D]">
                        {item.label}
                      </p>
                      <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </BaseModal>
    </>
  );
};

export default FollowUpDetails;
