import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { Button } from "@/base-components/ui/button/button";
import FormCard from "@/layout/customers/FormCard";
import { FormDataProps } from "@/types/admin/plans";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

const PlansForm = ({
  isUpdate,
  setIsUpdate,
  fields,
  onSubmit,
  handleSubmit,
  errors,
}: FormDataProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <FormCard containerClassName={`px-4 py-6`}>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />

      {isUpdate && (
        <div className="flex items-center justify-end space-x-5 mt-8 pb-6">
          <Button
            text={translate("admin.plan_details.back_button")}
            onClick={() => router.push("/admin/plans")}
            className="px-4 py-[10px] w-[92px] font-medium border border-[#C7C7C7] !h-[50px] bg-white text-dark"
            inputType="button"
            id="button"
          />
          <BaseButton
            buttonText={translate("admin.plan_details.edit_button")}
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="px-4 py-[10px] w-[152px] bg-primary !h-[50px] hover:bg-buttonHover"
            textClassName="text-white font-medium !text-base"
          />
        </div>
      )}
    </FormCard>
  );
};

export default PlansForm;
