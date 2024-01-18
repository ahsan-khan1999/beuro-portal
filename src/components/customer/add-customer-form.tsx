import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import useCustomerDetail from "@/hooks/customer/useCustomerDetail";
import FormCard from "@/layout/customers/FormCard";
import { useTranslation } from "next-i18next";
import React from "react";

const AddCustomerForm = ({ handleCancel }: { handleCancel: () => void }) => {
  const defaultClassName = "";
  const { fields, onSubmit, handleSubmit, errors, renderModal } =
    useCustomerDetail(false);
  const { t: translate } = useTranslation();

  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("customers.details.heading")}
        </h2>

        <BaseButton
          buttonText={translate("customers.details.cancel_button")}
          onClick={handleCancel}
          containerClassName="flex items-center justify-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        />
      </div>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
      {renderModal()}
    </FormCard>
  );
};

export default AddCustomerForm;
