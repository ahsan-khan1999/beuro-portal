import { createRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";

export interface props {
  options: object;
}

const init = (el: any, props: props) => {
  const calendar = new Calendar(el, props.options);
  calendar.render();
};

function Main(props: props) {
  const calendarRef = createRef();

  useEffect(() => {
    init(calendarRef.current, props);
  }, [props.options]);

  return <div ref={calendarRef as any} className="full-calendar"></div>;
}


export default Main;
