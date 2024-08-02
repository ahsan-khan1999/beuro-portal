import { Form } from "@/base-components/form/form";
import { useAgentProfileSetting } from "@/hooks/agent/setting/useAgentProfileSetting";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

export const AgentProfileSetting = () => {
  const { fields, onSubmit, handleSubmit, errors, renderModal } =
    useAgentProfileSetting();

  return (
    <FormCard containerClassName="pb-6">
      <div className="py-3 px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
      {renderModal()}
    </FormCard>
  );
};
