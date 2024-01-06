import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useRouter } from "next/router";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import {
  deleteLead,
  readLeadDetails,
  setLeadDetails,
} from "@/api/slices/lead/leadSlice";
import { CustomerPromiseActionType } from "@/types/customer";
import { useTranslation } from "next-i18next";
import { readService } from "@/api/slices/service/serviceSlice";
import { readImage } from "@/api/slices/imageSlice/image";

export default function useLeadDetail() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { leadDetails, loading } = useAppSelector((state) => state.lead);

  const { t: translate } = useTranslation();
  const router = useRouter();
  const id = router.query.lead;

  useEffect(() => {
    dispatch(readService({ params: { filter: { paginate: 0 } } }));
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(readLeadDetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setLeadDetails(res.payload));
          dispatch(
            readImage({ params: { type: "leadID", id: res.payload?.id } })
          );
        }
      );
    }
  }, [id]);

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const leadDeleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: leadDetails?.refID },
      })
    );
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = () => {
    dispatch(deleteLead({ leadDetails, router, translate }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.lead_confirm")}
        subHeading={translate("common.modals.lead_ID")}
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_lead")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  return {
    renderModal,
    leadDeleteHandler,
    leadDetails,
    loading,
  };
}
