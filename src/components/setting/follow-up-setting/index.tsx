import React from "react";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import Image from "next/image";
import { Form } from "@/base-components/form/form";
import useAddReason from "@/hooks/setting/useAddReason";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Button } from "@/base-components/ui/button/button";
import { ToggleButton } from "@/base-components/ui/button/toggle-button";
import { FollowUpProp } from "@/types/settings";

const FollowUpSetting = () => {
  const defaultClassName = "mt-0  ";
  const dispatch = useAppDispatch();

  const { loading, followUps } = useAppSelector((state) => state.settings);
  const {
    toggleObj,
    setToggleObj,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    error,
    handleRemoveReason,
    handleSaveSetings,
    renderModal,
    translate,
  } = useAddReason();

  return (
    <>
      <section className="rounded-md bg-white pl-[32px] pr-[37px] py-5 w-full h-fit">
        {Object.keys(toggleObj)
          ?.slice(0, 2)
          ?.map((item, index) => (
            <div
              className={`border rounded-md p-4 flex justify-between items-center mb-4 ${
                toggleObj[item as keyof FollowUpProp]?.value
                  ? "border-[#4A13E7]"
                  : "border-[#BFBFBF]"
              }`}
              key={index}
            >
              <span
                className={`text-base font-medium ${
                  toggleObj[item as keyof FollowUpProp].value
                    ? "text-[#4A13E7]"
                    : "text-[#4B4B4B]"
                }`}
              >
                {toggleObj[item as keyof FollowUpProp]?.label}
              </span>

              <ToggleButton
                key={toggleObj[item as keyof FollowUpProp].label}
                isChecked={toggleObj[item as keyof FollowUpProp].value}
                onChange={(checked) =>
                  setToggleObj({
                    ...toggleObj,
                    [item]: {
                      label: toggleObj[item as keyof FollowUpProp]?.label,
                      value: checked.target.checked,
                    },
                  })
                }
              />
            </div>
          ))}
      </section>

      <section className="grid grid-cols-3 mt-3 gap-x-2 gap-y-2 xl:gap-y-0">
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

        <div className="rounded-md bg-white p-3 col-span-3 xl:col-span-2">
          <div
            className="overflow-y-auto custom-scrollbar"
            style={{ maxHeight: "15rem" }}
          >
            {toggleObj?.reason?.map((item, index) => (
              <div
                className={`flex justify-between py-3 ${
                  index === toggleObj?.reason?.length - 1
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
                  width={14}
                  height={18}
                  className="cursor-pointer mr-5 w-[14px] h-[18px]"
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
        className="mt-5 px-4 text-white text-base font-medium rounded-md bg-[#4A13E7] float-right"
        text={translate("setting.save_setting")}
        loading={loading}
        onClick={handleSaveSetings}
      />
      {renderModal()}
    </>
  );
};

export default FollowUpSetting;
