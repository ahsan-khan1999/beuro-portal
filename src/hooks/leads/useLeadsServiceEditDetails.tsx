import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { LeadsServiceDetailsFormField } from "@/components/leads/fields/Leads-service-details-fields";
import { generateLeadsServiceEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { useEffect, useMemo } from "react";
import { readService } from "@/api/slices/service/serviceSlice";
import { formatDateTimeToDate } from "@/utils/utility";
import { updateLead } from "@/api/slices/lead/leadSlice";

export const useLeadsServiceEditDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { service } = useAppSelector((state) => state.service);

  const handleBack = () => {
    onClick(2, ComponentsType.service);
  };
  const { systemSettings } = useAppSelector((state) => state.settings);


  const schema = generateLeadsServiceEditDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  console.log(errors,"errors");
  

  useMemo(() => {
    if (leadDetails.id) {
      reset({
        ...leadDetails,
        desireDate: formatDateTimeToDate(leadDetails?.desireDate),
      });
    }
  }, [leadDetails.id])

  const fields = LeadsServiceDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    trigger,
    service,
    leadDetails,
    systemSettings
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, step: 3, id: leadDetails?.id, stage: ComponentsType.additionalEdit }
    const response = await dispatch(updateLead({ data: apiData, router, setError, translate }));
    console.log(response,"response");
    // if (response?.payload) onClick(2, ComponentsType.service);

  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
