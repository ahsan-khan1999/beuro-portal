import { ContentTableRowTypes } from "@/types/content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { setServiceDetails } from "@/api/slices/service/serviceSlice";
import { CustomerPromiseActionType } from "@/types/customer";
import { deleteContent, readContentDetails, setContentDetails } from "@/api/slices/content/contentSlice";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useTranslation } from "next-i18next";

const useContentDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { t: translate } = useTranslation()
  const { modal } = useAppSelector((state) => state.global);
  const { contentDetails, loading } = useAppSelector((state) => state.content);
  const id = router.query.content;


  useEffect(() => {
    if (id) {
      dispatch(readContentDetails({ params: { filter: id } })).then((res: CustomerPromiseActionType) => {
        dispatch(setContentDetails(res.payload))
      })
    }
  }, [id]);
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const contentDeleteHandler = () => {
    dispatch(updateModalType({ type: ModalType.CONFIRM_DELETION, data: { refId: contentDetails?.refID } }));
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = () => {
    dispatch(deleteContent({ data:contentDetails, router, translate }))
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading="Please confirm Content ID"
        subHeading="Enter Content ID"
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading="Are you sure you want to delete this content?"
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
    renderModal
  };
};
export default useContentDetail;
