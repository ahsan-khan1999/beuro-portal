import { useTranslation } from "next-i18next";
import { useAppSelector } from "../useRedux";
import { useState } from "react";

export const useShareImages = () => {
  const { t: translate } = useTranslation();
  const { loading } = useAppSelector((state) => state.image);
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
