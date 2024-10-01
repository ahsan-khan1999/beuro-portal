import React from "react";
import { Form } from "@/base-components/form/form";
import { useCreateReportAdditionalDetails } from "@/hooks/agent/appointments/useCreateReportAdditionalDetails";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";

export interface ReportAdditionalProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onHandleBack: (currentComponent: AppointmentReportsFormStages) => void;
  onReportCreated: () => void;
  onReportUpdate: () => void;
}

export const AdditionalInfoReport = ({
  onNextHandler,
  onHandleBack,
  onReportCreated,
  onReportUpdate,
}: ReportAdditionalProps) => {
  const { errors, fields, handleSubmit, onSubmit } =
    useCreateReportAdditionalDetails({
      onHandleBack,
      onNextHandler,
      onReportCreated,
      onReportUpdate,
    });

  return (
    <div
      className="mb-5"
      id={translate("agent.report_tabs_heading.additional")}
    >
      <h1 className="p-5 bg-white rounded-t-lg h-fit text-[#1E1E1E] text-base font-semibold pb-3 xMini:pb-[29px]">
        {translate("appointments.report_detail.additional_detail")}
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
