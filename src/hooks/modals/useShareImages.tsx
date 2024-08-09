import { useTranslation } from "next-i18next";
import { useAppSelector } from "../useRedux";
import { useEffect, useState } from "react";

export const useShareImages = () => {
  const { t: translate } = useTranslation();
  const { loading } = useAppSelector((state) => state.image);
  const { loading: loadingGlobal } = useAppSelector((state) => state.global);
  const [isOpenedFile, setIsOpenedFile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("img_tab");
  const { images } = useAppSelector((state) => state.image);

  const attachementTabs = [
    "img_tab",
    "video_tab",
    "attachement_tab",
    "link_tab",
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (images) {
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
  }, [images]);

  return {
    translate,
    activeTab,
    handleTabChange,
    attachementTabs,
    loading,
    loadingGlobal,
    isOpenedFile,
    images,
  };
};
