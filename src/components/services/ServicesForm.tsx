import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { FormDataProps } from "@/types/service";
import Image from "next/image";
import React from "react";
import editInfo from "@/assets/svgs/edit-customer-details.svg";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const ServiceForm = ({
  isUpdate,
  setIsUpdate,
  fields,
  onSubmit,
  handleSubmit,
  errors,
}: FormDataProps) => {
  const defaultClassName = "";
  const { t: translate } = useTranslation();
  return (
    <div
      className={`rounded-md bg-white py-[26px] pl-[32px] pr-[25px] border ${
        !isUpdate ? "border-primary" : "border-none"
      } h-fit`}
    >
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("services.detail.main_heading")}
        </h2>
        {isUpdate ? (
          <BaseButton
            buttonText={translate("services.detail.edit_button")}
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="flex gap-x-3 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
          >
            <EditIcon />
          </BaseButton>
        ) : (
          <BaseButton
            buttonText={translate("services.detail.cancel_button")}
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="flex  items-center justify-center text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
          ></BaseButton>
        )}
      </div>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </div>
  );
};

export default ServiceForm;
