import React from "react";
import { useRouter } from "next/router";
import { Form } from "@/base-components/form/form";
import FormCard from "@/layout/customers/FormCard";
import { updateQuery } from "@/utils/update-query";
import { ComponentsType } from "@/enums/invoice";
import { useCreateInvoiceAdditionalDetails } from "@/hooks/invoice/useCreateInvoiceAdditionalDetails";

const AditionalAddDetails = ({
  onHandleNext,
  onHandleBack,
}: {
  onHandleNext: (currentComponent: ComponentsType) => void;
  onHandleBack: (currentComponent: ComponentsType) => void;
}) => {
  const router = useRouter();
  const defaultClassName = "";
  const {
    fields,
    control,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate,
    offerDetails,
  } = useCreateInvoiceAdditionalDetails(onHandleNext, onHandleBack);

  const handleCancel = () => {
    router.pathname = "/invoices";
    router.query = { status: "None", page: "1" };
    updateQuery(router, router.locale as string);
  };

  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-b-[#000] border-opacity-10">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.additional_details.main_heading")}{" "}
          {offerDetails?.id && offerDetails?.offerNumber}
        </h2>
        <button
          onClick={handleCancel}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full"
        >
          {translate("offers.additional_details.cancel_button")}
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
  );
};

export default AditionalAddDetails;
