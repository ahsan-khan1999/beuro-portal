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
    <div className="mb-5" id={translate("agent.report_tabs_heading.services")}>
      <h1 className="p-5 bg-white rounded-t-lg h-fit text-[#1E1E1E] text-base font-semibold pb-3 xMini:pb-[29px]">
        {translate("agent.service_detail_fields.heading")}
      </h1>

      <hr className="opacity-10 mx-5" />
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
};
