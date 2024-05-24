import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import useCustomerDetail from "@/hooks/customer/useCustomerDetail";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const AddCustomerForm = ({ handleCancel }: { handleCancel: () => void }) => {
  const defaultClassName = "";
  const { fields, onSubmit, handleSubmit, errors, renderModal, translate } =
    useCustomerDetail({ detail: false, idAddNewCustomer: true });

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#4A13E7] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("customers.details.heading")}
        </h2>

        <BaseButton
          buttonText={translate("customers.details.cancel_button")}
          onClick={handleCancel}
          containerClassName="flex items-center justify-center text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[161px] w-full"
        />
      </div>

      <div className="py-3 px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
      {renderModal()}
    </FormCard>
  );
};

export default AddCustomerForm;
