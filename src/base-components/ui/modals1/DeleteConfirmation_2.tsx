import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import deleteConfirmIcon from "@/assets/svgs/delete_confirm_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Button } from "../button/button";

const DeleteConfirmation_2 = ({
  onClose,
  modelHeading,
  routeHandler,
  loading
}: {
  onClose: () => void;
  modelHeading: string;
  routeHandler: Function;
  loading: boolean
}) => {
  
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[564.004px] min-h-auto"
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
            className="mt-[59px]"
          />
          <p className="text-[#000] font-medium text-[20px] leading-7 mt-[44px] max-w-[290px] text-center ">
            {modelHeading}
          </p>

          <div className="flex gap-[33px] mt-[27px] mb-[38px]">
            <button
              onClick={onClose}
              className="py-[11px] px-[25px] text-[#fff] bg-[#BFBFBF] rounded-md"
            >
              Cancel
            </button>

            <Button id="Delete" inputType="submit" loading={loading} text="Confirm" onClick={routeHandler}
              className=" px-[25px] text-[#fff] bg-[#FF0000] rounded-md"
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default DeleteConfirmation_2;
