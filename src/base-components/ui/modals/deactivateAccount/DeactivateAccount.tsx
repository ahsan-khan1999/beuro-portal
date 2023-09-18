import React from "react";
import { InfoModal } from "../info-modal";
import warningIcon from "@/assets/svgs/warning-icon.svg";
import Image from "next/image";
import { Button } from "../../button/button";

const DeactivateAccount = ({ onClose }: { onClose: () => void }) => {
  const deactivateInfo = [
    "You will not be able to create new account with your existing email address",
    "You have to deactivate all your active offers before deactivating your account.",
    "You have to complete all your active purchases before deactivating your account.",
  ];
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Deactivate your account"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <h2 className="mt-8  font-medium text-2xl text-dark">
        Before Deactivation your account
      </h2>
      <p className="text-gray mt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <div className="mt-8 space-y-4">
        {deactivateInfo.map((item, index) => {
          return (
            <div className="flex items-start rounded-lg border-2 border-[#FEC8C8] p-4">
              <Image src={warningIcon} alt="Warning Icon" />
              <label className="ml-3 font-semibold text-dark">{item}</label>
            </div>
          );
        })}
      </div>
      <Button
        text="Deactivate my account"
        inputType="button"
        className="mt-10 bg-[#CB2C2C] hover:bg-none  min-w-full rounded-lg  "
      />
      <Button
        text="Cancel"
        inputType="button"
        className="mt-4 bg-transparent text-gray min-w-full rounded-lg hover:bg-none  border border-lightGray  "
      />
    </InfoModal>
  );
};

export default DeactivateAccount;
