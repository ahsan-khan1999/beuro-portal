import React from "react";
import { InfoModal } from "../info-modal";
import viewIcon from "@/assets/svgs/view-icon.svg";
import Image from "next/image";
import { Button } from "../../button/button";

const DeactivateAccount3 = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Deactivate your account"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <h2 className="mt-12  font-medium text-lg text-dark">
        Enter password details to deactivate your account
      </h2>
      <p className="text-gray font-medium mt-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <p className="text-gray font-medium mt-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <hr className="h-[2px] text-[#707070] opacity-20 mt-10 mb-7" />
      <label className="font-medium text-dark ">Password</label>
      <div className="flex items-center py-3 px-4 rounded-lg border-2 border-lightGray mt-3">
        <input
          className="w-full focus:outline-none placeholder:font-medium placeholder:text-dark placeholder:opacity-50"
          type="text"
          placeholder="Password"
        />
        <Image src={viewIcon} alt="View Icon" className="ml-2" />
      </div>

      <Button
        text="Deactivate"
        inputType="button"
        className="mt-10 bg-[#CB2C2C] hover:bg-none  min-w-full rounded-lg  "
        id="button"

      />
      <Button
        text="Cancel"
        inputType="button"
        id="button"

        className="mt-2 bg-transparent text-gray min-w-full rounded-lg hover:bg-none  border border-lightGray  "
      />
    </InfoModal>
  );
};

export default DeactivateAccount3;
