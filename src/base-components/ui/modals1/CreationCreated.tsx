import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useTranslation } from "next-i18next";

const CreationCreated = ({ onClose, heading, subHeading, route }: { onClose: () => void; heading:string; subHeading:string; route:() => void }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] lg:max-w-[624.862px] min-h-fit "
      >
        <div className="relative flex flex-col items-center">
          <Image src={createdIcon} alt="delete_icon" className="mt-[47px]" />
          <p className="text-[#000] font-medium text-2xl mt-[40px] text-center ">
           {heading}
          </p>

          <span className="text-[#1E1E1E] font-normal text-sm mt-[6px] px-[60px] text-center">
            {subHeading}
          </span>

          <button
            onClick={route}
            className="bg-[#4A13E7] cursor-pointer mt-[32px] mb-6 lg:mb-[68px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            {translate("request_modal.button")}
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default CreationCreated;
