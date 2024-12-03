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
    `flex items-center gap-x-1 px-2 py-[6px] rounded-[4px] cursor-pointer`,
    containerClassName
  );

  const dotDefaultClasses = combineClasses(
    `h-3 w-3 rounded-full flex-shrink-0`,
    dotClassName
  );

  return (
    <div
      className={containerClasses}
      style={{ backgroundColor: `${backrgoundColour || "#cccccc"}4D` }}
    >
      <span
        className={dotDefaultClasses}
        style={{ backgroundColor: dotColour || "#ccc" }}
      />
      <div className="flex items-center justify-between w-full">
        <span className="text-[#3C3C3C] font-medium text-xs xAirMini:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
          {title}
        </span>
        {showEndTime ? (
          <>
            <span className="text-[#3C3C3C] font-medium text-xs xAirMini:text-sm">
              {startTime}
            </span>
            <span className="text-[#3C3C3C] font-medium text-xs xAirMini:text-sm">
              {translate("calendar.ends_text")} {endTime}
            </span>
          </>
        ) : (
          <span className="text-[#3C3C3C] font-medium text-xs xAirMini:text-sm">
            {startTime}
          </span>
        )}
      </div>
    </div>
  );
};
