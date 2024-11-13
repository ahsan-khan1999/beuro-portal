import React from "react";
import { Form } from "@/base-components/form/form";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { useCreateReportAddressDetails } from "@/hooks/agent/appointments/useCreateReportAddressDetails";
import { combineClasses } from "@/utils/utility";

export interface ReportAddressProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const ContactAndAddressReport = ({
  onNextHandler,
}: ReportAddressProps) => {
  const { errors, fields, handleSubmit, onSubmit, translate } =
    useCreateReportAddressDetails({ onNextHandler });

  return (
    <div className="mb-5" id={translate("agent.report_tabs_heading.contact")}>
      <h1 className="p-5 bg-white rounded-t-lg h-fit text-[#1E1E1E] text-base font-semibold pb-3 xMini:pb-[29px]">
        {translate("appointments.report_detail.contact_address_detail")}
      </h1>

      <hr className="opacity-10 mx-[9px] xMini:mx-5" />

      <div className="p-[9px] xMini:px-5 xMini:pb-5 xMini:pt-2 bg-white rounded-b-lg">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </div>
  );
};
