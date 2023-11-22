import { loginUser } from "@/api/slices/authSlice/auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ImageUploadFormField } from "@/components/leads/fields/image-upload-fields";
import { updateLead } from "@/api/slices/lead/leadSlice";

export const useUploadImage = (handleImageSlider: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error,leadDetails } = useAppSelector((state) => state.lead);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();
  const fields = ImageUploadFormField(loading, control, handleImageSlider);
  const onSubmit: SubmitHandler<FieldValues> =async (data) => {
    console.log(data,"data");
    const filteredList = Object.values(data)?.filter(value => value);
    const apiData = { images:filteredList, step: 5, id: leadDetails?.id }
    
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
  };
};
