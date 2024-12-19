import React, { useEffect, useState } from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useAddTask from "@/hooks/calendar/useAddTask";
import { useRouter } from "next/router";
import { setMaxHeightOnResize } from "@/utils/utility";

export interface AddTaskModalProps {
  onSuccess: () => void;
  onClose: () => void;
  onUpdateSuccess: () => void;
  isUpdate?: boolean;
}

export const AddContractTask = ({
  onClose,
  isUpdate,
  onSuccess,
  onUpdateSuccess,
}: AddTaskModalProps) => {
  const { locale } = useRouter();
  const [maxHeight, setMaxHeight] = useState("700px");

  const { fields, onSubmit, handleSubmit, errors } = useAddTask({
    isUpdate,
    onSuccess,
    onUpdateSuccess,
  });

  const rightValue = locale === "en" ? "right-[170px]" : "right-[270px]";

  useEffect(() => {
    const cleanup = setMaxHeightOnResize(setMaxHeight);

    return cleanup;
  }, []);

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName={`max-w-[365px] xMini:max-w-[375px] min-h-fit rounded-lg xMini:absolute xMini:top-[105px] ${rightValue} add-task-modal bg-[#F3F3F3] calendarShadow`}
    >
      <div
        className="px-3 xMini:px-[18px] py-4 hide-scrollbar"
        style={{
          maxHeight: maxHeight,
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
        }}
      >
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
