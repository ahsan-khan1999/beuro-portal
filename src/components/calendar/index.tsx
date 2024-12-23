import "moment/locale/de";
import moment from "moment";
import { DayView } from "./day-view";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/base-components/ui/button/button";
import { CalendarTab } from "@/base-components/ui/tab/calendarTab";
import { useTranslation } from "next-i18next";
import { CalendarApi } from "@fullcalendar/core";
import { ActionsTab } from "@/base-components/ui/tab/actions-tab";
import { extendMoment } from "moment-range";
import { AllDayEvent } from "./all-day-event";
import { useCalendar } from "@/hooks/calendar/useCalendar";
import { DayHeaderContent } from "./day-header-content";
import { CalendarFilters } from "./calendar-filters";
import { useIsSmallScreen, useIsSmallWeekScreen } from "@/utils/functions";
import {
  calendarDayDateFormat,
  calendarYearDateFormat,
  hasTime,
} from "@/utils/utility";
import { useAppSelector } from "@/hooks/useRedux";
import { Task } from "@/types/contract";
import { AddContractTask } from "@/base-components/ui/modals1/AddTask";

const Moment = extendMoment(moment as any);
type ViewType = "timeGridDay" | "timeGridWeek" | "dayGridMonth" | "dayGridWeek";

type EventType = {
  start: string;
  end: string;
  allDay?: boolean;
  [key: string]: any;
};

const prepareEvents = (rawEvents: EventType[]): EventType[] => {
  return rawEvents.map((event) => {
    const startDate = moment(event.start);
    const endDate = moment(event.end);

    if (
      endDate.diff(startDate, "days") > 0 &&
      (hasTime(startDate) || hasTime(endDate))
    ) {
      event.allDay = true;
      event.extendedProps = {
        ...event.extendedProps,
        originalStart: event.start,
        originalEnd: event.end,
      };

      event.start = startDate.format("YYYY-MM-DD HH:mm");
      event.end = endDate.add(1, "days").format("YYYY-MM-DD HH:mm");
    } else {
      event.allDay = !hasTime(startDate);
    }

    return event;
  });
};

