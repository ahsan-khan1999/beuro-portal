import React, { useEffect, useState } from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useAddTask from "@/hooks/calendar/useAddTask";
import { useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/router";

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
  const [maxHeight, setMaxHeight] = useState("750px");
  const id = useAppSelector((state) => state.global.modal.data);
  const { locale } = useRouter();

  const { fields, onSubmit, handleSubmit, errors } = useAddTask({
    isUpdate,
    onSuccess,
    onUpdateSuccess,
    id: id?.id,
  });

  const rightValue = locale === "en" ? "right-[180px]" : "right-[250px]";

  useEffect(() => {
    const updateMaxHeight = () => {
      const browserHeight = window.innerHeight;
      const newMaxHeight = browserHeight < 830 ? "500px" : "750px";
      setMaxHeight(newMaxHeight);
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  return (
    <BaseModal
      onClose={onClose}
      customOpacity={true}
      containerClassName={`max-w-[350px] xMini:max-w-[375px] min-h-fit rounded-lg xMini:absolute xMini:top-[105px] ${rightValue} add-task-modal bg-[#F3F3F3] calendarShadow`}
    >
      <div
        className="px-3 xMini:px-[18px] py-4"
        style={{
          maxHeight: maxHeight,
          overflowY: "auto",
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
