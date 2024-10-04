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
  const { errors, fields, handleSubmit, onSubmit, translate } =
    useCreateReportHoseDetails({ onNextHandler, onBackHandler });

  return (
    <div className="mb-5" id={translate("agent.report_tabs_heading.house")}>
      <h1 className="p-5 bg-white rounded-t-lg h-fit text-[#1E1E1E] text-base font-semibold pb-3 xMini:pb-[29px]">
        {translate("appointments.report_detail.house_detail")}
      </h1>

      <hr className="opacity-10 mx-[9px] xMini:mx-5" />

      <div className="p-[9px] xMini:px-5 xMini:pb-5 bg-white rounded-b-lg">
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
