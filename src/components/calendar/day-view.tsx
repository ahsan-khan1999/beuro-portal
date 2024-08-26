import { combineClasses } from "@/utils/utility";

export interface DayViewProps {
  containerClassName?: string;
  borderColour?: string;
  titleColour?: string;
  timeColour?: string;
  title: string;
  time: string;
  backrgoundColour?: string;
  isMonthView?: boolean;
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
}: DayViewProps) => {
  const containerClasses = combineClasses(
    `flex flex-col gap-y-1 p-[6px] cursor-pointer`,
    containerClassName
  );

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
      }}
    >
      <p
        style={{
          color: "#3C3C3C",
          fontSize: "14px",
          fontWeight: "500",
        }}
        className="whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {title}
      </p>
      <p
        style={{
          color: timeColour || "#3C3C3C",
          fontSize: "12px",
          fontWeight: "400",
        }}
        className="whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {time}
      </p>
    </div>
  );
};
