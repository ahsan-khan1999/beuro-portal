import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useAddTask from "@/hooks/calendar/useAddTask";

export const AddContractTask = ({ onClose }: { onClose: () => void }) => {
  const { fields, onSubmit, handleSubmit, errors } = useAddTask();

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName="max-w-[375px] min-h-fit rounded-lg absolute top-[105px] right-[180px] add-task-modal bg-[#F3F3F3] calendarShadow"
    >
      <div className="px-[18px] py-4">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </BaseModal>
  );
};
