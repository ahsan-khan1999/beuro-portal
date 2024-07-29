import React from "react";
import { Form } from "@/base-components/form/form";
import { FormComponentProps } from "@/types";
import { useAgentReportServices } from "@/hooks/agent/appointments/useAgentReportServices";

export const ServicesDetailReport = ({
  setCurrentFormStage,
}: FormComponentProps) => {
  const { onSubmit, handleSubmit, errors, fields } =
    useAgentReportServices(setCurrentFormStage);

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
