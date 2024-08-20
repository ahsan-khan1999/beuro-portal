import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export const Calendar = () => {
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
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          left: "title", // Move the date (title) to the left
          center: "timeGridDay,timeGridWeek,dayGridMonth", // Center the day, week, and month view buttons
          right: "prev,next", // Align the prev/next buttons to the right
        }}
        events={events}
        dateClick={(arg) => alert("Date clicked: " + arg.dateStr)}
        eventClick={(info) => alert("Event clicked: " + info.event.title)}
        editable={true}
        selectable={true}
        dayMaxEvents={true}
        height="auto"
        aspectRatio={1.5}
        views={{
          timeGridDay: {
            buttonText: "Today",
            slotLabelFormat: {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            },
          },
          timeGridWeek: {
            buttonText: "Week",
            slotLabelFormat: {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            },
          },
          dayGridMonth: { buttonText: "Month" },
        }}
      />
    </div>
  );
};
