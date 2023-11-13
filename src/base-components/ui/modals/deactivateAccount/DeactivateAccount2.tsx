import React, { useState } from "react";
import { InfoModal } from "../info-modal";
import { Button } from "../../button/button";
import Link from "next/link";
import RadioButton from "../../radioButton/RadioButton";

const DeactivateAccount2 = ({ onClose }: { onClose: () => void }) => {
  const [openAction, setOpenAction] = useState<number | null>(0);
  const deactivateReasons = [
    "I have safety or privacy concerns.",
    "I don't want to buy items on kaufes anymore",
    "I don't to buy items on kaufes anymore",
    "Other",
  ];
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Deactivate your account"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <p className="mt-3 font-medium  text-dark ">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <hr className="h-[2px] text-[#707070] opacity-20 mt-6 mb-9" />
      <h2 className="font-medium text-sm text-dark">
        Why you want to deactivate your account
      </h2>
      <div className="space-y-3 mt-4">
        {deactivateReasons.map((item, index) => {
          return (
            <div
              onClick={() => setOpenAction(index)}
              className={`flex items-start rounded-lg border ${
                openAction === index ? "border-gray" : "border-[#EEEEEE]"
              }  py-3 px-4 cursor-pointer`}
            >
              {/* <input
                type="radio"
                className="mt-[5px]"
                checked={openAction == index}
              /> */}
              <RadioButton
                label={""}
                checked={openAction == index}
                radioMargin="mt-[2px]"
              />
              <div className="ml-0">
                <label className="font-medium text-dark cursor-pointer ">
                  {item}
                </label>
                {openAction === index && (
                  <p className="text-sm text-gray mt-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                    <Link className="font-semibold text-secondary" href="">
                      &nbsp;Find Help
                    </Link>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <label className="font-medium text-sm text-dark ">
          Describe your reason (Optional)
        </label>
        <textarea
          placeholder="Enter your reason..."
          rows={3}
          className="mt-3 p-3 w-full focus:outline-none rounded-lg border border-lightGray placeholder:text-lightGray text-sm resize-none"
        />
      </div>
      <Button
        text="Continue"
        inputType="button"
        className="mt-6 bg-[#CB2C2C] hover:bg-none  min-w-full rounded-lg  "
        id="button"

      />
      <Button
        text="Cancel"
        inputType="button"
        className="mt-3 bg-transparent text-gray min-w-full rounded-lg hover:bg-none  border border-lightGray"
        id="button"

      />
    </InfoModal>
  );
};

export default DeactivateAccount2;
