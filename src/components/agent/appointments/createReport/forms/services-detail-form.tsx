import React from "react";
import { Form } from "@/base-components/form/form";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { useCreateReportServicesDetails } from "@/hooks/agent/appointments/useCreateReportServicesDetails";

export interface ReportServicesProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onBackHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const ServicesDetailReport = ({
  onNextHandler,
  onBackHandler,
}: ReportServicesProps) => {
  const { onSubmit, handleSubmit, errors, fields } =
    useCreateReportServicesDetails({ onBackHandler, onNextHandler });

  return (
    <div className="p-[21px] bg-white rounded-lg h-fit mb-5">
      <h1 className="text-[#1E1E1E] text-base font-semibold pb-[29px] border-b border-b-[#000] border-opacity-20">
        {translate("agent.service_detail_fields.heading")}
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
