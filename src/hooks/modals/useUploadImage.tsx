import { loginUser } from "@/api/slices/authSlice/auth";
import {
  Control,
  FieldValues,
  SubmitHandler,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ImageUploadFormField } from "@/components/leads/fields/image-upload-fields";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useEffect, useMemo, useState } from "react";
import { setImageFieldValues } from "@/utils/utility";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { createImage, readImage } from "@/api/slices/imageSlice/image";
import { generateImageValidation } from "@/validation/modalsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";

export const useUploadImage = (handleImageSlider: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, leadDetails } = useAppSelector((state) => state.lead);
  const { images, loading } = useAppSelector((state) => state.image);
  const [activeTab, setActiveTab] = useState("img_tab");
  const [enteredLink, setEnteredLink] = useState("");
  const [enteredLinks, setEnteredLinks] = useState<string[]>([]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLinkAdd = () => {
    if (enteredLink.trim() !== "") {
      setEnteredLinks([...enteredLinks, enteredLink]);
      setEnteredLink("");
    }
  };

  const handleLinkDelete = (linkToDelete: string) => {
    const updatedLinks = enteredLinks.filter((link) => link !== linkToDelete);
    setEnteredLinks(updatedLinks);
  };

  const schema = generateImageValidation(translate);
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = ImageUploadFormField(
    loading,
    control as Control<any>,
    handleImageSlider,
    setValue
  );
  const handleOnClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  useMemo(() => {
    if (leadDetails?.id)
      setImageFieldValues(setValue as UseFormSetValue<any>, images);
  }, [leadDetails?.id, images?.length]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const filteredList = Object.values(data)
      ?.filter((value) => value)
      ?.reverse();
    const apiData = {
      images: filteredList,
      id: leadDetails?.id,
      type: "leadID",
    };
    const response = await dispatch(
      createImage({ data: apiData, router, setError, translate })
    );
    if (response?.payload && response?.payload?.length > 0) handleImageSlider();
    else handleOnClose();
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    handleTabChange,
    activeTab,
    enteredLink,
    setEnteredLink,
    enteredLinks,
    handleLinkAdd,
    handleLinkDelete,
  };
};
