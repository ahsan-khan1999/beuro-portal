import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import FormCard from "@/layout/customers/FormCard";
import { CustomerField, Customers, FormDataProps } from "@/types/customer";
import Image from "next/image";
import React, { SetStateAction } from "react";
import editInfo from "@/assets/svgs/edit-customer-details.svg";
import { useTranslation } from "next-i18next";

const CustomerForm = ({
  isUpdate,
  setIsUpdate,
  fields,
  onSubmit,
  handleSubmit,
  errors,
}: FormDataProps) => {
  const defaultClassName = "mt-[30px]";
  const { t: translate } = useTranslation();

  return (
    <div
      className={`rounded-md bg-white py-[26px] pl-[32px] pr-[25px] border ${
        !isUpdate ? "border-primary" : "border-none"
      } w-full h-fit`}
    >
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">{translate("customers.details.heading")}</h2>
        {isUpdate ? (
          <BaseButton
            buttonText={translate("customers.details.edit_button")}
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="flex gap-x-3 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
          >
            <Image src={editInfo} alt="editInfo" />
          </BaseButton>
        ) : (
          <BaseButton
            buttonText={translate("customers.details.cancel_button")}
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="flex items-center justify-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
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

export default CustomerForm;
