import React from "react";
import { Form } from "@/base-components/form/form";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { useCreateReportHoseDetails } from "@/hooks/agent/appointments/useCreateReportHoseDetails";

export interface ReportHouseProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onBackHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const HouseDetailReport = ({
  onNextHandler,
  onBackHandler,
}: ReportHouseProps) => {
  const { control, error, errors, fields, handleSubmit, onSubmit, translate } =
    useCreateReportHoseDetails({ onNextHandler, onBackHandler });

  return (
    <div className="p-[21px] bg-white rounded-lg h-fit mb-5">
      <h1 className="text-[#1E1E1E] text-base font-semibold mb-2">
        {translate("agent.house_detail_fields.living_room_heading")}
      </h1>

      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
};
