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
import "moment/locale/de";
import moment from "moment";
import { extendMoment } from "moment-range";
import { useRouter } from "next/router";
import { DayView } from "./day-view";
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

const Moment = extendMoment(moment as any);
type ViewType = "timeGridDay" | "timeGridWeek" | "dayGridMonth";

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
    } else {
      event.allDay = !hasTime(startDate);
    }

    return event;
  });
};

export const Calendar = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const calendarRef = useRef<FullCalendar>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<ViewType>("timeGridDay");
  const isSmallScreen = useIsSmallScreen(); // 1100px check
  const isSmallWeekScreen = useIsSmallWeekScreen(); // 768px check

  const {
    events: rawEvents,
    handleAddContractTask,
    handleContractTaskDetail,
    renderModal,
    tabs,
    filter,
    setFilter,
    handleFilterChange,
  } = useCalendar();

  const events = prepareEvents(rawEvents);

  useEffect(() => {
    if (router.query.isContractId) {
      handleAddContractTask();
    }
  }, [router.query.isContractId]);

  const updateDateDisplay = (date: Date, viewType: ViewType) => {
    let formattedDate = "";

    if (viewType === "timeGridDay") {
      const currentDate = calendarDayDateFormat(
        date.toString(),
        router.locale as string
      );

      formattedDate = currentDate;
    } else if (viewType === "timeGridWeek") {
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
  };

  const switchView = (viewType: any) => {
    if (calendarRef.current) {
      const calendarApi: CalendarApi = calendarRef.current.getApi();
      calendarApi.changeView(viewType);
      setSelectedTab(viewType);
      updateDateDisplay(calendarApi.getDate(), viewType);
    }
  };

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
            className="!h-fit py-2 px-4 xMini:px-[34px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
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
                  setTabType={() => switchView(tab.view)}
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
                setTabType={() => switchView(tab.view)}
              />
            ))}
          </div>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={isSmallScreen ? "dayGridMonth" : "timeGridDay"}
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
        eventClick={(info) => {
          const taskID = info.event.extendedProps.taskID;
          const isAllDay = info.event.allDay;

          const originalStart = moment(
            info.event.extendedProps.originalStart || info.event.start
          );

          const originalEnd = moment(
            info.event.extendedProps.originalEnd || info.event.end
          );

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
          timeGridWeek: {
            dayMaxEvents: getDayMaxEvents(),
          },
          dayGridMonth: {
            dayMaxEvents: getDayMaxEvents(),
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

          const startMoment = moment(eventInfo.event.start);
          const endMoment = moment(eventInfo.event.end);
          const duration = endMoment.diff(startMoment, "minutes");

          const formattedTime = event?.end
            ? `${moment(eventInfo.event.start).format("HH:mm")} - ${moment(
                eventInfo.event.end
              ).format("HH:mm")}`
            : `${moment(eventInfo.event.start).format("HH:mm")}`;

          const showOnlyTitle = duration < 60;
          const fixedHeight = duration < 1;

          if (viewType === "dayGridMonth") {
            if (isSmallScreen) {
              return (
                <DayView
                  time={formattedTime}
                  title={eventInfo.event.title}
                  backrgoundColour={eventInfo.event.backgroundColor}
                  borderColour={eventInfo.event.borderColor}
                  timeColour={eventInfo.event.textColor}
                  isMonthView={true}
                  showOnlyTitle={showOnlyTitle}
                  fixedHeight={fixedHeight}
                />
              );
            } else {
              return (
                <AllDayEvent
                  title={event?.title}
                  backrgoundColour={eventInfo.event.backgroundColor}
                  dotColour={eventInfo.event.textColor}
                />
              );
            }
          } else if (event?.allDay) {
            return (
              <AllDayEvent
                title={event?.title}
                backrgoundColour={eventInfo.event.backgroundColor}
                dotColour={eventInfo.event.textColor}
              />
            );
          } else if (
            viewType === "timeGridDay" ||
            viewType === "timeGridWeek"
          ) {
            return (
              <DayView
                time={formattedTime}
                title={eventInfo.event.title}
                backrgoundColour={eventInfo.event.backgroundColor}
                borderColour={eventInfo.event.borderColor}
                timeColour={eventInfo.event.textColor}
                showOnlyTitle={showOnlyTitle}
                fixedHeight={fixedHeight}
              />
            );
          } else {
            return null;
          }
        }}
        eventDidMount={(info) => {
          const viewType = info.view.type;
          const containerEl = document.querySelector(".fc-daygrid-day-events");

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

          if (viewType === "dayGridMonth" || viewType === "timeGridWeek") {
            info.el.style.width = "auto";
            info.el.style.display = "block";
          }
        }}
      />

      {renderModal()}
    </div>
  );
};
