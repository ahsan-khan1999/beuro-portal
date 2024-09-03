import React, { useEffect, useMemo, useState } from "react";
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
import { Task } from "@/types/contract";
import { ContractTaskDetail } from "@/base-components/ui/modals1/ContractTaskDetail";
import { CustomerPromiseActionType } from "@/types/company";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { CalendarRemainderAlert } from "@/base-components/ui/modals1/CalendarRemainderAlert";
import moment from "moment";

export const useCalendar = () => {
  const { loading, task } = useAppSelector((state) => state.contract);
  const [reminderEvents, setReminderEvents] = useState<Task[]>([]);
  const [triggeredReminders, setTriggeredReminders] = useState<Set<string>>(
    new Set()
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
  }, [dispatch]);

  const events = useMemo(() => {
    return task?.flatMap((task: Task) =>
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

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const now = moment();
      const upcomingReminders: Task[] = [];

      for (const currentTask of task || []) {
        for (const dateRange of currentTask?.date || []) {
          const eventStart = moment(dateRange?.startDate);
          const reminderTime = currentTask?.alertTime;

          const reminderTriggerTime = eventStart
            .clone()
            .subtract(reminderTime, "minutes");

          if (
            now.isSameOrAfter(reminderTriggerTime) &&
            now.isBefore(eventStart) &&
            now.diff(reminderTriggerTime, "seconds") < 1 &&
            !triggeredReminders.has(currentTask?.id)
          ) {
            setTriggeredReminders((prev) => new Set(prev).add(currentTask?.id));

            const audio = new Audio("/audio/remainder-tone.mp3");
            audio.play();

            const res = await dispatch(
              readContractTaskDetail({ params: { filter: currentTask?.id } })
            );
            if (res?.payload) {
              upcomingReminders.push(res?.payload);
            }
          }
        }
      }

      if (upcomingReminders?.length > 0) {
        setReminderEvents(upcomingReminders);
        dispatch(updateModalType({ type: ModalType.TASK_REMAINDER }));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [task, triggeredReminders, dispatch]);

  const tabs = [
    { view: "timeGridDay", label: `${translate("calendar.tab_headings.day")}` },
    {
      view: "timeGridWeek",
      label: `${translate("calendar.tab_headings.week")}`,
    },
    {
      view: "dayGridMonth",
      label: `${translate("calendar.tab_headings.month")}`,
    },
  ];

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
    [ModalType.TASK_REMAINDER]: (
      <>
        {reminderEvents?.map((event) => (
          <CalendarRemainderAlert
            key={event.id}
            onClose={onClose}
            remainderAlert={event}
            onUpdateSuccess={handleTaskUpdateSuccess}
            onContractDetail={handleContractTaskDetail}
          />
        ))}
      </>
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    tabs,
    renderModal,
    loading,
    handleAddContractTask,
    task,
    events,
    handleContractTaskDetail,
  };
};
