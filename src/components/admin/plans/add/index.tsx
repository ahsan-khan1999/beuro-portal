import { Layout } from "@/layout";
import React from "react";
import PlansForm from "../Form";
import usePlanDetail from "@/hooks/admin/plans/usePlanDetail";

const CreatePlan = () => {
  const {
    planDetails,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    handlePreviousClick,
    renderModal
  } = usePlanDetail(false);

  return (
    <Layout>
      <PlansForm
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        fields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        planDetail={planDetails}
      />
      {renderModal()}
    </Layout>
  );
};

export default CreatePlan;
