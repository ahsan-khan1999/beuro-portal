import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddLeadAdditionalDetailsFormField } from "@/components/leads/fields/Add-lead-additional-fields";
import { generateLeadAdditionalDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useMemo } from "react";

export const useAddLeadAdditionalDetails = ({ onHandleBack, onHandleNext }: { onHandleBack: (currentComponent: ComponentsType) => void, onHandleNext: (currentComponent: ComponentsType) => void }) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);

  const schema = generateLeadAdditionalDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useMemo(() => {
    if (leadDetails.id) {
      reset({
        ...leadDetails
      })
    }
  }, [leadDetails.id])
  const fields = AddLeadAdditionalDetailsFormField(loading, control, onHandleBack, leadDetails);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, step: 4, id: leadDetails?.id, stage: ComponentsType.additionalEdit }
    const response = await dispatch(updateLead({ data: apiData, router, setError, translate }));
    if (response?.payload) onHandleNext(ComponentsType.additionalEdit);
    // onHandleNext(ComponentsType.additionalEdit);
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
