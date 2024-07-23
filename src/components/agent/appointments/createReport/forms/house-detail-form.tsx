import React from "react";
import { Form } from "@/base-components/form/form";
import { FormComponentProps } from "@/types";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
import { houseDetailReportFormField } from "../fields/house-detail-form-fields";

export const HouseDetailReport = ({
  onSubmit,
  handleSubmit,
  errors,
  register,
  control,
  currentFormStage,
  setCurrentFormStage,
}: FormComponentProps) => {
  const { loading } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();

  const fields = houseDetailReportFormField(
    register,
    loading,
    control,
    setCurrentFormStage
  );

  return (
    <div className="p-[21px] bg-white rounded-lg h-fit mb-5">
      <h1 className="text-[#1E1E1E] text-base font-semibold mb-2">
        {translate("agent.house_detail_fields.living_room_heading")}
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
