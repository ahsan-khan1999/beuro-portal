import React, { useEffect, useState } from "react";
import toggle_active from "@/assets/svgs/toggle_active.svg";
import toggle_inactive from "@/assets/svgs/toggle_inactive.svg";
import deleteIcon from "@/assets/svgs/delete.svg";
import Image from "next/image";
import { Form } from "@/base-components/form/form";
import useAddReason from "@/hooks/setting/useAddReason";
import { useTranslation } from "next-i18next";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { readFollowUpSettings } from "@/api/slices/settingSlice/settings";
import { Button } from "@/base-components/ui/button/button";

const FollowUpSetting = () => {
  const defaultClassName = "mt-0  ";
  const dispatch = useAppDispatch()


  const { loading, followUps } = useAppSelector(state => state.settings)
  const { fields, onSubmit, handleSubmit, errors, error, handleRemoveReason, handleSaveSetings, isActive, renderModal, toggleItem, translate ,data} = useAddReason();




  return (
    <>
      <section className="rounded-md bg-white pl-[32px] pr-[37px] py-5 w-full h-fit">
        {data.map((item, index) => (
          <div
            className={`border rounded-md p-4 flex justify-between items-center mb-4 ${isActive[index] ? "border-[#4A13E7]" : "border-[#BFBFBF]"
              }`}
            key={index}
          >
            <span
              className={`text-base font-medium ${isActive[index] ? "text-[#4A13E7]" : "text-[#4B4B4B]"
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
            {followUps?.map((item, index) => (
              <div
                className={`flex justify-between py-3 ${index === followUps?.length - 1
                  ? "rounded-md"
                  : "border-b border-[#BFBFBF]"
                  }`}
                key={index}
              >
                <span className="text-base font-medium text-[#4B4B4B]">
                  {item?.reason}
                </span>
                <Image
                  src={deleteIcon}
                  alt="delete_icon"
                  className="cursor-pointer mr-5"
                  onClick={() => handleRemoveReason(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Button
        id="setting"
        inputType="button"
        className="mt-5 px-4 py-2 text-white text-base font-medium rounded-md  bg-[#4A13E7] "
        text={translate("setting.save_setting")}
        loading={loading}
        onClick={handleSaveSetings}

      />
      {renderModal()}
    </>
  );
};

export default FollowUpSetting;
