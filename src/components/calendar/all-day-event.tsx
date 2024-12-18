import { combineClasses } from "@/utils/utility";

export interface AllDayEventsProps {
  containerClassName?: string;
  title: string;
  backrgoundColour?: string;
  dotClassName?: string;
  dotColour?: string;
  time?: string;
  viewType?: string;
  startTime?: string;
  endTime?: string;
  showEndTime?: boolean;
  hasStartTime?: boolean;
}

export const AllDayEvent = ({
  title,
  containerClassName,
  backrgoundColour,
  dotClassName,
  dotColour,
  showEndTime,
  startTime,
  endTime,
  viewType,
  hasStartTime,
}: AllDayEventsProps) => {
  const weekView = viewType === "dayGridWeek";
  const containerClasses = combineClasses(
    `${
      weekView ? "xsMini:px-2" : "px-2"
    } py-[6px] rounded-[4px] cursor-pointer`,
    containerClassName
  );

  const dotDefaultClasses = combineClasses(
    `${
      weekView ? "w-0 h-0 xsMini:h-2 xsMini:w-2" : "h-2 w-2"
    } xMini:h-3 xMini:w-3 rounded-full flex-shrink-0`,
    dotClassName
  );

  return (
    <div
      className={`${containerClasses}`}
      style={{ backgroundColor: `${backrgoundColour || "#cccccc"}4D` }}
    >
      <div className="flex items-center ">
        <span
          className={dotDefaultClasses}
          style={{ backgroundColor: dotColour || "#ccc" }}
        />
        <p
          className={`text-[#3C3C3C] ml-1 font-medium text-[10px] xMini:text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full`}
        >
          {title}
        </p>
        {!showEndTime && (
          <span className="text-[#3C3C3C] font-medium text-[10px] xMini:text-sm ml-2">
            {startTime}
          </span>
        )}

        {showEndTime && hasStartTime && (
          <div className="flex items-center justify-between gap-x-2">
            <span className="text-[#3C3C3C] font-medium text-[10px] xMini:text-sm">
              {startTime}
            </span>
            <span className="text-[#3C3C3C] font-medium text-[10px] xMini:text-sm">
              {translate("calendar.ends_text")} {endTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
