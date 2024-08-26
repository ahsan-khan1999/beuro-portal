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
    translate,
  } = usePlanDetail(true);

  return (
    <Layout>
      {loading ? (
        <LoadingState />
      ) : (
        <div>
          <h2 className="text-xl font-normal text-[#222B45] mb-4">
            {translate("common.plan_detail")}
          </h2>
          <PlansForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            planDetail={planDetails}
          />
        </div>
      )}

      {renderModal()}
    </Layout>
  );
};

export default PlanDetails;
