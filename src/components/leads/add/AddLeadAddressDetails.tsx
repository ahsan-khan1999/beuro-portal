import { Form } from "@/base-components/form/form";
import { useAddLeadAddressDetails } from "@/hooks/leads/useAddLeadAddressDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";

const AddLeadAddressDetails = ({ onHandleNext, onHandleBack }: { onHandleNext: Function; onHandleBack: Function }) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors } =
    useAddLeadAddressDetails(onHandleNext);
  const router = useRouter()
  console.log(errors,"errors");
  
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 " id="Address Details">
        <h2 className="text-[#393939] text-lg font-medium">Address Details</h2>
        <button onClick={() => router.push("/leads")} className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full">
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
  );
};

export default AddLeadAddressDetails;
