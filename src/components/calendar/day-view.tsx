import { combineClasses } from "@/utils/utility";

export interface DayViewProps {
  containerClassName?: string;
  borderColour?: string;
  titleColour?: string;
  timeColour?: string;
  title: string;
  time?: string;
  startTime?: string;
  backrgoundColour?: string;
  isMonthView?: boolean;
  showOnlyTitle?: boolean;
  fixedHeight?: boolean;
  showEndTime?: boolean;
}

export const DayView = ({
  borderColour,
  containerClassName,
  timeColour,
  titleColour,
  backrgoundColour,
  time,
  startTime,
  title,
  isMonthView,
  showOnlyTitle = false,
  fixedHeight = false,
  showEndTime,
}: DayViewProps) => {
  const containerClasses = combineClasses(
    `flex flex-col gap-y-1 p-1 cursor-pointer`,
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
        height: fixedHeight ? "50px" : "auto",
      }}
    >
      <p className="text-[#3C3C3C] font-normal text-xs xMini:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </p>
      {!showOnlyTitle && (
        <p
          style={{
            color: timeColour || "#3C3C3C",
          }}
          className="text-[10px] xMini:text-xs whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {time}
        </p>
      )}
    </div>
  );
};
