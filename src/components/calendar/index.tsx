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
import { calendarDayDateFormat, calendarYearDateFormat } from "@/utils/utility";
import { DayView } from "./day-view";
import { AllDayEvent } from "./all-day-event";
import { useCalendar } from "@/hooks/calendar/useCalendar";

const Moment = extendMoment(moment as any);
type ViewType = "timeGridDay" | "timeGridWeek" | "dayGridMonth";

export const Calendar = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const calendarRef = useRef<FullCalendar>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<ViewType>("timeGridDay");
  const { handleAddContractTask, renderModal } = useCalendar();

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

  const events = [
    {
      title: "Customer call",
      start: "2024-08-21T10:30:00",
      end: "2024-08-21T11:30:00",
      backgroundColor: "#E9F0FF",
      textColor: "#4A13E7",
      borderColor: "red",
      allDay: true,
    },
    {
      title: "Customer call",
      start: "2024-08-21T10:30:00",
      end: "2024-08-21T11:30:00",
      backgroundColor: "#E9FFEF",
      textColor: "#45C769",
      borderColor: "red",
      allDay: true,
    },
    {
      title:
        "Call customer lorem ipsum dollar smiht emit lorem ipsum dolar ipsum lorem ip.",
      start: "2024-08-21T10:30:00",
      end: "2024-08-21T11:30:00",
      backgroundColor: "#E9FFEF",
      textColor: "purple",
      borderColor: "red",
      allDay: true,
    },
    {
      title: "Customer call",
      start: "2024-08-21T10:30:00",
      end: "2024-08-21T11:30:00",
      backgroundColor: "#E9FFEF",
      textColor: "orange",
      borderColor: "red",
      allDay: true,
    },
    {
      title: "Customer call",
      start: "2024-08-21T10:30:00",
      end: "2024-08-21T11:30:00",
      backgroundColor: "#E9FFEF",
      textColor: "#45C769",
      borderColor: "red",
      allDay: true,
    },
    {
      title: "Customer call",
      start: "2024-08-21T10:30:00",
      end: "2024-08-21T11:30:00",
      backgroundColor: "#E9FFEF",
      textColor: "#45C769",
      borderColor: "red",
      allDay: true,
    },
    {
      title: "Urgent call",
      start: "2024-08-20T13:30:00",
      end: "2024-08-20T15:30:00",
      backgroundColor: "orange",
      textColor: "red",
      borderColor: "purple",
    },
    {
      title: "Urgent call",
      start: "2024-08-21T10:30:00",
      end: "2024-08-21T11:30:00",
      backgroundColor: "#cfcfcf",
      textColor: "red",
      borderColor: "orange",
    },
    {
      title: "Urgent call",
      start: "2024-0806:30:00",
      end: "2024-08-11T08:30:00",
      backgroundColor: "orange",
      textColor: "red",
      borderColor: "black",
    },
    {
      title: "Urgent call",
      start: "2024-08-16T09:30:00",
      end: "2024-08-16T11:30:00",
      backgroundColor: "orange",
      allDay: true,
      textColor: "red",
      borderColor: "red",
    },
    {
      title: "Urgent call",
      start: "2024-08-15T10:30:00",
      end: "2024-08-15T11:30:00",
      backgroundColor: "orange",
      textColor: "red",
      borderColor: "black",
    },
  ];

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

  return (
    <div className="mb-5">
      <div className="flex item-center justify-between mb-[28px]">
        <h1 className="text-[#202020] font-semibold text-2xl xlg:text-[36px] mt-6">
          {translate("calendar.main_heading")}
        </h1>

        <Button
          onClick={handleAddContractTask}
          className="!h-fit py-2 px-[34px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap mt-6"
          text={translate("calendar.add_task")}
          id="add task"
          inputType="button"
          iconAlt="button"
        />
      </div>

      <div className="p-6 bg-white rounded-t-lg flex items-center justify-between">
        <div>
          <span className="text-[#393939] text-2xl font-medium">
            {currentDate.split(",")[0]}
          </span>
          {currentDate.includes(",") && (
            <>
              {", "}
              <span className="text-[#393939] text-xl font-light">
                {currentDate.split(",")[1]}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center w-fit p-[6px] rounded-full bg-[#F6F6F6]">
          <div className="flex items-center gap-x-5">
            {tabs.map((tab, index) => (
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

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        events={events}
        headerToolbar={false}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        dateClick={(arg) => alert("Date clicked: " + arg.dateStr)}
        eventClick={(info) => alert("Event clicked: " + info.event.title)}
        editable={false}
        selectable={true}
        dayMaxEvents={true}
        height="auto"
        aspectRatio={1.5}
        views={{
          timeGridDay: {
            dayMaxEvents: 6,
          },
          dayGridMonth: {
            dayMaxEvents: true,
          },
          timeGridWeek: {
            dayMaxEvents: true,
          },
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        eventContent={(eventInfo) => {
          const { event, view } = eventInfo;
          const viewType = view.type;

          if (event.allDay) {
            return (
              <AllDayEvent
                title={event.title}
                backrgoundColour={eventInfo.event.backgroundColor}
                dotColour={eventInfo.event.textColor}
              />
            );
          } else if (
            viewType === "timeGridDay" ||
            viewType === "timeGridWeek"
          ) {
            const formattedTime = `${moment(eventInfo.event.start).format(
              "HH:mm"
            )} - ${moment(eventInfo.event.end).format("HH:mm")}`;
            return (
              <DayView
                time={formattedTime}
                title={eventInfo.event.title}
                backrgoundColour={eventInfo.event.backgroundColor}
                borderColour={eventInfo.event.borderColor}
                timeColour={eventInfo.event.textColor}
              />
            );
          } else if (viewType === "dayGridMonth") {
            return (
              <AllDayEvent
                title={event.title}
                backrgoundColour={eventInfo.event.backgroundColor}
                dotColour={eventInfo.event.textColor}
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

          // Only apply the specific styling to all-day events in the timeGridDay view
          if (info.event.allDay && viewType === "timeGridDay") {
            info.el.style.display = "inline-block";
            // info.el.style.width = "270px";
            info.el.style.overflow = "hidden";
            info.el.style.textOverflow = "ellipsis";
            info.el.style.whiteSpace = "nowrap";
            info.el.style.border = "none";
            info.el.style.boxShadow = "none";
          }

          // Ensure the width is not applied in other views like dayGridMonth
          if (viewType === "dayGridMonth" || viewType === "timeGridWeek") {
            info.el.style.width = "auto"; // Reset the width to auto for month view events
            info.el.style.display = "block"; // Ensure proper display style for month view
          }
        }}
      />

      {renderModal()}
    </div>
  );
};
