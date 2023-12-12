import { ReactNode, createRef, useEffect } from "react";
import { Draggable as FullcalendarDraggable } from "@fullcalendar/interaction";
interface DragProp{
  options:object;
  className:string;
  children:ReactNode
}
const init = (el: any, props: DragProp) => {
  new FullcalendarDraggable(el, props.options);
};

function Draggable(props: DragProp) {
  const draggableRef = createRef();

  useEffect(() => {
    init(draggableRef.current, props);
  }, [props.options]);

  return (
    <div ref={draggableRef as any} className={props.className}>
      {props.children}
    </div>
  );
}


export default Draggable;
