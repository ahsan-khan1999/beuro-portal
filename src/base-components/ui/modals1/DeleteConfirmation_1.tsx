import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import deleteConfirmIcon from "@/assets/svgs/delete_confirm_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";

const DeleteConfirmation_1 = ({ handleDelete, onClose }: { handleDelete: Function; onClose: () => void }) => {
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[564px] min-h-auto"
      >
        <div className="relative flex flex-col items-center">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <Image
            src={deleteConfirmIcon}
            alt="delete_icon"
            className="mt-[66px]"
          />
          <p className="text-[#000] font-medium text-[20px] leading-7 my-2">
            Please confirm Email ID No.
          </p>
          <p className="text-[#4D4D4D] font-normal text-sm ">
            Enter Your Email ID No.
          </p>
          <div className="mt-[10px] w-[260px] p-4 rounded-lg border border-[#EBEBEB] text-[#4B4B4B] text-base font-medium">
            ID: &nbsp; A-0001
          </div>

          <div className="flex gap-[33px] mt-[26px] mb-[38px]">
            <button onClick={onClose} className="py-[11px] px-[25px] text-[#fff] bg-[#BFBFBF] rounded-md">
              Cancel
            </button>
            <button onClick={() => handleDelete()} className="py-[11px] px-[25px] text-[#fff] bg-[#FF0000] rounded-md">
              Confirm
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default DeleteConfirmation_1;
