import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useMemo, useState } from "react";
import { getFileNameFromUrl } from "@/utils/utility";

export const useShareImages = (handleImageSlider: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { images, loading } = useAppSelector((state) => state.image);
  const { loading: loadingGlobal } = useAppSelector((state) => state.global);
  const [isOpenedFile, setIsOpenedFile] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState("img_tab");

  const attachementTabs = [
    "img_tab",
    "video_tab",
    "attachement_tab",
    "link_tab",
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  //   if (response?.payload) handleImageSlider();

  return {
    translate,
    activeTab,
    handleTabChange,
    attachementTabs,
    loading,
    loadingGlobal,
    isOpenedFile,
  };
};
