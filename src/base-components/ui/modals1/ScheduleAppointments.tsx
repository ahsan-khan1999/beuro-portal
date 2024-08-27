import React from "react";
import Image from "next/image";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { useScheduleAppointment } from "@/hooks/appointments/useScheduleAppointment";
import { useAppSelector } from "@/hooks/useRedux";
import { Appointments } from "@/types/appointments";
import { Lead } from "@/types/leads";

export interface AppointmentsModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onUpdateSuccess?: () => void;
  heading?: string;
  isUpdate?: boolean;
  setCurrentPageRows?: React.Dispatch<React.SetStateAction<Appointments[]>>;
  currentPageRows?: Appointments[];
}

export const ScheduleAppointments = ({
  onClose,
  onSuccess,
  heading,
  isUpdate,
  onUpdateSuccess,
  currentPageRows,
  setCurrentPageRows,
}: AppointmentsModalProps) => {
  const defaultClassName = "mt-[25px]";
  const { id, leadId, refID, date, startTime, endTime, agent,canton } = useAppSelector(
    (state) => state.global.modal.data
  );

  const { fields, onSubmit, handleSubmit, errors } = useScheduleAppointment({
    onSuccess,
    onUpdateSuccess,
    onClose,
    id,
    leadId,
    refID,
    date,
    startTime,
    endTime,
    agent,
    isUpdate,
    canton,
    currentPageRows,
    setCurrentPageRows,
  });

  return (
    <BaseModal onClose={onClose} containerClassName="max-w-[733px] min-h-fit">
      <div className="relative flex flex-col px-[42px] pt-[26px] pb-[32px]">
        <Image
          src={crossIcon}
          onClick={onClose}
          alt="cross_icon"
          className="absolute right-10 top-[34px] cursor-pointer"
        />
        <p className="text-2xl font-medium pb-[25px] border-b border-b-[#000] border-opacity-10">
          {heading}
        </p>

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
