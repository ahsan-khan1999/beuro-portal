import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddLeadServiceDetailsFormField } from "@/components/leads/fields/Add-lead-service-details";
import { generateLeadsServiceEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { useEffect, useMemo } from "react";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { formatDateTimeToDateMango } from "@/utils/utility";
import { readContent } from "@/api/slices/content/contentSlice";
import { ContentTableRowTypes } from "@/types/content";

export const useAddLeadServiceDetails = ({
  onHandleBack,
  onHandleNext,
}: {
  onHandleBack: (currentComponent: ComponentsType) => void;
  onHandleNext: (currentComponent: ComponentsType) => void;
}) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { systemSettings } = useAppSelector((state) => state.settings);
  const { content } = useAppSelector((state) => state.content);

  const schema = generateLeadsServiceEditDetailsValidation(translate);

  useEffect(() => {
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    reset,
    formState: { errors },
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
        // otherServices: contentList?.map((item) => item.id)
      });
    }
  }, [leadDetails.id]);

  const fields = AddLeadServiceDetailsFormField(
    register,
    loading,
    control,
    onHandleBack,
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
      stage: ComponentsType.additionalAdd,
    };
    const response = await dispatch(
      updateLead({ data: apiData, router, setError, translate })
    );
    if (response?.payload) onHandleNext(ComponentsType.additionalAdd);
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
