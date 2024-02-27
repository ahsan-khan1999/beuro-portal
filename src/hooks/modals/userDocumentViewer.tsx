import { useTranslation } from "next-i18next";
import { useState } from "react";

export const useDocumentViewer = () => {
  const { t: translate } = useTranslation();
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
    handleTabChange,
    activeTab,
    attachementTabs,
    isOpenedFile,
  };
};
