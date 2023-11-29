import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOfferServiceDetailsDescriptionFormField, AddOfferServiceDetailsFormField } from "@/components/offers/add/fields/add-offer-service-details-fields";
import { generateAddfferServiceDetailsValidation } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useEffect, useState } from "react";
import { readService } from "@/api/slices/service/serviceSlice";

export const useAddServiceDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const [serviceCount, setServiceCount] = useState<number>(1)
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);
  const { service } = useAppSelector((state) => state.service);

  const handleAddService = () => {
    setServiceCount(serviceCount + 1)
  }

  useEffect(() => {
    // dispatch(readService({ params: { filter: { paginate: 0 } } }))
  }, [])

  const handleBack = () => {
    onHandleNext(ComponentsType.addressAdded)
  }
  const schema = generateAddfferServiceDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = AddOfferServiceDetailsFormField(register, loading, control, handleAddService, serviceCount, { service: service });
  const fieldsDescription = AddOfferServiceDetailsDescriptionFormField(register, loading, control, handleAddService, serviceCount, { service: service });

  console.log(fields,"fields");
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data");
    // dispatch(loginUser({ data, router, setError, translate }));

    // onHandleNext(ComponentsType.additionalAdded)
  };
  return {
    fields:[...fields,...fieldsDescription],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
