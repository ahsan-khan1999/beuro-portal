import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";

const ImageCarousal = () => {
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
          <div className="flex justify-between items-center  px-[26px] py-[21px]">
            <p className="text-[24px] leading-6 font-medium text-[#000]">
            Image Name
            </p>
          </div>

          <span className="mb-[30px] w-[90%] mx-auto flex justify-center items-center">
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

          <div className="mx-[42px]">
            <p className="text-[14px] font-normal  mb-[12px]">Add your Note </p>
            <div className="border border-[#4B4B4B] rounded-lg p-[17px] mb-[30px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has a been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took is galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five lorm centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages
            </div>
            <button className="py-[11px] px-[25px] text-[#fff] bg-[#4A13E7] w-[200px] rounded-md mb-[32px]">
              Save
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default ImageCarousal;
