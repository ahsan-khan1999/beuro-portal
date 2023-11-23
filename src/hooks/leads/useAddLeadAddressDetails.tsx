import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddLeadAddressDetailsFormField } from "@/components/leads/fields/Add-lead-address-fields";
import { generateLeadsAddressEditDetailsValidation } from "@/validation/leadsSchema";
import { senitizeDataForm, transformAddressFormValues } from "@/utils/utility";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { useMemo, useState } from "react";

export const useAddLeadAddressDetails = (onHandleBack: (currentComponent: ComponentsType) => void, onHandleNext: (currentComponent: ComponentsType) => void) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const [addressCount, setAddressCount] = useState(1)
  const schema = generateLeadsAddressEditDetailsValidation(translate, addressCount);

  const handleAddNewAddress = () => {
    setAddressCount(addressCount + 1)
  }
  const handleRemoveNewAddress = () => {
    setAddressCount(addressCount - 1)
  }
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),

  });
  useMemo(() => {
    if (leadDetails.id) {
      reset(transformAddressFormValues(leadDetails?.addressID?.address))
    }
  }, [leadDetails.id])

  const fields = AddLeadAddressDetailsFormField(register, loading, control, onHandleBack, addressCount, handleAddNewAddress, handleRemoveNewAddress)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { address: senitizeDataForm(data).slice(0, addressCount), step: 2, id: leadDetails?.id, stage: ComponentsType.serviceEdit }
    const response = await dispatch(updateLead({ data: apiData, router, setError, translate }));
    if (response?.payload) onHandleNext(ComponentsType.serviceEdit);
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




