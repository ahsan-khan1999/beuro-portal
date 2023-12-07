import { loginUser } from "@/api/slices/authSlice/auth";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ImageUploadFormField } from "@/components/leads/fields/image-upload-fields";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useMemo } from "react";
import { setImageFieldValues } from "@/utils/utility";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";

export const useUploadImage = (handleImageSlider: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const fields = ImageUploadFormField(loading, control, handleImageSlider);
  useMemo(() => {
    if (leadDetails?.id) setImageFieldValues(setValue, leadDetails?.images)
  }, [leadDetails?.id])



  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const filteredList = Object.values(data)?.filter(value => value);
    const apiData = { images: filteredList, step: 5, id: leadDetails?.id, stage: ComponentsType.customerEdit, type: "Test" }

    const response = await dispatch(updateLead({ data: apiData, router, setError, translate }));
    if (response?.payload) handleImageSlider();

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
