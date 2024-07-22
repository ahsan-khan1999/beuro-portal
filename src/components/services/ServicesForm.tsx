import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { FormDataProps } from "@/types/service";
import React from "react";
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
      className={`rounded-lg bg-white ${
        !isUpdate ? "border border-primary" : "border-none"
      } h-fit`}
    >
      <div className="flex justify-between items-center bg-primary py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
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

      <div className="px-6 py-3">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
    </div>
  );
};

export default ServiceForm;
