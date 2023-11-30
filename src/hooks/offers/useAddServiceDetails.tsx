import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOfferDetailsServiceSubmitFormField, AddOfferServiceDetailsDescriptionFormField, AddOfferServiceDetailsFormField } from "@/components/offers/add/fields/add-offer-service-details-fields";
import { generateAddfferServiceDetailsValidation, generateOfferDiscountValidation, mergeOfferSchemas } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useEffect, useMemo, useState } from "react";
import { readService } from "@/api/slices/service/serviceSlice";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { FormField } from "@/types";

export const useAddServiceDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const [formFields, setFormFields] = useState<any[]>([]);

  const [serviceCount, setServiceCount] = useState<number>(1)
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);
  const { service } = useAppSelector((state) => state.service);
  const [shouldRegenerateFields, setShouldRegenerateFields] = useState(true);

  const handleAddService = () => {
    setServiceCount(serviceCount + 1)
    setShouldRegenerateFields(true);

  }
  // console.log(serviceCount, "serviceCount");


  useEffect(() => {
    // dispatch(readService({ params: { filter: { paginate: 0 } } }))
  }, [])

  const handleBack = () => {
    onHandleNext(ComponentsType.addressAdded)
  }
  const schema = generateAddfferServiceDetailsValidation(translate, serviceCount);
  const discountSchema = generateOfferDiscountValidation(translate)
  const mergedSchemas = mergeOfferSchemas(schema, discountSchema)
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(mergedSchemas),
  });
  const handleRemoveDateField = (key: string) => {
    setServiceCount(prevCount => prevCount - 1);

    setShouldRegenerateFields(false);
    setFormFields(prev => {
      const updateServiceFields = prev.filter((item) => item.field.id !== key)
      console.log(updateServiceFields, "updateServiceFields");

      return [...updateServiceFields];
    });
  };
  const formFieldss = useMemo((): FormField[] => {

    if (!shouldRegenerateFields) {
      return formFields;
    }
    const dynamicFormFields = [];
    dynamicFormFields.push(...AddOfferServiceDetailsFormField(register, loading, control, handleAddService, serviceCount, { service: service, handleRemove: handleRemoveDateField }));
    return dynamicFormFields;
  }, [serviceCount]);
  // const fields =
  const fieldsDescription = AddOfferServiceDetailsDescriptionFormField(register, loading, control, handleAddService, serviceCount, { service: service }, setValue);
  const submitFields = AddOfferDetailsServiceSubmitFormField(loading, handleBack)


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "data");

    // const apiData = { ...data, step: 3, id: offerDetails?.id, stage: ComponentsType.additionalAdded }
    // const response = await dispatch(updateOffer({ data: apiData, router, setError, translate }));
    // if (response?.payload) onHandleNext(ComponentsType.additionalAdded);

  };
  useEffect(() => {
    setFormFields(formFieldss);
  }, [formFieldss]);
  return {
    fields: [...formFields, ...fieldsDescription, ...submitFields],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
