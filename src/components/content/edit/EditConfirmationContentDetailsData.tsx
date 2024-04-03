import { Form } from "@/base-components/form/form";
import { useEditConfirmationContentDetails } from "@/hooks/content/useEditConfirmationContentDetails";
import FormCard from "@/layout/customers/FormCard";
import { ContentTableRowTypes } from "@/types/content";
import React from "react";
import { ComponentsType } from "../details/ContentDetailsData";

const EditConfirmationContentDetailsData = ({
  onClick,
  contentDetail,
}: {
  onClick: (index: number, component: ComponentsType) => void;
  contentDetail: ContentTableRowTypes;
}) => {
  const defaultClassName = "border border-primary px-5 py-3";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useEditConfirmationContentDetails(onClick);
  return (
    <div className="rounded-md border-none bg-white w-full h-fit">
      <div className="flex justify-between items-center pt-[17px] pb-[22px] pl-[29px] pr-6 border-b border-black border-opacity-10 bg-[#FE9244] rounded-t-lg ">
        <h2 className="text-white text-lg font-medium">
          {translate("content.details.confirmation_heading")}
        </h2>
        <button
          onClick={() => onClick(1, ComponentsType.confirmationContent)}
          className="text-[#4B4B4B] bg-white font-medium rounded-lg border border-[#C7C7C7] py-2 px-9"
        >
          {translate("content.details.cancel_button")}
        </button>
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

export default EditConfirmationContentDetailsData;
