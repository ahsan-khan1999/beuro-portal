import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { CustomerPromiseActionType } from "@/types/customer";
import {
  deleteContent,
  readContentDetails,
  setContentDetails,
} from "@/api/slices/content/contentSlice";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useTranslation } from "next-i18next";

const useContentDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { modal } = useAppSelector((state) => state.global);
  const { contentDetails, loading } = useAppSelector((state) => state.content);
  const id = router.query?.content;

  useEffect(() => {
    if (id) {
      dispatch(readContentDetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setContentDetails(res.payload));
        }
      );
    }
  }, [id]);
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const contentDeleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: contentDetails?.refID },
      })
    );
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = () => {
    dispatch(deleteContent({ data: contentDetails, router, translate }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.content_confirmation")}
        subHeading={translate("common.modals.content_ID")}
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_content")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    contentDetails,
    contentDeleteHandler,
    renderModal,
    loading,
  };
};
export default useContentDetail;
