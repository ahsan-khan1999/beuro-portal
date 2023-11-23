import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { LeadAdditionalDetailsFormField } from "@/components/leads/fields/Additional-details-fields";
import { generateLeadAdditionalDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useMemo } from "react";

export const useLeadAdditionalDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);

  const handleBack = () => {
    onClick(3, ComponentsType.additional);
  };

  const schema = generateLeadAdditionalDetailsValidation(translate);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = LeadAdditionalDetailsFormField(
    loading,
    control,
    handleBack,
    leadDetails
  );
  useMemo(() => {
    if (leadDetails.id) {
      reset({
        ...leadDetails
      })
    }
  }, [leadDetails.id])
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, step: 4, id: leadDetails?.id, stage: ComponentsType.additionalEdit }
    const response = await dispatch(updateLead({ data: apiData, router, setError, translate }));
    if (response?.payload) onClick(3, ComponentsType.additional);

  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
