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
import { Attachement } from "@/types/global";

export const useUploadImage = (handleImageSlider: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, leadDetails } = useAppSelector((state) => state.lead);
  const { images, loading } = useAppSelector((state) => state.image);
  const [activeTab, setActiveTab] = useState("img_tab");
  const [enteredLink, setEnteredLink] = useState<string>("");
  const [enteredLinks, setEnteredLinks] = useState<any>({
    images: [],
    links: [],
    attachements: [],
    video: []
  });
  const attachementTabs = ["img_tab", "link_tab", "attachement_tab", "video_tab"]
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLinkAdd = () => {
    if (enteredLink.trim() !== "") {
      let newArray = [...enteredLinks.links]
      newArray.push(enteredLink as string)
      setEnteredLinks({ ...enteredLinks, links: [...newArray] });
      setEnteredLink("");
    }
  };
  const handleimageAdd = (attachement?: Attachement[]) => {
    // let newArray = [...enteredLinks.attachements]
    // newArray.push(attachement)
    if (attachement) setEnteredLinks({ ...enteredLinks, images: [...attachement] });
  };
  const handleAttachementAdd = (attachement?: Attachement[]) => {
    // let newArray = [...enteredLinks.attachements]
    // newArray.push(attachement)
    if (attachement) setEnteredLinks({ ...enteredLinks, attachements: [...attachement] });
  };
  const handleVideoAdd = (attachement?: Attachement[]) => {
    // let newArray = [...enteredLinks.attachements]
    // newArray.push(attachement)
    if (attachement) setEnteredLinks({ ...enteredLinks, video: [...attachement] });
  };
  const handleLinkDelete = (linkToDelete: string) => {
    const { links } = enteredLinks
    const updatedLinks = links.filter((item: string) => item !== linkToDelete);
    setEnteredLinks({ ...enteredLinks, links: updatedLinks });
  };

  const handleAttachementDelete = (attachementsToDelete: string) => {
    const { attachements } = enteredLinks
    const updatedAttachements = attachements.filter((item: string) => item !== attachementsToDelete);
    setEnteredLinks({ ...enteredLinks, attachements: updatedAttachements });
  };
  const handleVideoDelete = (attachementsToDelete: string) => {
    const { video } = enteredLinks
    const updatedAttachements = video.filter((item: string) => item !== attachementsToDelete);
    setEnteredLinks({ ...enteredLinks, video: updatedAttachements });
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
    attachementTabs,
    handleAttachementAdd,
    handleAttachementDelete,
    handleVideoAdd,
    handleVideoDelete,
    handleimageAdd
  };
};
