import { loginUser } from "@/api/slices/authSlice/auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ImageUploadFormField } from "@/components/leads/fields/image-upload-fields";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useEffect, useMemo } from "react";
import { setImageFieldValues } from "@/utils/utility";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { createImage, readImage } from "@/api/slices/imageSlice/image";

export const useUploadImage = (handleImageSlider: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {  error, leadDetails } = useAppSelector((state) => state.lead);
  const { images,loading } = useAppSelector(state => state.image)

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const fields = ImageUploadFormField(loading, control, handleImageSlider);




  useMemo(() => {
    if (leadDetails?.id) setImageFieldValues(setValue, images)
  }, [leadDetails?.id,images?.length])



  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const filteredList = Object.values(data)?.filter(value => value);
    const apiData = { images: filteredList, id: leadDetails?.id,type:"leadID" }
    const response = await dispatch(createImage({ data: apiData, router, setError, translate }));
    if (response?.payload) handleImageSlider();
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
