import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddFollowUp } from "@/hooks/follow-up/useAddFollowUp";
import { AddFollowUpProps } from "@/types/follow-up";
import { AnimatePresence, motion } from "framer-motion";

const AddFollowUp = ({
  onClose,
  handleFollowUps,
  handleAllCustomers,
  handleAllLeads,
}: AddFollowUpProps) => {
  const { fields, onSubmit, handleSubmit, errors, error, translate } =
    useAddFollowUp(handleFollowUps, handleAllCustomers, handleAllLeads);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[650px] lg:max-w-[960px] min-h-auto max-h-fit"
    >
      <AnimatePresence>
        <motion.div className="relative flex flex-col px-4 lg:px-6 py-[30px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <p className="text-2xl font-medium mb-5 border-b border-b-[#000] border-opacity-10 pb-5">
            {translate("follow_up.add_follow_up.heading")}
          </p>

          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </motion.div>
      </AnimatePresence>
    </BaseModal>
  );
};

export default AddFollowUp;
