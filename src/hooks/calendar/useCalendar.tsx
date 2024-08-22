import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { AddContractTask } from "@/base-components/ui/modals1/AddTask";

export const useCalendar = () => {
  const { loading, totalCount, lastPage, task, taskDetail } = useAppSelector(
    (state) => state.contract
  );

  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const defaultUpdateModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleAddContractTask = () => {
    dispatch(updateModalType({ type: ModalType.ADD_CONTRACT_TASK }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.update_success")}
        route={onClose}
      />
    ),
    [ModalType.ADD_CONTRACT_TASK]: <AddContractTask onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    renderModal,
    loading,
    handleAddContractTask,
  };
};
