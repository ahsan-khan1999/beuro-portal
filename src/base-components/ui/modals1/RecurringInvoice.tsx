import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import useInvoiceCreatedModal from "@/hooks/invoice/useInvoiceCreatedModal";
import useRecurringInvoice from "@/hooks/invoice/useRecurringInvoice";

const RecurringInvoice = ({
  onClose,
  invoiceCreated,
}: {
  onClose: () => void;
  invoiceCreated: () => void;
}) => {
  const defaultClassName = "mt-6";
  const { fields, onSubmit, handleSubmit, errors, error, translate } =
    useRecurringInvoice(invoiceCreated);
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[400px] lg:max-w-[474.447px] min-h-fit "
      >
        <div className="relative flex flex-col lg:px-[39px] lg:pb-[40px] lg:pt-[24px] px-4 py-6 ">
          <div className="border-b border-b-[#000] border-opacity-10 ">
            <Image
              src={crossIcon}
              onClick={onClose}
              alt="cross_icon"
              className="absolute right-5 top-5 cursor-pointer"
            />
            <p className="text-[#000] font-medium text-2xl mb-5">
              {translate("invoice.create_invoice_modal.button")}
            </p>
          </div>

          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            className={`${defaultClassName}`}
          />
        </div>
      </BaseModal>
    </>
  );
};

export default RecurringInvoice;
