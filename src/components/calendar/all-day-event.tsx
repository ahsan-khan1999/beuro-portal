import { combineClasses } from "@/utils/utility";

export interface AllDayEventsProps {
  containerClassName?: string;
  title: string;
  backrgoundColour?: string;
  dotClassName?: string;
  dotColour?: string;
}
export const AllDayEvent = ({
  title,
  containerClassName,
  backrgoundColour,
  dotClassName,
  dotColour,
}: AllDayEventsProps) => {
  const containerClasses = combineClasses(
    `flex items-center gap-x-1 px-2 py-[6px] rounded-[4px]`,
    containerClassName
  );

  const dotDefaultClasses = combineClasses(
    `h-3 w-3 rounded-full`,
    dotClassName
  );

  return (
    <div
      className={containerClasses}
      style={{ backgroundColor: backrgoundColour || "#ccc" }}
    >
      <span
        className={dotDefaultClasses}
        style={{ backgroundColor: dotColour || "#ccc" }}
      />

      <p className="text-[#3C3C3C] font-medium text-sm">
        {title.length > 20 ? `${title.substring(0, 20)}...` : title}
      </p>
    </div>
  );
};
