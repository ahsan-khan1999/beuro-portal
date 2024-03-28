import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useEffect, useMemo, useState } from "react";
import { getFileNameFromUrl } from "@/utils/utility";
import { createImage } from "@/api/slices/imageSlice/image";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { Attachement } from "@/types/global";

export const useUploadImageOffer = (
  handleImageSlider: Function,
  type: string
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { leadDetails } = useAppSelector((state) => state.lead);
  const { error, offerDetails } = useAppSelector((state) => state.offer);
  const { contractDetails } = useAppSelector((state) => state.contract);
  const { images, loading } = useAppSelector((state) => state.image);
  const { loading: loadingGlobal } = useAppSelector((state) => state.global);

  const [activeTab, setActiveTab] = useState("img_tab");
  const [enteredLink, setEnteredLink] = useState<string>("");
  const [enteredLinks, setEnteredLinks] = useState<any>({
    images: [],
    links: [],
    attachements: [],
    video: [],
  });

  const attachementTabs = [
    "img_tab",
    "video_tab",
    "attachement_tab",
    "link_tab",
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLinkAdd = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (enteredLink.trim() !== "") {
      let newArray = [...enteredLinks.links];

      newArray.push(enteredLink as string);
      setEnteredLinks({ ...enteredLinks, links: [...newArray] });
      setEnteredLink("");
    }
  };

  const handleimageAdd = (attachement?: Attachement[]) => {
    if (attachement)
      setEnteredLinks({ ...enteredLinks, images: [...attachement] });
  };

  const handleAttachementAdd = (attachement?: Attachement[]) => {
    if (attachement)
      setEnteredLinks({ ...enteredLinks, attachements: [...attachement] });
  };

  const handleImageDelete = (linkToDelete: string) => {
    const { images } = enteredLinks;
    const updatedLinks = images.filter((item: string) => item !== linkToDelete);
    setEnteredLinks({ ...enteredLinks, images: updatedLinks });
  };

  const handleVideoAdd = (attachement?: Attachement[]) => {
    if (attachement)
      setEnteredLinks({ ...enteredLinks, video: [...attachement] });
  };

  const handleLinkDelete = (linkToDelete: number) => {
    const { links } = enteredLinks;
    const linkList = [...links];
    linkList?.splice(linkToDelete, 1);
    setEnteredLinks({ ...enteredLinks, links: linkList });
  };

  const handleAttachementDelete = (attachementsToDelete: string) => {
    const { attachements } = enteredLinks;
    const updatedAttachements = attachements.filter(
      (item: string) => item !== attachementsToDelete
    );
    setEnteredLinks({ ...enteredLinks, attachements: updatedAttachements });
  };

  const handleVideoDelete = (attachementsToDelete: string) => {
    const { video } = enteredLinks;
    const updatedAttachements = video.filter(
      (item: string) => item !== attachementsToDelete
    );
    setEnteredLinks({ ...enteredLinks, video: updatedAttachements });
  };

  const handleOnClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  useMemo(() => {
    const formatImages = images?.images?.map((item: string) => ({
      name: getFileNameFromUrl(item),
      value: item,
    }));
    const formatVideos = images?.videos?.map((item: string) => ({
      name: getFileNameFromUrl(item),
      value: item,
    }));
    const formatAttachments = images?.attachments?.map((item: string) => ({
      name: getFileNameFromUrl(item),
      value: item,
    }));
    const formatLinks = images?.links;

    setEnteredLinks({
      images: formatImages,
      links: formatLinks,
      attachements: formatAttachments,
      video: formatVideos,
    });
  }, [images]);

  const onSubmit = async () => {
    const formatImages = enteredLinks?.images?.map(
      (item: Attachement) => item.value
    );
    const formatVideos = enteredLinks?.video?.map(
      (item: Attachement) => item.value
    );

    const formatAttachments = enteredLinks?.attachements?.map(
      (item: Attachement) => item.value
    );

    const formatLinks = enteredLinks?.links;

    if (type === "Lead") {
      const apiData = {
        images: formatImages,
        links: formatLinks,
        attachments: formatAttachments,
        videos: formatVideos,
        id: leadDetails?.id,
        type: "leadID",
      };

      const response = await dispatch(
        createImage({ data: apiData, router, translate })
      );

      if (response?.payload) handleImageSlider();
    } else if (type === "Offer") {
      // const filteredList = Object.values(data)
      //   ?.filter((value) => value)
      //   ?.reverse();
      const apiData = {
        images: formatImages,
        links: formatLinks,
        attachments: formatAttachments,
        videos: formatVideos,
        id: offerDetails?.id,
        type: "offerID",
      };
      const response = await dispatch(
        createImage({ data: apiData, router, translate })
      );
      // if (response?.payload) handleOnClose();
      if (response?.payload) handleImageSlider();
    } else if (type === "Contract") {
      // const filteredList = Object.values(data)
      //   ?.filter((value) => value)
      //   ?.reverse();
      const apiData = {
        images: formatImages,
        links: formatLinks,
        attachments: formatAttachments,
        videos: formatVideos,
        id: contractDetails?.id,
        type: "contractID",
      };
      const response = await dispatch(
        createImage({ data: apiData, router, translate })
      );
      if (response?.payload) handleOnClose();
    } else {
    }
  };

  useEffect(() => {
    if (enteredLinks) {
      const { images, links, attachements, video } = enteredLinks;

      if (links && links.length > 0) {
        setActiveTab("link_tab");
      } else if (images && images.length > 0) {
        setActiveTab("img_tab");
      } else if (attachements && attachements.length > 0) {
        setActiveTab("attachement_tab");
      } else if (video && video.length > 0) {
        setActiveTab("video_tab");
      } else {
        setActiveTab(attachementTabs[0]);
      }
    }
  }, [enteredLinks]);

  return {
    onSubmit,
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
    handleimageAdd,
    handleImageDelete,
    loading,
    loadingGlobal,
  };
};
