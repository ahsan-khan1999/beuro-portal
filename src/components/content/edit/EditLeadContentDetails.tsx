import React from "react";
import { Form } from "@/base-components/form/form";
import { ComponentsType } from "../details/ContentDetailsData";
import { useEditLeadContentDetails } from "@/hooks/content/useEditLeadContentDetails";

export interface EditLeadContentDetailsProps {
  onClick: (index: number, component: ComponentsType) => void;
  isUpdate?: boolean;
}

const EditLeadContentDetails = ({
  onClick,
  isUpdate,
}: EditLeadContentDetailsProps) => {
  const { fields, onSubmit, handleSubmit, errors, translate } =
    useEditLeadContentDetails({ onClick, isUpdate });

  return (
    <div className="flex gap-x-5">
      <div className="rounded-lg border border-primary bg-white w-full h-fit">
        <div className="flex justify-between items-center bg-[#f5d60f] py-5 px-6 rounded-t-lg">
          <h2 className="text-dark text-xl font-medium">
            {translate("content.details.lead_heading")}
          </h2>
          <button
            onClick={() => onClick(0, ComponentsType.leadContent)}
            className="text-[#4B4B4B] bg-white font-medium rounded-lg border border-[#C7C7C7] py-2 px-9"
          >
            {translate("content.details.cancel_button")}
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
      </div>
    </div>
  );
};

export default EditLeadContentDetails;
