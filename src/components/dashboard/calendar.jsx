// import "@fullcalendar/core/vdom";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@/base-components/calendar/Main";

function MainCalender() {
  const options = {
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin],
    droppable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialDate: "2023-01-01",
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    events: [
      {
        title: "Vue Vixens Day",
        start: "2023-01-05",
        end: "2023-01-08",
      },
      {
        title: "VueConfUS",
        start: "2023-01-11",
        end: "2023-01-15",
      },
      {
        title: "VueJS Amsterdam",
        start: "2023-01-17",
        end: "2023-01-21",
      },
      {
        title: "Vue Fes Japan 2019",
        start: "2023-01-21",
        end: "2023-01-24",
      },
      {
        title: "Laracon 2023",
        start: "2023-01-24",
        end: "2023-01-27",
      },
    ],
   
  };

  return <FullCalendar options={options} />;
}

export default MainCalender;
