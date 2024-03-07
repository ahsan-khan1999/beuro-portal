import { Form } from "@/base-components/form/form";
import { useOfferContentEditDetails } from "@/hooks/content/useOfferContentEditDetails";
import FormCard from "@/layout/customers/FormCard";
import { ContentTableRowTypes } from "@/types/content";
import React from "react";
import { ComponentsType } from "../details/ContentDetailsData";

const OfferContentEditDetails = ({
  onClick,
  contentDetail,
}: {
  onClick: (index: number, component: ComponentsType) => void;
  contentDetail: ContentTableRowTypes;
}) => {
  const defaultClassName =
    "border border-primary pl-[29px] pr-[25px] pt-[22px] pb-[39px]";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useOfferContentEditDetails(onClick);
  return (
    <div className="rounded-md border-none bg-white w-full h-fit">
      <div className="flex justify-between items-center pt-[17px] pb-[22px] pl-[29px] pr-6 border-b border-black border-opacity-10 bg-[#4A13E7] rounded-t-lg">
        <h2 className="text-white text-lg font-medium">
          {translate("content.details.offer_heading")}
        </h2>
        <button
          onClick={() => onClick(0, ComponentsType.offerContent)}
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

export default OfferContentEditDetails;
