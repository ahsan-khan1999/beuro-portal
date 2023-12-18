import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { LeadsAddressDetailsFormField } from "@/components/leads/fields/Leads-address-details-fields";
import { generateLeadsAddressEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { useMemo } from "react";
import { senitizeDataForm, transformAddressFormValues } from "@/utils/utility";
import { updateLead } from "@/api/slices/lead/leadSlice";

export const useLeadsAddressEditDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);

  const handleBack = () => {
    onClick(1, ComponentsType.address);
  };

  const schema = generateLeadsAddressEditDetailsValidation(translate, leadDetails?.addressID?.address?.length);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useMemo(() => {
    if (leadDetails.id) {
      reset(transformAddressFormValues(leadDetails?.addressID?.address));
    }
  }, [leadDetails.id]);
  const fields = LeadsAddressDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    leadDetails?.addressID?.address?.length
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      address: senitizeDataForm(data),
      step: 2,
      id: leadDetails?.id,
      stage: ComponentsType.serviceEdit,
    };
    const response = await dispatch(
      updateLead({ data: apiData, router, setError, translate })
    );
    if (response?.payload) onClick(1, ComponentsType.address);
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
