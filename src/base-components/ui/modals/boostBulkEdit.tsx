import React, { useState } from "react";
import { BaseModal } from "./base-modal";
import { Button } from "../button/button";
import boostIcon from "@/assets/svgs/boost-icon.svg";
import Image from "next/image";
import checkIconSelected from "@/assets/svgs/check-icon-success.svg";
import TickIcon from '@/assets/svgs/success-tick-popup.svg';

const BoostBulkEdit = ({ onClose }: { onClose: () => void }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const packageCards = [
    {
      name: "Lite Boost",
      views: "+150",
      CHF: "4.90",
    },
    {
      name: "Boost Plus",
      views: "+400",
      CHF: "14.90",
    },
    {
      name: "Premium Boost",
      views: "+1200",
      CHF: "39.90",
    },
  ];
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-[1104px] max-w-[1104px] min-h-fit px-[70px] pt-[70px] pb-[40px]"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-end">
          <Image src={boostIcon} alt="Boost Icon" className="mr-1" />
          <div>
            <h1 className="font-semibold text-2xl text-dark mb-1">
              Boost your Offer<span>ToolTip</span>
            </h1>
            <p className="text-sm text-dark">
              Boost your offer to reach more buyers and sell faster
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[60px] max-w-[907px] grid  grid-cols-3 gap-x-4  mx-auto">
        {packageCards.map((item, index) => {
          return (
            <div
              className={`max-w-[291px] relative   bg-[#F2F7FF] cursor-pointer rounded-2xl `}
            >
              {item.name.includes("Plus") ? (
                <div
                  className={` absolute w-full left-0 -top-6 bg-secondary rounded-t-xl  ${
                    selectedCard === index
                      ? "border-[#55A46C]"
                      : "border-transparent"
                  } border-t-2 border-x-2`}
                >
                  <h2
                    className={` py-2 px-3 text-center text-white font-medium text-xl  `}
                  >
                    Recommended
                  </h2>
                  {selectedCard === index && (
                    <Image
                      src={checkIconSelected}
                      alt="Check Icon Selected"
                      className="absolute -top-2 -right-3"
                    />
                  )}
                </div>
              ) : (
                selectedCard === index && (
                  <Image
                    src={checkIconSelected}
                    alt="Check Icon Selected"
                    className="absolute -top-2 -right-3"
                  />
                )
              )}

              <div
                key={index}
                onClick={() => setSelectedCard(index)}
                className={`  ${
                  selectedCard === index
                    ? "border-[#55A46C] border-2"
                    : "border-[#EEEEEE] border-2"
                } px-3 pt-6 pb-4 rounded-2xl`}
              >
                <h2 className="font-medium text-xl text-[#121D2A] text-center">
                  {item.name}
                </h2>
                <hr className="h-[2px]  text-[#707070] opacity-10 mt-3 mb-[14px]" />
                <span className="font-semibold text-5xl text-primary mb-2 flex justify-center">
                  {item.views}
                </span>
                <p className="font-medium text-dark text-center">
                  Additionally views per day on average
                </p>
                <hr className="h-[2px]  text-[#707070] opacity-10 mt-4 mb-5" />
                <ul className="font-medium text-[#121D2A] space-y-4">
                  <li className="flex items-center ">
                    <TickIcon className="w-[17px] h-[15px] text-secondary mr-[14px]" />
                    Appears on{" "}
                    <span className="font-semibold text-primary">
                      &nbsp;Top Search
                    </span>
                  </li>
                  <li className="flex items-center ">
                    <TickIcon className="w-[17px] h-[15px] text-secondary mr-[14px]" />
                    For Similar Offers
                  </li>
                  <li className="flex items-center ">
                    <TickIcon className="w-[17px] h-[15px] text-secondary mr-[14px]" />
                    On Kaufes
                    <span className="font-semibold text-primary">
                      &nbsp;Home Page
                    </span>
                  </li>
                  <li
                    className={`flex items-center ${
                      item.name.includes("Lite") ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    <TickIcon
                      className={`${
                        item.name.includes("Lite")
                          ? "text-lightGray"
                          : "text-secondary"
                      } w-[17px] h-[15px]  mr-[14px]`}
                    />
                    In Emails{" "}
                    <span
                      className={`font-semibold  ${
                        !item.name.includes("Lite") && "text-primary"
                      } `}
                    >
                      &nbsp;Newsletters
                    </span>
                  </li>
                  <li
                    className={`flex items-center  ${
                      item.name.includes("Lite") ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    <TickIcon
                      className={`w-[17px] h-[15px] ${
                        item.name.includes("Lite")
                          ? "text-lightGray"
                          : "text-secondary"
                      } mr-[14px]`}
                    />
                    Sell
                    <span
                      className={`font-semibold ${
                        !item.name.includes("Lite") && "text-primary"
                      } `}
                    >
                      &nbsp;4X&nbsp;
                    </span>{" "}
                    Faster
                  </li>
                  <li
                    className={`flex items-center ${
                      item.name.includes("Lite") || item.name.includes("Plus")
                        ? "opacity-50"
                        : "opacity-100"
                    } `}
                  >
                    <TickIcon
                      className={`w-[17px] h-[15px] ${
                        item.name.includes("Lite") || item.name.includes("Plus")
                          ? "text-lightGray"
                          : "text-secondary"
                      } mr-[14px]`}
                    />
                    Free 24/7
                    <span
                      className={`font-semibold ${
                        item.name.includes("Premium") && "text-primary"
                      } `}
                    >
                      &nbsp;Support
                    </span>
                  </li>
                </ul>
                <hr className="h-[2px]  text-[#707070] opacity-10 mt-7 mb-6" />
                <h3 className="font-semibold text-2xl text-gray mb-5 text-center">
                  CHF <span className="text-dark">{item.CHF}</span>
                </h3>
                <Button
                  className={`${
                    selectedCard === index
                      ? " border-2 border-[#55A46C] bg-white text-[#55A46C] hover:bg-none"
                      : ""
                  } w-full rounded-md`}
                  text={selectedCard === index ? "Selected" : "Boost Now"}
                  inputType="button"
                  id="button"

                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex mt-10">
        <button className="border border-[#61616199] rounded-lg py-3 w-[236px] font-medium text-dark">
          Discard Changes
        </button>
        <Button
          className="rounded-lg w-[236px] ml-5"
          text="Save Changes"
          id="button"

          inputType="button"
        />
      </div>
    </BaseModal>
  );
};

export default BoostBulkEdit;
