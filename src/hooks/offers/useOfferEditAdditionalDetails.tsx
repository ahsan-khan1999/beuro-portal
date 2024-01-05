import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { OfferEditAdditionalDetailsFormField } from "@/components/offers/edit/fields/Additional-details-fields";
import { generateOfferAdditionalDetailsValidation } from "@/validation/offersSchema";
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { useEffect, useMemo } from "react";
import { readContent, setContentDetails } from "@/api/slices/content/contentSlice";
import { AddOfferAdditionalDetailsFormField } from "@/components/offers/add/fields/add-additional-details-fields";
import { updateOffer } from "@/api/slices/offer/offerSlice";

export const useOfferEditAdditionalDetails = ({ handleNext, handleBack }: { handleNext: (currentComponent: EditComponentsType) => void, handleBack: (currentComponent: EditComponentsType) => void }) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);
  const { content, contentDetails } = useAppSelector((state) => state.content);

  useEffect(() => {
    setValue("additionalDetails", offerDetails?.additionalDetails);
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
    reset
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const selectedContent = watch("content")
  const handlePrevious = () => {
    handleBack(EditComponentsType.serviceEdit)
  }
  // useMemo(() => {
  //   const filteredContent = content?.find(
  //     (item) => item.id === selectedContent
  //   );
  //   if (filteredContent ) {
  //     dispatch(setContentDetails(filteredContent))
  //     setValue("additionalDetails", filteredContent?.offerContent?.description);

  //   }
  // }, [selectedContent])

  const onContentSelect = (id:string) => {
    const filteredContent = content?.find(
      (item) => item.id === selectedContent
    );
    console.log(filteredContent,"filteredContent",selectedContent);
    
    if (filteredContent) {
      dispatch(setContentDetails(filteredContent))
      reset({
        additionalDetails: filteredContent?.offerContent?.description,
        content: id

      })
      // setValue("additionalDetails", filteredContent?.offerContent?.description);

    }
  }
  const fields = AddOfferAdditionalDetailsFormField(register, loading, control, handlePrevious, 0,
    { content: content, contentDetails: contentDetails, offerDetails, onContentSelect, selectedContent }, setValue, trigger);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, step: 4, id: offerDetails?.id, stage: EditComponentsType.additionalEdit }
    const response = await dispatch(updateOffer({ data: apiData, router, setError, translate }));
    if (response?.payload) handleNext(EditComponentsType.additionalEdit)

  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate
  };
};
