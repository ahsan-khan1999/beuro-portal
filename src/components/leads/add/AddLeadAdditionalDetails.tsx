import { updateModalType } from "@/api/slices/globalSlice/global";
import { Form } from "@/base-components/form/form";
import { useAddLeadAdditionalDetails } from "@/hooks/leads/useAddLeadAdditionalDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { ComponentsType } from "./AddNewLeadsData";

const AddLeadAdditionalDetails = ({ onHandleBack,onHandleNext }: { onHandleBack: (currentComponent: ComponentsType) => void, onHandleNext: (currentComponent: ComponentsType) => void }) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useAddLeadAdditionalDetails({onHandleBack,onHandleNext });

  const router = useRouter();

  return (
    <>
      <FormCard>
        <div
          className="flex justify-between items-center pb-5 "
          id="Additional Details"
        >
          <h2 className="text-[#393939] text-lg font-medium">
            Additional Details
          </h2>
          <button
            onClick={() => router.push("/leads")}
            className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full"
          >
            Cancel
          </button>
        </div>

        <hr className="opacity-20 mb-5" />
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
