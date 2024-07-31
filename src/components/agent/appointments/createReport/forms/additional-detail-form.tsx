import React from "react";
import { Form } from "@/base-components/form/form";
import { useCreateReportAdditionalDetails } from "@/hooks/agent/appointments/useCreateReportAdditionalDetails";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";

export interface ReportAdditionalProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onHandleBack: (currentComponent: AppointmentReportsFormStages) => void;
}

export const AdditionalInfoReport = ({
  onNextHandler,
  onHandleBack,
}: ReportAdditionalProps) => {
  const { errors, fields, handleSubmit, onSubmit } =
    useCreateReportAdditionalDetails({ onHandleBack, onNextHandler });

  return (
    <div
      className="p-[21px] bg-white rounded-lg h-fit mb-5"
      id={translate("agent.report_tabs_heading.additional")}
    >
      <h1 className="text-[#1E1E1E] text-base font-semibold mb-2">
        {translate("agent.additional_details_fields.heading")}
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
