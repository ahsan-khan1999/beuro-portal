import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ImageUploadFormField } from "@/components/leads/fields/image-upload-fields";
import { useEffect, useMemo } from "react";
import { setImageFieldValues } from "@/utils/utility";
import { createImage, setImages } from '@/api/slices/imageSlice/image';

export const useUploadImageOffer = (handleImageSlider: Function, type: string) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, offerDetails } = useAppSelector((state) => state.offer);
  const { contractDetails } = useAppSelector((state) => state.contract);
  const { images, loading } = useAppSelector(state => state.image)



  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const fields = ImageUploadFormField(loading, control, handleImageSlider);
  useMemo(() => {
    setImageFieldValues(setValue, images)
  }, [images?.length])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (type === "Offer") {
      const filteredList = Object.values(data)?.filter(value => value);
      const apiData = { images: filteredList, id: offerDetails?.id, type: "offerID" }
      const response = await dispatch(createImage({ data: apiData, router, setError, translate }));
      if (response?.payload) handleImageSlider();
    } else if (type === "Contract") {
      const filteredList = Object.values(data)?.filter(value => value);
      const apiData = { images: filteredList, id: contractDetails?.id, type: "contractID" }
      const response = await dispatch(createImage({ data: apiData, router, setError, translate }));
      if (response?.payload) handleImageSlider();
    } else { }

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
