import { MovingDetailsProps } from "@/types/types";
import { formatAddress, germanDateFormat } from "@/utils/utility";
import writeIcon from "@/assets/svgs/write_icon.svg";
import React, { useState } from "react";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit_primary.svg";
import { useTranslation } from "next-i18next";

export const MovingDetails = ({
  header,
  address,
  workDates,
  isOffer,
  handleTitleUpdate,
  addressLabels,
  handleEditDateModal,
  time,
}: Partial<MovingDetailsProps>) => {
  const [text, setText] = useState(header);
  const [tempText, setTempText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const { t: translate } = useTranslation();
  const handleSaveClick = () => {
    if (!tempText) return;
    setIsEditing(false);
    handleTitleUpdate && handleTitleUpdate(tempText);
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
            className={`mb-[10px] ${
              isEditing
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
                <span className="text-sm font-semibold text-[#393939]">
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
                  {translate("common.cancel_button")}
                </button>
                <button
                  type="submit"
                  onClick={handleSaveClick}
                  className=" bg-[#4A13E7] rounded-[3px] px-[29px] py-[6px]  text-[#fff]"
                >
                  {translate("common.save_button")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-black text-base font-semibold pb-3 border-b-[3px] mt-5">
            {header}
          </h1>
        )}
        {address?.map((item, index) => (
          <div
            className="flex gap-x-[30px] pb-2 border-b-2 border-[#8C8C8C] border-opacity-50 mt-2"
            key={index}
          >
            <span className="min-w-[200px] text-sm">{item?.label}:</span>
            <span className="text-[#141414] text-sm font-normal max-w-[850px] break-all">
              <strong>
                {formatAddress({
                  country: item?.country,
                  postalCode: item.postalCode,
                  streetNumber: item.streetNumber,
                })}
              </strong>{" "}
              {item.description}
            </span>
          </div>
        ))}
        <div className="flex flex-row gap-6">
          <span className="min-w-[205px] mt-2 text-sm">
            {workDates?.length === 1
              ? translate("pdf.work_date")
              : translate("pdf.work_dates")}
          </span>
          <div className="flex flex-row flex-wrap mb-[46px] mt-2 max-w-[850px]">
            <span className="text-sm font-medium text-[#4B4B4B]">
              {workDates?.map(
                (item, index) =>
                  `${germanDateFormat(item.startDate)}${
                    item.endDate
                      ? ` ${translate("contracts.card_content.to")} ` +
                        germanDateFormat(item.endDate) +
                        ((workDates?.length - 1 != index && ", ") || ".")
                      : (workDates?.length - 1 != index && ", ") || "."
                  }`
              )}
              {time &&
                ` ${translate("common.at")} ` +
                  time +
                  ` ${translate("common.clock")} `}
            </span>
            <Image
              src={editIcon}
              alt="edit date"
              width={16}
              height={16}
              className="cursor-pointer ms-2"
              onClick={handleEditDateModal}
            />
          </div>
        </div>
      </form>
    </>
  );
};
