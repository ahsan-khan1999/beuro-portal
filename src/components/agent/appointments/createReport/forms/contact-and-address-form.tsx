import React from "react";
import { Form } from "@/base-components/form/form";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { useCreateReportAddressDetails } from "@/hooks/agent/appointments/useCreateReportAddressDetails";

export interface ReportAddressProps {
  onNextHandle: (currentComponent: AppointmentReportsFormStages) => void;
}

export const ContactAndAddressReport = ({
  onNextHandle,
}: ReportAddressProps) => {
  const { errors, fields, handleSubmit, onSubmit, translate } =
    useCreateReportAddressDetails({ onNextHandle });

  return (
    <div className="p-[21px] bg-white rounded-lg h-fit mb-5">
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
