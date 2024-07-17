import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import silverIcon from "@/assets/svgs/sliver_ion.svg";
import useEditPayment from "@/hooks/modals/useEditPayment";

const EditPaymentDetails = ({ onClose }: { onClose: () => void }) => {
  const defaultClassName = "";
  const { fields, onSubmit, handleSubmit, errors, error, translate } =
    useEditPayment(onClose);
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] lg:max-w-[606px] min-h-fit "
    >
      <div className="relative flex flex-col px-[30px] pb-[26px] pt-[25px]">
        <Image
          src={crossIcon}
          alt="crossIcon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <p className="font-medium text-2xl mb-2">
          {translate("setting.billing.edit_payment_modal.heading")}
        </p>

        <p className="text-sm font-normal text-[#1E1E1E]">
          {translate("setting.billing.edit_payment_modal.sub_heading")}
        </p>

        <section
          style={{
            background:
              "linear-gradient(93deg, #4A13E7 34.55%, #7B18FF 74.32%)",
          }}
          className="py-4 px-6 rounded-lg my-6 flex justify-between"
        >
          <div className="flex gap-x-2">
            <Image src={silverIcon} alt="silverIcon" />
            <span className="text-lg text-white font-medium">
              {translate("admin.chart_list.silver")}
            </span>
          </div>

          <span className="text-sm font-medium text-[#fff]">
            <strong className="text-lg font-medium text-white">CHF0</strong>/{" "}
            {translate("common.month")}
          </span>
        </section>

        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
    </BaseModal>
  );
};

export default EditPaymentDetails;
