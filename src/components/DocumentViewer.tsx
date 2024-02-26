import { updateModalType } from "@/api/slices/globalSlice/global";
import { DocumentViewerModal } from "@/base-components/ui/modals1/DocumentViewer";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const DocumentViewer = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
    dispatch(updateModalType({ type: ModalType.IMAGE_SLIDER }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.DOCUMENT_VIEWER]: (
      <DocumentViewerModal
        onClose={onClose}
        handleImageSlider={handleImageSlider}
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
