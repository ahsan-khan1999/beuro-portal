import { Layout } from "@/layout";
import React from "react";
import PlansForm from "../Form";
import FormCard from "@/layout/customers/FormCard";
import usePlanDetail from "@/hooks/admin/plans/usePlanDetail";
import { CustomPuffLoader } from "@/base-components/ui/loader/puff-loader";
import { BackIcon } from "@/assets/svgs/components/back-icon";

const PlanDetails = () => {
  const {
    planDetails,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    renderModal,
    loading,
    translate,
    handleBack,
  } = usePlanDetail(true);

  return (
    <Layout>
      {loading ? (
        <CustomPuffLoader />
      ) : (
        <FormCard containerClassName="p-5">
          <div className="flex items-center gap-x-4 border-b border-b-[#000] border-opacity-10 pb-5">
            <BackIcon onClick={handleBack} />
            <p className="font-semibold text-lg xMini:text-2xl">
              {translate("common.plan_detail")}
            </p>
          </div>

          <PlansForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            planDetail={planDetails}
          />
        </FormCard>
      )}

      {renderModal()}
    </Layout>
  );
};

export default PlanDetails;
