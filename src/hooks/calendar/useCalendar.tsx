import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { AddContractTask } from "@/base-components/ui/modals1/AddTask";
import localStoreUtil from "@/utils/localstore.util";
import { DEFAULT_CONTRACT_TASK } from "@/utils/static";
import {
  readContractTaskDetail,
  readContractTasks,
  setContractTaskDetails,
} from "@/api/slices/contract/contractSlice";
import { Tasks } from "@/types/contract";
import { ContractTaskDetail } from "@/base-components/ui/modals1/ContractTaskDetail";
import { CustomerPromiseActionType } from "@/types/company";

export const useCalendar = () => {
  const { loading, totalCount, lastPage, task, taskDetail } = useAppSelector(
    (state) => state.contract
  );

  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { modal } = useAppSelector((state) => state.global);

  useEffect(() => {
    localStoreUtil.remove_data("task");
    dispatch(setContractTaskDetails(DEFAULT_CONTRACT_TASK));
  }, []);

  useEffect(() => {
    dispatch(readContractTasks({ params: { filter: {}, paginate: 0 } }));
  }, []);

  // useEffect(() => {
  //   dispatch(readContractTasks({ params: { filter: taskDetail?.id } })).then(
  //     (res: CustomerPromiseActionType) => {
  //       dispatch(setContractTaskDetails(res?.payload));
  //     }
  //   );
  // }, [taskDetail?.id]);

  // Convert Tasks[] to EventInput[]
  const events = task.flatMap((task: Tasks) =>
    task.date.map((dateRange) => ({
      title: task.title,
      start: dateRange.startDate,
      end: dateRange.endDate,
      allDay: task.isAllDay,
      backgroundColor: task.colour,
      borderColor: task.colour,
      textColor: task.colour, // Example condition
      extendedProps: {
        taskID: task.id,
      },
    }))
  );

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const defaultUpdateModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleAddContractTask = () => {
    dispatch(updateModalType({ type: ModalType.ADD_CONTRACT_TASK }));
  };

  const handleContractTaskDetail = (id: string) => {
    dispatch(readContractTaskDetail({ params: { filter: id } })).then(
      (res: CustomerPromiseActionType) => {
        dispatch(setContractTaskDetails(res?.payload));
      }
    );
    dispatch(updateModalType({ type: ModalType.READ_CONTRACT_TASK_DETAIL }));
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
    [ModalType.ADD_CONTRACT_TASK]: (
      <AddContractTask onClose={onClose} isUpdate={false} />
    ),
    [ModalType.UPDATE_ADD_CONTRACT_TASK]: (
      <AddContractTask onClose={onClose} isUpdate={true} />
    ),
    [ModalType.READ_CONTRACT_TASK_DETAIL]: (
      <ContractTaskDetail onClose={onClose} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    renderModal,
    loading,
    handleAddContractTask,
    task,
    events,
    handleContractTaskDetail,
  };
};
