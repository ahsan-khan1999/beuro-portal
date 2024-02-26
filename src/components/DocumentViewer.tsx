import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { DocumentViewerModal } from "@/base-components/ui/modals1/DocumentViewer";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const DocumentViewer = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { t: translate } = useTranslation();

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.DOCUMENT_VIEWER]: (
      <DocumentViewerModal
        onClose={onClose}
        handleImageSlider={handleImageSlider}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.offer_created_des")}
        route={onClose}
      />
    ),
  };

  useEffect(() => {
    dispatch(updateModalType({ type: ModalType.DOCUMENT_VIEWER }));
  }, []);

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return <>{renderModal()}</>;
};
