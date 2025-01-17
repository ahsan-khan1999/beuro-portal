import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { LeadsServiceDetailsFormField } from "@/components/leads/fields/Leads-service-details-fields";
import { generateLeadsServiceEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { useMemo } from "react";
import { formatDateTimeToDateMango } from "@/utils/utility";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { ContentTableRowTypes } from "@/types/content";

export const useLeadsServiceEditDetails = (onClick: Function) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { content } = useAppSelector((state) => state.content);
  const { systemSettings } = useAppSelector((state) => state.settings);
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);

  const handleBack = () => {
    onClick(2, ComponentsType.service);
  };

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

  const selectedContent = leadDetails?.requiredService as ContentTableRowTypes;
  const contentList = leadDetails?.otherServices as ContentTableRowTypes[];

  useMemo(() => {
    if (leadDetails.id) {
      reset({
        ...leadDetails,
        desireDate: formatDateTimeToDateMango(leadDetails?.desireDate),
        requiredService: selectedContent?.id,
        otherServices: contentList?.map((item) => item.id),
      });
    }
  }, [leadDetails.id]);

  const fields = LeadsServiceDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    trigger,
    content,
    leadDetails,
    systemSettings
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      step: 3,
      id: leadDetails?.id,
      stage: ComponentsType.additionalEdit,
    };
    const response = await dispatch(
      updateLead({ data: apiData, router, setError, translate })
    );
    if (response?.payload) onClick(2, ComponentsType.service);
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
