import { Layout } from "@/layout";
import React from "react";
import usePlanDetail from "@/hooks/admin/plans/usePlanDetail";
import PlansForm from "../Form";

const PlanDetails = () => {
  const {
    planDetail,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    handlePreviousClick,
  } = usePlanDetail(true);

  return (
    <Layout>
      <PlansForm
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        planDetail={planDetail}
        fields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </Layout>
  );
};

export default PlanDetails;
