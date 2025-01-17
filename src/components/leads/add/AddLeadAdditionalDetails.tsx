import { Form } from "@/base-components/form/form";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { ComponentsType } from "./AddNewLeadsData";
import { updateQuery } from "@/utils/update-query";
import { useAddLeadAdditionalDetails } from "@/hooks/leads/useAddLeadAdditionalDetails";

const AddLeadAdditionalDetails = ({
  onHandleBack,
  onHandleNext,
}: {
  onHandleBack: (currentComponent: ComponentsType) => void;
  onHandleNext: (currentComponent: ComponentsType) => void;
}) => {
  const { fields, onSubmit, handleSubmit, errors, translate } =
    useAddLeadAdditionalDetails({ onHandleBack, onHandleNext });

  const router = useRouter();
  const handleCancel = () => {
    router.pathname = "/leads";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
  };

  return (
    <FormCard>
      <div
        className="flex justify-between items-center bg-[#45C769] py-5 px-6 rounded-t-lg"
        id="Additional Details"
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("leads.additional.heading")}
        </h2>
        <button
          onClick={handleCancel}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("leads.additional.cancel_button")}
        </button>
      </div>

      <div className="py-3 px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </FormCard>
  );
};

export default AddLeadAdditionalDetails;
