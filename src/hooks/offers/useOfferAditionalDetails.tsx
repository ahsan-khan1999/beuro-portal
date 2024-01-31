import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOfferAdditionalDetailsFormField } from "@/components/offers/add/fields/add-additional-details-fields";
import { generateOfferAdditionalDetailsValidation } from "@/validation/offersSchema";
import { useEffect, useMemo } from 'react';
import { readContent, setContentDetails } from "@/api/slices/content/contentSlice";
import { DEFAULT_CONTENT } from "@/utils/static";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";

export const useOfferAditionalDetails = (onHandleNext: (currentComponent: ComponentsType) => void, onHandleBack: (currentComponent: ComponentsType) => void) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);
  const { content, contentDetails } = useAppSelector((state) => state.content);
  useEffect(() => {

    // setValue("additionalDetails", offerDetails?.additionalDetails || "<p>asd</p>");
    setValue("content", offerDetails?.content?.id);
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }))
  }, [])



  const schema = generateOfferAdditionalDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useMemo(() => {
    setValue("additionalDetails", offerDetails?.additionalDetails || offerDetails?.content?.offerContent?.description);
  }, [offerDetails?.additionalDetails])

  const selectedContent = watch("content")
  const handleBack = () => {
    onHandleBack(ComponentsType.serviceAdded)
  }
  const onContentSelect = (id: string) => {
    const filteredContent = content?.find(
      (item) => item.id === id
    );
    if (filteredContent) {
      dispatch(setContentDetails(filteredContent))
      setValue("additionalDetails", filteredContent?.offerContent?.description);
      trigger("additionalDetails")

    }
  }
  const fields = AddOfferAdditionalDetailsFormField(register, loading, control, handleBack, 0,
    { content: content, contentDetails: contentDetails, offerDetails, onContentSelect, selectedContent }, setValue, trigger);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, step: 4, id: offerDetails?.id, stage: ComponentsType.additionalAdded }
    const response = await dispatch(updateOffer({ data: apiData, router, setError, translate }));
    if (response?.payload) onHandleNext(ComponentsType.additionalAdded)

  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    offerDetails
  };
};