export const Calendar = () => {
  const { t: translate } = useTranslation();
  const calendarRef = useRef<FullCalendar>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [moreModalDate, setMoreModalDate] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<ViewType>("timeGridDay");
  const isSmallScreen = useIsSmallScreen(); // 1100px check
  const isSmallWeekScreen = useIsSmallWeekScreen(); // 768px check
  const { currentLanguage } = useAppSelector((state) => state.global);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    events: rawEvents,
    handleContractTaskDetail,
    renderModal,
    tabs,
    router,
    filter,
    setFilter,
    handleFilterChange,
    handleMoreTasks,
    handleTaskUpdateSuccess,
    handleTaskSuccess,
    dispatch,
    setContractTaskDetails,
    DEFAULT_CONTRACT_TASK,
    isModal,
    setIsModal,
    isContractId,
    handleClickedOutSide,
  } = useCalendar();

  const events = prepareEvents(rawEvents);

  const isEditTask = router.query.isUpdateTask;

  useEffect(() => {
    if (isContractId) {
      handleAddContractTask();
    }
  }, [isContractId]);

  const handleAddContractTask = () => {
    if (!isContractId) {
      dispatch(setContractTaskDetails(DEFAULT_CONTRACT_TASK));
    }

    setIsModal(!isModal);
  };

  const updateDateDisplay = (date: Date, viewType: ViewType) => {
    let formattedDate = "";
    if (viewType === "timeGridDay") {
      const currentDate = calendarDayDateFormat(
        date.toString(),
        router.locale as string
      );
      formattedDate = currentDate;
    } else if (viewType === "timeGridWeek" || viewType === "dayGridWeek") {
      const range = Moment.range(
        moment(date).startOf("week"),
        moment(date).endOf("week")
      );
      formattedDate = `${range.start.format("DD")} - ${range.end.format(
        "DD MMMM, YYYY"
      )}`;
    } else if (viewType === "dayGridMonth") {
      formattedDate = calendarYearDateFormat(
        date.toString(),
        router.locale as string
      );
    }
    setCurrentDate(formattedDate);

    const currentDate = calendarDayDateFormat(
      date.toString(),
      router.locale as string
    );
    formattedDate = currentDate;

    setMoreModalDate(formattedDate);
  };

  const switchView = (viewType: ViewType) => {
    if (calendarRef.current) {
      const calendarApi: CalendarApi = calendarRef.current.getApi();

      if (viewType === "timeGridWeek" && isSmallScreen) {
        calendarApi.changeView("dayGridWeek" as any);
      } else {
        calendarApi.changeView(viewType);
      }

      setSelectedTab(viewType);
      updateDateDisplay(calendarApi.getDate(), viewType);
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi: CalendarApi = calendarRef.current.getApi();

      if (selectedTab === "timeGridWeek") {
        if (isSmallScreen) {
          calendarApi.changeView("dayGridWeek");
        } else {
          calendarApi.changeView("timeGridWeek");
        }
      }
    }
  }, [isSmallScreen, selectedTab]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      updateDateDisplay(calendarApi.getDate(), selectedTab);
    }
  }, [selectedTab]);

  useEffect(() => {
    moment.locale(router.locale as string);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      updateDateDisplay(calendarApi.getDate(), selectedTab);
    }
  }, [router.locale]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const defaultModal = document.querySelector(".fc-more-popover");
      if (defaultModal) {
        defaultModal.remove();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isEditTask === "true") {
      setIsModal(true);
    }
  }, [router.query]);

  const handlePrviousClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      updateDateDisplay(calendarApi.getDate(), selectedTab);
    }
  };

  const handleNextClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      updateDateDisplay(calendarApi.getDate(), selectedTab);
    }
  };

  const getDayMaxEvents = () => {
    return isSmallScreen ? 2 : true;
  };

  const calculateEventDates = (event: any) => {
    const originalStart = moment(
      event.extendedProps?.originalStart || event.start
    );
    const originalEnd = moment(event.extendedProps?.originalEnd || event.end);
    const isAllDay = event.allDay;
    const isMultiDayEvent = originalStart.isBefore(originalEnd, "day");
    const hasStartTime = originalStart.format("HH:mm") !== "00:00";

    let clickedStartDate, clickedEndDate;

    if (isMultiDayEvent && hasStartTime) {
      clickedStartDate = originalStart.toISOString();
      clickedEndDate = originalEnd
        ? originalEnd.toISOString()
        : clickedStartDate;
    } else if (isAllDay) {
      clickedStartDate = originalStart.format("YYYY-MM-DD");
      clickedEndDate = originalEnd
        ? originalEnd.format("YYYY-MM-DD")
        : clickedStartDate;
    } else {
      clickedStartDate = originalStart.toISOString();
      clickedEndDate = originalEnd
        ? originalEnd.toISOString()
        : clickedStartDate;
    }

    return { clickedStartDate, clickedEndDate };
  };

  return (
    <div className="mb-5">
      <div className="flex item-center justify-between xMini:mb-[28px]">
        <h1 className="text-[#202020] font-semibold text-xl xMini:text-2xl xlg:text-[36px] xMini:mt-6">
          {translate("calendar.main_heading")}
        </h1>

        <div className="flex items-center gap-x-4 xMini:mt-6">
          <div className="hidden xMini:block">
            <CalendarFilters
              filter={filter}
              setFilter={setFilter}
              handleFilterChange={handleFilterChange}
            />
          </div>

          <Button
            onClick={handleAddContractTask}
            className="!h-fit py-2 px-4 xMini:px-[34px] flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap"
            text={translate("calendar.add_task")}
            id="add task"
            inputType="button"
            iconAlt="button"
          />
        </div>
      </div>
      <div className="block my-4 w-full xMini:hidden">
        <CalendarFilters
          filter={filter}
          setFilter={setFilter}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <div className="p-4 xMini:p-6 bg-white rounded-t-lg flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#393939] text-xs xMini:text-base mlg:text-2xl font-medium">
              {currentDate.split(",")[0]}
            </span>
            {currentDate.includes(",") && (
              <>
                {", "}
                <span className="text-[#393939] text-xs xMini:text-base mlg:text-xl font-light">
                  {currentDate.split(",")[1]}
                </span>
              </>
            )}
          </div>

          <div className="hidden mlg:flex items-center w-fit p-[6px] rounded-full bg-[#F6F6F6]">
            <div className="flex items-center gap-x-5">
              {tabs?.map((tab, index) => (
                <CalendarTab
                  key={tab.view}
                  heading={tab.label}
                  isSelected={selectedTab === tab.view}
                  selectedTab={index}
                  setTabType={() => switchView(tab.view as ViewType)}
                />
              ))}
            </div>
          </div>

          <ActionsTab
            previousClick={handlePrviousClick}
            nextClick={handleNextClick}
            heading={translate("calendar.today")}
          />
        </div>
        <div className="flex mlg:hidden items-center justify-center w-fit p-[6px] rounded-full bg-[#F6F6F6] mx-auto">
          <div className="flex items-center gap-x-3 xMini:gap-x-5">
            {tabs?.map((tab, index) => (
              <CalendarTab
                key={tab.view}
                heading={tab.label}
                isSelected={selectedTab === tab.view}
                selectedTab={index}
                setTabType={() => switchView(tab.view as ViewType)}
              />
            ))}
          </div>
        </div>
      </div>

      {isModal && (
        <AddContractTask
          isUpdate={isEditTask ? true : false}
          onSuccess={handleTaskSuccess}
          onUpdateSuccess={handleTaskUpdateSuccess}
          onIsModal={setIsModal}
          onClose={handleClickedOutSide}
        />
      )}

      <FullCalendar
        locale={currentLanguage}
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={selectedTab}
        events={events}
        slotEventOverlap={false}
        headerToolbar={false}
        dayHeaderContent={(arg) =>
          DayHeaderContent(arg, isSmallScreen, isSmallWeekScreen)
        }
        allDayText={translate("calendar.all_day")}
        slotLabelContent={(arg) => (
          <>
            {arg.date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </>
        )}
        firstDay={1}
        moreLinkText={translate("calendar.more_text")}
        moreLinkClick={(info) => {
          info.jsEvent.preventDefault();
          info.jsEvent.stopPropagation();

          setIsModalOpen(true);

          const moreTasks: Task[] = info.allSegs.map((seg) => {
            const event = seg.event;
            const { clickedStartDate, clickedEndDate } =
              calculateEventDates(event);

            const startMoment = moment(
              event.extendedProps?.originalStart || event.start
            );

            const formattedStartTime = startMoment.format("HH:mm");
            const hasStartTime = startMoment.format("HH:mm") !== "00:00";

            return {
              id: event.extendedProps?.id || event.id || "",
              taskID: event.extendedProps.taskID || "",
              isContrcatCreated: event.extendedProps.isContrcatCreated || false,
              title: event.title || "",
              date: [
                {
                  startDate: event.start?.toISOString() || "",
                  endDate: event.end?.toISOString() || "",
                },
              ],
              isAllDay: event.allDay || false,
              colour: event.backgroundColor || "",
              createdAt: event.extendedProps.createdAt || "",
              type: event.extendedProps.type || "",
              contractID: event.extendedProps.contractID || "",
              formattedStartTime,
              hasStartTime,
              clickedStartDate,
              clickedEndDate,
            };
          });

          handleMoreTasks(moreTasks, moreModalDate);
        }}
        eventClick={(info) => {
          setIsModalOpen(false);
          const taskID = info.event.extendedProps.taskID;

          const { clickedStartDate, clickedEndDate } = calculateEventDates(
            info.event
          );

          handleContractTaskDetail(taskID, clickedStartDate, clickedEndDate);
        }}
        editable={false}
        selectable={true}
        dayMaxEvents={getDayMaxEvents()}
        height={isSmallScreen ? "auto" : "auto"}
        aspectRatio={isSmallScreen ? 0.75 : 1.5}
        views={{
          timeGridDay: {
            dayMaxEvents: getDayMaxEvents(),
          },
          dayGridWeek: {
            dayMaxEvents: 12,
          },
          timeGridWeek: {
            dayMaxEvents: 4,
          },
          dayGridMonth: {
            dayMaxEvents: isSmallScreen ? 2 : 5,
          },
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        eventContent={(eventInfo) => {
          const { event, view } = eventInfo;
          const viewType = view?.type;

          const startMoment = moment(
            event.extendedProps?.originalStart || event.start
          );

          const endMoment = moment(
            event.extendedProps?.originalEnd || event.end
          );

          const formattedStartTime = startMoment.format("HH:mm");
          const formattedEndTime = endMoment.format("HH:mm");
          const duration = endMoment.diff(startMoment, "minutes");
          const daysDuration = endMoment.diff(startMoment, "days");
          const isValidEndDate = formattedEndTime !== "Invalid date";
          const hasStartTime = startMoment.format("HH:mm") !== "00:00";

          const formattedTime =
            formattedEndTime && isValidEndDate
              ? `${formattedStartTime} - ${formattedEndTime}`
              : `${formattedStartTime}`;

          const showEndTime = daysDuration > 0;
          const showOnlyTitle = duration < 60;
          const fixedHeight = duration < 15;

          if (viewType === "dayGridMonth") {
            if (isSmallScreen) {
              return (
                <DayView
                  showEndTime={showEndTime}
                  startTime={formattedStartTime}
                  time={formattedTime}
                  title={event.title}
                  backrgoundColour={event.backgroundColor}
                  borderColour={event.borderColor}
                  timeColour={event.textColor}
                  isMonthView={true}
                  showOnlyTitle={showOnlyTitle}
                  fixedHeight={fixedHeight}
                  hasStartTime={hasStartTime}
                />
              );
            } else {
              return (
                <AllDayEvent
                  title={event?.title}
                  showEndTime={showEndTime}
                  startTime={formattedStartTime}
                  endTime={formattedEndTime}
                  backrgoundColour={event.backgroundColor}
                  dotColour={event.textColor}
                  hasStartTime={hasStartTime}
                />
              );
            }
          } else if (event?.allDay) {
            return (
              <AllDayEvent
                title={event?.title}
                backrgoundColour={event.backgroundColor}
                dotColour={event.textColor}
                viewType={viewType}
              />
            );
          } else if (
            viewType === "timeGridDay" ||
            viewType === "timeGridWeek"
          ) {
            return (
              <DayView
                time={formattedTime}
                title={event.title}
                backrgoundColour={event.backgroundColor}
                borderColour={event.borderColor}
                timeColour={event.textColor}
                showOnlyTitle={showOnlyTitle}
                fixedHeight={fixedHeight}
              />
            );
          } else if (viewType === "dayGridWeek") {
            return (
              <DayView
                time={formattedTime}
                title={eventInfo.event.title}
                backrgoundColour={eventInfo.event.backgroundColor}
                borderColour={eventInfo.event.borderColor}
                timeColour={eventInfo.event.textColor}
                isMonthView={false}
                showOnlyTitle={showOnlyTitle}
                fixedHeight={fixedHeight}
                isWeekView={true}
              />
            );
          } else {
            return null;
          }
        }}
        eventDidMount={(info) => {
          const viewType = info.view.type;

          const containerEl = document.querySelector(".fc-daygrid-day-events");

          const currentDay = document.querySelectorAll(
            ".fc-daygrid-day-number"
          );

          const currentDayBorder = document.querySelectorAll(
            ".fc-daygrid-day-frame"
          );

          if (viewType === "dayGridMonth") {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const todayDate = currentDate.getDate();

            currentDay.forEach((element, index) => {
              const dayEl = element.closest(".fc-daygrid-day");
              const dataDate = dayEl?.getAttribute("data-date");

              if (dataDate) {
                const date = new Date(dataDate);
                if (
                  date.getDate() === todayDate &&
                  date.getMonth() === currentMonth &&
                  date.getFullYear() === currentYear
                ) {
                  element.classList.add("currentDay");

                  if (currentDayBorder[index]) {
                    currentDayBorder[index].classList.add("currentDayBorder");
                  }
                } else {
                  if (currentDayBorder[index]) {
                    currentDayBorder[index].classList.remove(
                      "currentDayBorder"
                    );
                  }
                }
              }
            });
          }

          const currentFullDate = new Date().toISOString().split("T")[0];
          const columnHeaders = document.querySelectorAll("th[data-date]");

          columnHeaders.forEach((header) => {
            const headerDate = header.getAttribute("data-date");
            if (
              headerDate === currentFullDate &&
              (document.querySelector(".fc-timeGridWeek-view") ||
                document.querySelector(".fc-dayGridWeek-view"))
            ) {
              const innerElement = header.querySelector(
                ".fc-scrollgrid-sync-inner"
              );
              if (innerElement) {
                innerElement.classList.add("currentWeekDay");
              }
            } else {
              const innerElement = header.querySelector(
                ".fc-scrollgrid-sync-inner"
              );
              if (innerElement) {
                innerElement.classList.remove("currentWeekDay");
              }
            }
          });

          if (viewType === "timeGridDay" && containerEl) {
            containerEl.classList.add("timeGridDay-flex");
          } else if (containerEl) {
            containerEl.classList.remove("timeGridDay-flex");
          }

          if (info.event.allDay && viewType === "timeGridDay") {
            info.el.style.display = "inline-block";
            info.el.style.overflow = "hidden";
            info.el.style.textOverflow = "ellipsis";
            info.el.style.whiteSpace = "nowrap";
            info.el.style.border = "none";
            info.el.style.boxShadow = "none";
          }

          if (
            viewType === "dayGridMonth" ||
            viewType === "timeGridWeek" ||
            viewType === "dayGridWeek"
          ) {
            info.el.style.width = "auto";
            info.el.style.display = "block";
          }

          if (isModalOpen) {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }
        }}
      />

      {renderModal()}
    </div>
  );
};
