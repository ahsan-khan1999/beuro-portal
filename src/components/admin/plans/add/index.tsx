import { Layout } from "@/layout";
import React from "react";
import PlansForm from "../Form";
import usePlanDetail from "@/hooks/admin/plans/usePlanDetail";
import FormCard from "@/layout/customers/FormCard";
import { BackIcon } from "@/assets/svgs/components/back-icon";

const CreatePlan = () => {
  const {
    planDetails,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    renderModal,
    handleBack,
  } = usePlanDetail(false);

  return (
    <Layout>
      <FormCard containerClassName="p-5">
        <div className="flex items-center gap-x-4 pb-5">
          <BackIcon onClick={handleBack} />
          <p className="font-semibold text-lg xMini:text-2xl">
            {translate("common.new_plan")}
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

      {renderModal()}
    </Layout>
  );
};

export default CreatePlan;
