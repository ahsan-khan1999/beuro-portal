import React, { useState } from "react";
import toggle_active from "@/assets/svgs/toggle_active.svg";
import toggle_inactive from "@/assets/svgs/toggle_inactive.svg";
import deleteIcon from "@/assets/svgs/delete.svg";
import Image from "next/image";
import { Form } from "@/base-components/form/form";
import useAddReason from "@/hooks/setting/useAddReason";
import { useTranslation } from "next-i18next";

const FollowUpSetting = () => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error } = useAddReason();
  const { t: translate } = useTranslation();

  const data: string[] = [
    `${translate("setting.follow_up_setting.on_offer_expire")}`,
    `${translate("setting.follow_up_setting.on_lead_create")}`,
  ];

  const [isActive, setIsActive] = useState(new Array(data.length).fill(false));

  const toggleItem = (index: number) => {
    const updatedIsActive = [...isActive];
    updatedIsActive[index] = !updatedIsActive[index];
    setIsActive(updatedIsActive);
  };

  const reasonData: string[] = [
    "Share New Information.",
    "Update Your Requirements.",
    "Provide Feedback or Questions.",
    "Express Continued Interest.",
    "COntact Me Again",
    "COntact Me Later",
  ];

  return (
    <>
      <section className="rounded-md bg-white pl-[32px] pr-[37px] py-5 w-full h-fit">
        {data.map((item, index) => (
          <div
            className={`border rounded-md p-4 flex justify-between items-center mb-4 ${
              isActive[index] ? "border-[#4A13E7]" : "border-[#BFBFBF]"
            }`}
            key={index}
          >
            <span
              className={`text-base font-medium ${
                isActive[index] ? "text-[#4A13E7]" : "text-[#4B4B4B]"
              }`}
            >
              {item}
            </span>
            <Image
              src={isActive[index] ? toggle_active : toggle_inactive}
              alt="toggle_btn"
              className="cursor-pointer"
              onClick={() => toggleItem(index)}
            />
          </div>
        ))}
      </section>

      <section className="grid grid-cols-3 mt-3 gap-x-2 gap-y-2 xl:gap-y-0">
        {/* Form */}
        <div className="rounded-md bg-white pl-[32px] pr-[27px] pt-4 col-span-3 xl:col-span-1">
          <span className="text-[#4B4B4B] text-base font-medium">
            {translate("setting.follow_up_setting.add_follow_up.heading")}
          </span>
          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            className={`${defaultClassName}`}
          />
        </div>

        {/* List of reasonData */}
        <div className="rounded-md bg-white p-3 col-span-3 xl:col-span-2">
          <div
            className="overflow-y-auto custom-scrollbar"
            style={{ maxHeight: "15rem" }}
          >
            {reasonData.map((item, index) => (
              <div
                className={`flex justify-between py-3 ${
                  index === reasonData.length - 1
                    ? "rounded-md"
                    : "border-b border-[#BFBFBF]"
                }`}
                key={index}
              >
                <span className="text-base font-medium text-[#4B4B4B]">
                  {item}
                </span>
                <Image
                  src={deleteIcon}
                  alt="delete_icon"
                  className="cursor-pointer mr-5"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FollowUpSetting;
