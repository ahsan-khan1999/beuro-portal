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
import { useRouter } from "next/router";
import { FiltersDefaultValues } from "@/enums/static";
import { FilterType } from "@/types";
import { setImages } from "@/api/slices/imageSlice/image";
import { DocumentViewerModal } from "@/base-components/ui/modals1/DocumentViewer";

export const useCalendar = () => {
  const { loading, task } = useAppSelector((state) => state.contract);
  const [reminderEvents, setReminderEvents] = useState<Task[]>([]);
  const [triggeredReminders, setTriggeredReminders] = useState<Set<string>>(
    new Set()
  );

  const [filter, setFilter] = useState<FilterType>({
    text: FiltersDefaultValues.None,
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { isContractId } = router.query;
  const { modal } = useAppSelector((state) => state.global);
  const [currentTask, setCurrentTask] = useState<Task[]>(task || []);

  useEffect(() => {
    if (!isContractId) {
      localStoreUtil.remove_data("task");
      dispatch(setContractTaskDetails(DEFAULT_CONTRACT_TASK));
    }
  }, [isContractId]);

  useEffect(() => {
    const searchQuery = router.query?.text as string;
    let updatedFilter = searchQuery ? { text: searchQuery } : {};

    setFilter(updatedFilter);

    dispatch(
      readContractTasks({
        params: { filter: updatedFilter, paginate: 0 },
      })
    ).then((response: any) => {
      if (response?.payload) {
        setCurrentTask(response?.payload?.data?.Task);
      }
    });
  }, [router.query]);

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

  const handleFilterChange = () => {
    console.log("filtered resutls");
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const onCloseSecond = () => {
    dispatch(updateModalType({ type: ModalType.READ_CONTRACT_TASK_DETAIL }));
  };

  const handleAddContractTask = () => {
    if (!isContractId) {
      dispatch(setContractTaskDetails(DEFAULT_CONTRACT_TASK));
    }
    dispatch(updateModalType({ type: ModalType.ADD_CONTRACT_TASK }));
  };

  const handleContractTaskDetail = (
    taskID: string,
    clickedStartDate: string,
    clickedEndDate: string
  ) => {
    dispatch(readContractTaskDetail({ params: { filter: taskID } })).then(
      (res: CustomerPromiseActionType) => {
        if (res?.payload) {
          dispatch(
            setContractTaskDetails({
              ...res.payload,
              selectedStartDate: clickedStartDate,
              selectedEndDate: clickedEndDate,
            })
          );
        }
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

  const handleUpdateTask = (
    id: string,
    clickedStartDate?: string,
    clickedEndDate?: string
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.UPDATE_ADD_CONTRACT_TASK,
        data: {
          id: id,
          clickedStartDate: clickedStartDate,
          clickedEndDate: clickedEndDate,
        },
      })
    );
  };

  // const handleImageSlider = () => {
  //   dispatch(updateModalType({ type: ModalType.CREATION }));
  // };

  const handleViewImages = async (
    id: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();
    dispatch(setImages([]));

    dispatch(
      updateModalType({
        type: ModalType.UPLOAD_OFFER_IMAGE,
        data: { contractID: id },
      })
    );
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.task_created_successfully")}
        route={onClose}
      />
    ),
    [ModalType.TASK_UPDATED_SUCCESS]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        // subHeading={translate("common.modals.task_updated_successfully")}
        route={onClose}
      />
    ),
    [ModalType.IMAGE_UPDATED_SUCCESS]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.images_updated")}
        // subHeading={translate("common.modals.images_updated_des")}
        route={onClose}
      />
    ),
    [ModalType.CONFIRM_DELETION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        // subHeading={translate("common.modals.task_deleted_successfully")}
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
        handleViewImages={handleViewImages}
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("calendar.delete_appointment_des")}
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
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <DocumentViewerModal onClose={onCloseSecond} />
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
    filter,
    setFilter,
    dispatch,
    handleFilterChange,
  };
};
