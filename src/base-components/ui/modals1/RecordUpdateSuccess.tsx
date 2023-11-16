import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { UpdateSuccessProps } from "@/types/global";
import { Button } from "../button/button";

const RecordUpdateSuccess = ({ onClose, modelHeading, modelSubHeading, cancelHandler, confirmHandler,loading }: UpdateSuccessProps) => {
    return (
        <>
            <BaseModal
                onClose={onClose}
                containerClassName="max-w-[564px] min-h-auto max-h-auto"
            >
                <div className="relative flex flex-col items-center">
                    <Image src={createdIcon} alt="delete_icon" className="mt-[47px]" />
                    <p className="text-[#000] font-medium text-[24px] leading-7 mt-[40px]  text-center ">
                        {modelHeading}
                    </p>

                    <span className="text-[#1E1E1E] font-normal text-[14px] mt-[6px]">
                        {modelSubHeading}
                    </span>
                    <div className="flex justify-between my-5 space-x-4">
                        <button
                            onClick={cancelHandler}
                            className="bg-[#BFBFBF] cursor-pointer mt-[32px] mb-[66px] px-5 w-[150px] rounded-lg p-4 text-white text-base font-medium"
                        >
                            Cancel
                        </button>
                        <Button
                            id="confirm"
                            inputType="button"
                            loading={loading}
                            onClick={confirmHandler}
                            text="Confirm"
                            className="bg-[#4A13E7] cursor-pointer mt-[32px] mb-[66px] px-5 w-[150px] rounded-lg  text-white text-base font-medium"
                        />

                    </div>

                </div>
            </BaseModal>
        </>
    );
};

export default RecordUpdateSuccess;
