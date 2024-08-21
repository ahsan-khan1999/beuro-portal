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
import { calendarDateFormat } from "@/utils/utility";

const Moment = extendMoment(moment as any);

type ViewType = "timeGridDay" | "timeGridWeek" | "dayGridMonth";

export const Calendar = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const calendarRef = useRef<FullCalendar>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<ViewType>("timeGridDay");

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
      const currentDate = calendarDateFormat(
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
      formattedDate = moment(date).format("MMMM YYYY");
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
      title: "Conference",
      start: "2024-08-20T00:00:00", // All-day event
      allDay: true,
    },
    {
      title: "Meeting",
      start: "2024-08-20T10:30:00",
      end: "2024-08-20T12:30:00",
    },
    {
      title: "Meeting",
      start: "2024-08-20T10:30:00",
      end: "2024-08-20T12:30:00",
    },
    {
      title: "Meeting",
      start: "2024-08-20T10:30:00",
      end: "2024-08-20T12:30:00",
    },
    {
      title: "Lunch",
      start: "2024-08-20T12:00:00",
      allDay: true,
    },
    {
      title: "Meeting",
      start: "2024-08-20T14:30:00",
    },
    {
      title: "Happy Hour",
      start: "2024-08-20T17:30:00",
      allDay: true,
    },
    {
      title: "Dinner",
      start: "2024-08-20T20:00:00",
    },
  ];

  return (
    <div className="mb-5">
      <div className="flex item-center justify-between mb-[28px]">
        <h1 className="text-[#202020] font-semibold text-2xl xlg:text-[36px] mt-6">
          {translate("calendar.main_heading")}
        </h1>

        <Button
          onClick={() => {}}
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
          previousClick={() => {
            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi();
              calendarApi.prev();
              updateDateDisplay(calendarApi.getDate(), selectedTab);
            }
          }}
          nextClick={() => {
            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi();
              calendarApi.next();
              updateDateDisplay(calendarApi.getDate(), selectedTab);
            }
          }}
          heading="Today"
        />
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        events={events}
        headerToolbar={false}
        dateClick={(arg) => alert("Date clicked: " + arg.dateStr)}
        eventClick={(info) => alert("Event clicked: " + info.event.title)}
        editable={true}
        selectable={true}
        dayMaxEvents={true}
        height="auto"
        aspectRatio={1.5}
      />
    </div>
  );
};
