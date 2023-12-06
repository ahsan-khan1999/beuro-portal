import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ImageUploadFormField } from "@/components/leads/fields/image-upload-fields";
import { useMemo } from "react";
import { setImageFieldValues } from "@/utils/utility";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { updateOffer } from "@/api/slices/offer/offerSlice";

export const useUploadImageOffer = (handleImageSlider: Function, type: string) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);
  const { contractDetails } = useAppSelector((state) => state.contract);

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const fields = ImageUploadFormField(loading, control, handleImageSlider);
  useMemo(() => {
    if (type === "Offer") {
      setImageFieldValues(setValue, offerDetails?.images)
    } else if (type === "Contract") {
      setImageFieldValues(setValue, contractDetails?.offerID?.images)
    }
  }, [offerDetails?.id, contractDetails?.id])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (type === "Offer") {
      const filteredList = Object.values(data)?.filter(value => value);
      const apiData = { images: filteredList, step: 5, id: offerDetails?.id, stage: ComponentsType.customerEdit, type: "Test" }

      const response = await dispatch(updateOffer({ data: apiData, router, setError, translate }));
      if (response?.payload) handleImageSlider();
    } else if (type === "Contract") {
      const filteredList = Object.values(data)?.filter(value => value);
      const apiData = { images: filteredList, step: 5, id: contractDetails?.offerID?.id, stage: ComponentsType.customerEdit, type: "Test" }

      const response = await dispatch(updateOffer({ data: apiData, router, setError, translate }));
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
