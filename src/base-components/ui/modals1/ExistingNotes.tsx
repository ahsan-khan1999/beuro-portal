import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import addNewNote from "@/assets/svgs/add_new_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";

const ExistingNotes = () => {
  return (
    <>
      <BaseModal
        onClose={() => false}
        containerClassName="max-w-[624px] min-h-auto max-h-fit"
      >
        <div className="relative flex flex-col ">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
          />
          <div className="flex justify-between items-center mb-[19px] mt-[30px] mx-[38px]">
            <p className="text-[24px] leading-6 font-medium text-[#000]">
              Notes
            </p>
            <div className="flex justify-between items-center gap-[10px] cursor-pointer">
              <Image src={addNewNote} alt="request_submitted" />
              <p className="text-[#4B4B4B] text-base">Add New Note</p>
            </div>
          </div>

          <span className="mb-[13px] w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="651"
              height="3"
              viewBox="0 0 651 3"
              fill="none"
            >
              <path
                opacity="0.1"
                d="M0.585938 1.06348L650.043 1.06342"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </span>

          <div className="mx-[41px] mb-[15px]">
            <p className="text-[#8F8F8F] text-[14px] font-normal mb-[12px]">
              Created by &nbsp;
              <span className="text-[#1E1E1E] text-base font-normal">
                Rahal Ahmed
              </span>
            </p>

            <div className="border border-[#4B4B4B] rounded-lg">
              <p className="text-[#4B4B4B]  text-base font-normal p-[17px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has a been the industry's standard dummy
                text ever since the 1500s, when an unknown printer.
              </p>
            </div>
          </div>
          <span className="mb-[13px] w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="651"
              height="3"
              viewBox="0 0 651 3"
              fill="none"
            >
              <path
                opacity="0.1"
                d="M0.585938 1.06348L650.043 1.06342"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </span>
          <div className="mx-[41px] mb-[15px]">
            <p className="text-[#8F8F8F] text-[14px] font-normal mb-[12px]">
              Created by &nbsp;
              <span className="text-[#1E1E1E] text-base font-normal">
                Rahal Ahmed
              </span>
            </p>

            <div className="border border-[#4B4B4B] rounded-lg">
              <p className="text-[#4B4B4B]  text-base font-normal p-[17px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has a been the industry's standard dummy
                text ever since the 1500s, when an unknown printer.
              </p>
            </div>
          </div>
          <span className="mb-[13px] w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="651"
              height="3"
              viewBox="0 0 651 3"
              fill="none"
            >
              <path
                opacity="0.1"
                d="M0.585938 1.06348L650.043 1.06342"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </span>
          <div className="mx-[41px] mb-[51px] ">
            <p className="text-[#8F8F8F] text-[14px] font-normal mb-[12px]">
              Created by &nbsp;
              <span className="text-[#1E1E1E] text-base font-normal">
                Rahal Ahmed
              </span>
            </p>

            <div className="border border-[#4B4B4B] rounded-lg">
              <p className="text-[#4B4B4B]  text-base font-normal p-[17px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has a been the industry's standard dummy
                text ever since the 1500s, when an unknown printer.
              </p>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default ExistingNotes;
