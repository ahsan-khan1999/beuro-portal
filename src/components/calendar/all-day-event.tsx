import { combineClasses } from "@/utils/utility";

export interface AllDayEventsProps {
  containerClassName?: string;
  title: string;
  backrgoundColour?: string;
  dotClassName?: string;
  dotColour?: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  showEndTime?: boolean;
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
}: AllDayEventsProps) => {
  const containerClasses = combineClasses(
    `px-2 py-[6px] rounded-[4px] cursor-pointer`,
    containerClassName
  );

  const dotDefaultClasses = combineClasses(
    `h-2 w-2 xMini:h-3 xMini:w-3 rounded-full flex-shrink-0`,
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

        {showEndTime && (
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
