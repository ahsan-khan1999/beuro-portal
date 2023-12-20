import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import useInvoiceUpdateModal from "@/hooks/invoice/useInvoiceUpdateModal";
import useRecurringInvoiceUpdateModal from "@/hooks/invoice/useRecurringInvoiceUpdate";

const RecurringInvoiceUpdate = ({
  onClose,
  invoiceCreated,
}: {
  onClose: () => void;
  invoiceCreated: Function;
}) => {
  
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error, translate } =
  useRecurringInvoiceUpdateModal(invoiceCreated);
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[400px] lg:max-w-[474.447px] min-h-fit "
      >
        <div className="relative flex flex-col lg:px-[39px] lg:pb-[40px] lg:pt-[24px] px-4 py-6">
          <Image
            src={crossIcon}
            onClick={onClose}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
          />
          <p className="text-[#000] font-medium text-[24px] leading-7 mb-5">
            {translate("invoice.create_invoice_modal.update_invoice")}
          </p>

          <hr className="opacity-25 mb-[23px]" />
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

export default RecurringInvoiceUpdate;
