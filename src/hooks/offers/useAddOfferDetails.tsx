import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddDateFormField, AddOfferDetailsFormField } from "@/components/offers/add/fields/add-offer-details-fields";
import { generateOfferDetailsValidationSchema } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useState } from "react";
import { FormField } from "@/types";
import { useFormFields } from "@/base-components/form/hook";

export const useAddOfferDetails = (onHandleNext: Function) => {
  const [allFields, setAllFields] = useState<FormField[]>([])
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateOfferDetailsValidationSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  
  const handleAddDateField = () => {
    const dateFields = AddDateFormField(register, loading, control);
    setAllFields([...allFields,...dateFields])
  }
  const offerFields = AddOfferDetailsFormField(register, loading, control,handleAddDateField);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onHandleNext(ComponentsType.addressAdded);
  };
  const fields = [...offerFields,...allFields]
  const {
    Form,
    fields: {
     
    },
  } = useFormFields({
    formFields: fields,
    errors,
    handleSubmit,
    onSubmit,
  });
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
