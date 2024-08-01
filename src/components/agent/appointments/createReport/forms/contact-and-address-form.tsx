import React from "react";
import { Form } from "@/base-components/form/form";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { useCreateReportAddressDetails } from "@/hooks/agent/appointments/useCreateReportAddressDetails";

export interface ReportAddressProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const ContactAndAddressReport = ({
  onNextHandler,
}: ReportAddressProps) => {
  const { errors, fields, handleSubmit, onSubmit, translate } =
    useCreateReportAddressDetails({ onNextHandler });

  return (
    <div
      className="p-[21px] bg-white rounded-lg h-fit mb-5"
      id={translate("agent.report_tabs_heading.contact")}
    >
      <h1 className="text-[#1E1E1E] text-base font-semibold mb-2">
        {translate("agent.contact_detail_heading")}
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
