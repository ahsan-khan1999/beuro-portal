import React from "react";
import { InfoModal } from "../info-modal";
import warningIcon from "@/assets/svgs/warning-icon.svg";
import Image from "next/image";
import { Button } from "../../button/button";

const DeactivateAccount1 = ({ onClose }: { onClose: () => void }) => {
  const deactivateActions = [
    {
      name: "Deactivate your active Offers",
      button1: "My Selling",
    },
    {
      name: "Complete your Purchases",
      button1: "My Buying",
    },
  ];
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Deactivate your account"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <h2 className="mt-8  font-medium text-xl text-dark">
        To deactivate your account please complete the following actions.
      </h2>

      <div className="mt-8 space-y-4">
        {deactivateActions.map((item, index) => {
          return (
            <div className="flex items-start rounded-lg border-2 border-[#FEC8C8] p-4" key={index}>
              <div>
                <h3 className="font-semibold text-dark text-lg ">
                  {item.name}
                </h3>
                <p className="font-medium text-gray mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="ml-9">
                <button className="font-medium text-dark px-4 py-3 border border-lightGray rounded-lg w-[123px]">
                  {item.button1}
                </button>
                <button className="font-medium text-secondary px-4 py-3 border border-lightGray rounded-lg mt-3 w-[123px]">
                  Find Help
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        text="Contact us"
        inputType="button"
        className="mt-10   min-w-full rounded-lg  "
        id="button"

      />
      <Button
        text="Cancel"
        inputType="button"
        className="mt-4 bg-transparent text-gray min-w-full rounded-lg hover:bg-none  border border-lightGray"
        id="button"

      />
    </InfoModal>
  );
};

export default DeactivateAccount1;
