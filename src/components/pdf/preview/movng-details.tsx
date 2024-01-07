import { MovingDetailsProps } from "@/types/types";
import { formatAddress } from "@/utils/utility";
import writeIcon from "@/assets/svgs/write_icon.svg";
import React, { useState } from "react";
import Image from "next/image";

export const MovingDetails = ({
  header,
  address,
  workDates,
  isOffer,
  handleTitleUpdate,
  addressLabels
}: MovingDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(header);
  const [tempText, setTempText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if(!tempText) return;
    setIsEditing(false);
    handleTitleUpdate && handleTitleUpdate(tempText)
    setText(tempText);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTempText(text);
  };
  return (
    <>
      <form onSubmit={handleSaveClick}>

        {!isOffer ? (
          <div
            className={`mb-[10px] ${isEditing
              ? "border border-[#4B4B4B] p-2 rounded-md flex justify-between"
              : ""
              }`}
          >
            <div className="flex gap-[10px]">
              {isEditing ? (

                <input
                  type="text"
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  className="border border-[#4B4B4B] p-1 rounded-md outline-none border-none"
                  required
                />

              ) : (
                <span className="text-xl font-semibold text-[#393939]">
                  {text}
                </span>
              )}
              {!isEditing && (
                <Image
                  src={writeIcon}
                  alt="writeIcon"
                  className="cursor-pointer h-[25px] w-[25px]"
                  onClick={handleEditClick}
                />
              )}
            </div>
            {isEditing && (
              <div className="flex gap-[20px]">
                <button
                  onClick={handleCancelClick}
                  className="border border-[#8F8F8F] px-[11px] py-[6px] rounded-[3px] text-[12px] font-normal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSaveClick}
                  className=" bg-[#4A13E7] rounded-[3px]  px-[29px] py-[6px]   text-[#fff]"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-black text-[20px] font-semibold pb-3 border-b-[3px] mt-5">
            {header}
          </h1>
        )}
        {address?.map((item, index) => (
          <div
            className="flex gap-x-[30px] pb-2 border-b-2 border-[#8C8C8C] border-opacity-50 mt-2"
            key={index}
          >
            <span>{addressLabels && addressLabels[index] || `Address ${++index}`}:</span>
            <span className="text-[#141414] text-base font-normal max-w-[850px] break-all">
              <strong>
                {formatAddress({
                  country: item.country,
                  postalCode: item.postalCode,
                  streetNumber: item.streetNumber,
                })}
              </strong>{" "}
              {item.description}
            </span>
          </div>
        ))}

        {workDates?.map((item, index) => (
          <div className="flex gap-[20px] mb-[46px] mt-2" key={index}>
            <span>Work Dates:</span>
            <span className="text-[#000] text-base font-normal">
              {item.startDate + " to " + item?.endDate}
            </span>
          </div>
        ))}
      </form>

    </>
  );
};