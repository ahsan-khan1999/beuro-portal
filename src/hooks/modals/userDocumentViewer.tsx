import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useAppSelector } from "../useRedux";

export const useDocumentViewer = () => {
  const { t: translate } = useTranslation();
  const [isOpenedFile, setIsOpenedFile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("img_tab");
  const { images } = useAppSelector((state) => state.image);

  const attachementTabs = [
    "img_tab",
    "video_tab",
    "attachement_tab",
    "link_tab",
  ];

  useEffect(() => {
    if (images) {
      if (activeTab == "img_tab") {
        if (images && images?.images?.length > 0) {
          setActiveTab("img_tab");
        } else if (images?.videos && images?.videos?.length > 0) {
          setActiveTab("video_tab");
        } else if (images?.attachments && images?.attachments?.length > 0) {
          setActiveTab("attachement_tab");
        } else if (images?.links && images?.links?.length > 0) {
          setActiveTab("link_tab");
        } else {
          setActiveTab(attachementTabs[0]);
        }
      }
    }
  }, [images]);

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
