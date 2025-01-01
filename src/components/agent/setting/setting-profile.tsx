import React from "react";
import { Form } from "@/base-components/form/form";
import { useAgentProfileSetting } from "@/hooks/agent/setting/useAgentProfileSetting";

export const AgentProfileSetting = () => {
  const { fields, onSubmit, handleSubmit, errors, renderModal } =
    useAgentProfileSetting();

  return (
    <>
      <div className="pt-[30px] pb-5">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
      {renderModal()}
    </>
  );
};
