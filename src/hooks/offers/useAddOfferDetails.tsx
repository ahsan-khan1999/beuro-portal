import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddDateFormField, AddOfferDetailsFormField } from "@/components/offers/add/fields/add-offer-details-fields";
import { generateOfferDetailsValidationSchema } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useMemo, useRef, useState } from "react";
import { FormField } from "@/types";
import { useFormFields } from "@/base-components/form/hook";

export const useAddOfferDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  let [dateCount, setDateCount] = useState<number>(1)

  const { loading, error } = useAppSelector((state) => state.auth);
  const count = useRef(1)
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
    setDateCount(dateCount + 1)
  }
  const offerFields = AddOfferDetailsFormField(register, loading, control, () => console.log("")
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onHandleNext(ComponentsType.addressAdded);
  };

  const formFields = useMemo((): FormField[] => {
    const dynamicFormFields = [];
    dynamicFormFields.push(
      ...AddDateFormField(register, loading, control, handleAddDateField, dateCount)
    );
    return dynamicFormFields;
  }, [dateCount]);
  const fields = [...offerFields, ...formFields]


  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
