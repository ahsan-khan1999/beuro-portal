import { Layout } from "@/layout";
import React from "react";
import PlansForm from "../Form";
import usePlanDetail from "@/hooks/admin/plans/usePlanDetail";
import LoadingState from "@/base-components/loadingEffect/loading-state";

const PlanDetails = () => {
  const {
    planDetails,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    handlePreviousClick,
    renderModal,
    loading,
  } = usePlanDetail(true);

  return (
    <Layout>
      {loading ? (
        <LoadingState />
      ) : (
        <PlansForm
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          fields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          planDetail={planDetails}
        />
      )}

      {renderModal()}
    </Layout>
  );
};

export default PlanDetails;
