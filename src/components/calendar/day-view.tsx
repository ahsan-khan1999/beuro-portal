import { combineClasses } from "@/utils/utility";

export interface DayViewProps {
  containerClassName?: string;
  borderColour?: string;
  titleColour?: string;
  timeColour?: string;
  title: string;
  time?: string;
  backrgoundColour?: string;
  isMonthView?: boolean;
  showOnlyTitle?: boolean;
  fixedHeight?: boolean;
  isWeekView?: boolean;
  isModal?: boolean;
}

export const DayView = ({
  borderColour,
  containerClassName,
  timeColour,
  titleColour,
  backrgoundColour,
  time,
  title,
  isMonthView,
  showOnlyTitle = false,
  fixedHeight = false,
  isWeekView,
  isModal,
}: DayViewProps) => {
  const containerClasses = combineClasses(
    `flex flex-col  ${isWeekView ? "gap-y-2" : "gap-y-1"} p-1 cursor-pointer`,
    containerClassName
  );

  const eventHeight = isWeekView ? "100px" : fixedHeight ? "50px" : "auto";

  return (
    <div
      className={containerClasses}
      style={{
        backgroundColor: `${backrgoundColour || "#cccccc"}4D`,
        borderLeft: isMonthView
          ? `3px solid ${borderColour || "#000"}`
          : undefined,
        borderTop: !isMonthView
          ? `3px solid ${borderColour || "#000"}`
          : undefined,
        height: eventHeight,
      }}
    >
      {isWeekView ? (
        <p
          className={`text-[#3C3C3C] font-normal text-[8px] xMini:text-sm break-all`}
          style={{
            color: titleColour || "#3C3C3C",
            height: "100%",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            whiteSpace: "normal",
          }}
        >
          {title}
        </p>
      ) : (
        <p className="text-[#3C3C3C] font-normal text-[8px] xMini:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </p>
      )}

      {!showOnlyTitle && (
        <p
          style={{
            color: timeColour || "#3C3C3C",
          }}
          className="text-[5px] xMini:text-xs whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {time}
        </p>
      )}
    </div>
  );
};
