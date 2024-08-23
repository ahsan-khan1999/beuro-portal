import { combineClasses } from "@/utils/utility";

export interface DayViewProps {
  containerClassName?: string;
  borderColour?: string;
  titleColour?: string;
  timeColour?: string;
  title: string;
  time: string;
  backrgoundColour?: string;
}

export const DayView = ({
  borderColour,
  containerClassName,
  timeColour,
  titleColour,
  backrgoundColour,
  time,
  title,
}: DayViewProps) => {
  const containerClasses = combineClasses(
    `flex flex-col gap-y-1 p-[6px] rounded-r-md cursor-pointer`,
    containerClassName
  );

  return (
    <div
      className={containerClasses}
      style={{
        backgroundColor: `${backrgoundColour || "#cccccc"}4D`,
        borderLeft: `3px solid ${borderColour || "#000"}`,
      }}
    >
      <p
        style={{
          color: "#3C3C3C",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: timeColour || "#3C3C3C",
          fontSize: "12px",
          fontWeight: "400",
        }}
      >
        {time}
      </p>
    </div>
  );
};
