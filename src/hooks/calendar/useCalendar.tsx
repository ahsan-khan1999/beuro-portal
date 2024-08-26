import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { AddContractTask } from "@/base-components/ui/modals1/AddTask";
import localStoreUtil from "@/utils/localstore.util";
import { DEFAULT_CONTRACT_TASK } from "@/utils/static";
import {
  deleteContractTask,
  readContractTaskDetail,
  readContractTasks,
  setContractTask,
  setContractTaskDetails,
} from "@/api/slices/contract/contractSlice";
import { Tasks } from "@/types/contract";
import { ContractTaskDetail } from "@/base-components/ui/modals1/ContractTaskDetail";
import { CustomerPromiseActionType } from "@/types/company";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";

export const useCalendar = () => {
  const { loading, task } = useAppSelector((state) => state.contract);

  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { modal } = useAppSelector((state) => state.global);

  useEffect(() => {
    localStoreUtil.remove_data("task");
    dispatch(setContractTaskDetails(DEFAULT_CONTRACT_TASK));
  }, []);

  useEffect(() => {
    dispatch(readContractTasks({ params: { filter: {}, paginate: 0 } }));
  }, [dispatch]);

  const events = useMemo(() => {
    return task?.flatMap((task: Tasks) =>
      task.date?.map((dateRange) => ({
        title: task.title,
        start: dateRange.startDate,
        end: dateRange.endDate,
        allDay: task.isAllDay,
        backgroundColor: task.colour,
        borderColor: task.colour,
        textColor: task.colour,
        extendedProps: {
          taskID: task.id,
        },
      }))
    );
  }, [task]);

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
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

  const handleTaskSuccess = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleTaskUpdateSuccess = () => {
    dispatch(updateModalType({ type: ModalType.TASK_UPDATED_SUCCESS }));
  };

  const handleDeleteContractTask = (id: string) => {
    if (id) {
      dispatch(deleteContractTask({ params: { id } })).then(
        (res: CustomerPromiseActionType) => {
          if (res?.payload) {
            dispatch(setContractTask(task.filter((item) => item.id !== id)));
            dispatch(updateModalType({ type: ModalType.CONFIRM_DELETION }));
          }
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.INFO_DELETED,
        data: {
          id: id,
        },
      })
    );
  };

  const handleUpdateTask = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.UPDATE_ADD_CONTRACT_TASK,
        data: {
          id: id,
        },
      })
    );
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading="Task created successfully"
        route={onClose}
      />
    ),
    [ModalType.TASK_UPDATED_SUCCESS]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading="Task Updated successfully"
        route={onClose}
      />
    ),
    [ModalType.CONFIRM_DELETION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading="Task deleted successfully"
        route={onClose}
      />
    ),
    [ModalType.ADD_CONTRACT_TASK]: (
      <AddContractTask
        onClose={onClose}
        isUpdate={false}
        onSuccess={handleTaskSuccess}
        onUpdateSuccess={handleTaskUpdateSuccess}
      />
    ),
    [ModalType.UPDATE_ADD_CONTRACT_TASK]: (
      <AddContractTask
        onClose={onClose}
        isUpdate={true}
        onSuccess={handleTaskSuccess}
        onUpdateSuccess={handleTaskUpdateSuccess}
      />
    ),
    [ModalType.READ_CONTRACT_TASK_DETAIL]: (
      <ContractTaskDetail
        onClose={onClose}
        onDelete={handleDelete}
        onEditTask={handleUpdateTask}
      />
    ),

    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading="Are you sure you want to delete this event?"
        routeHandler={handleDeleteContractTask}
        loading={loading}
      />
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
