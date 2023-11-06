import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useRouter } from "next/router";

const ContentCreated = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[564px] min-h-auto"
      >
        <div className="relative flex flex-col items-center">
          <Image src={createdIcon} alt="delete_icon" className="mt-[47px]" />
          <p className="text-[#000] font-medium text-[24px] leading-7 mt-[40px]  text-center ">
            Content Created Successful
          </p>

          <span className="text-[#1E1E1E] font-normal text-[14px] mt-[6px]">
            Thanks for creating offer we are happy to have you.
          </span>

          <button
            onClick={() => router.push("/content")}
            className="bg-[#4A13E7] cursor-pointer mt-[32px] mb-[68px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            Done
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default ContentCreated;
