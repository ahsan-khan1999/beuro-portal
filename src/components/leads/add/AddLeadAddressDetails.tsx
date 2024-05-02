import { Form } from "@/base-components/form/form";
import { useAddLeadAddressDetails } from "@/hooks/leads/useAddLeadAddressDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { ComponentsType } from "./AddNewLeadsData";
import { updateQuery } from "@/utils/update-query";

const AddLeadAddressDetails = ({
  onHandleBack,
  onHandleNext,
}: {
  onHandleBack: (currentComponent: ComponentsType) => void;
  onHandleNext: (currentComponent: ComponentsType) => void;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, translate } =
    useAddLeadAddressDetails({ onHandleNext, isAddNewLead: true });

  const router = useRouter();

  const handleCancel = () => {
    router.pathname = "/leads";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
  };

  return (
    <FormCard>
      <div
        className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg"
        id="Address Details"
      >
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("leads.address_details.main_heading")}
        </h2>
        <button
          onClick={handleCancel}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("leads.address_details.cancel_button")}
        </button>
      </div>
      <div className="py-3 px-6">
        <Form
          formFields={fields || []}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
    </FormCard>
  );
};

export default AddLeadAddressDetails;
