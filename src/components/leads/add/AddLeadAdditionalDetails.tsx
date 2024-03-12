import { updateModalType } from "@/api/slices/globalSlice/global";
import { Form } from "@/base-components/form/form";
import { useAddLeadAdditionalDetails } from "@/hooks/leads/useAddLeadAdditionalDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { ComponentsType } from "./AddNewLeadsData";
import { updateQuery } from "@/utils/update-query";

const AddLeadAdditionalDetails = ({
  onHandleBack,
  onHandleNext,
}: {
  onHandleBack: (currentComponent: ComponentsType) => void;
  onHandleNext: (currentComponent: ComponentsType) => void;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddLeadAdditionalDetails({ onHandleBack, onHandleNext });

  const router = useRouter();

  const handleCancel = () => {
    router.pathname = "/leads";
    router.query = { status: "None", page: "1" };
    updateQuery(router, router.locale as string);
  };

  return (
    <>
      <FormCard>
        <div
          className="flex justify-between items-center pb-5 border-b border-[#000] border-opacity-10"
          id="Additional Details"
        >
          <h2 className="text-[#393939] text-lg font-medium">
            {translate("leads.additional.heading")}
          </h2>
          <button
            onClick={handleCancel}
            className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full"
          >
            {translate("leads.additional.cancel_button")}
          </button>
        </div>
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </FormCard>
    </>
  );
};

export default AddLeadAdditionalDetails;
