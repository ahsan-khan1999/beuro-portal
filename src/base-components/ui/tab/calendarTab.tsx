import { combineClasses } from "@/utils/utility";

export interface CalendarTabProps {
  containerClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  heading: string;
  setTabType: (tabType: number | null) => void;
  tabType?: number;
  isSelected: boolean;
  selectedTab?: number;
  onItemSelected?: (id: string) => void;
}

export const CalendarTab = ({
  containerClassName,
  textClassName,
  heading,
  isSelected,
  selectedTab,
  setTabType,
  onItemSelected,
}: CalendarTabProps) => {
  const tabContaienrClasses = combineClasses(
    `px-[13px] rounded-full py-1 text-sm font-medium cursor-pointer ${
      isSelected ? "text-white bg-primary" : "text-[#2E2E2E] bg-transparent"
    }`
  );

  const handleClick = () => {
    onItemSelected && onItemSelected(heading);
    setTabType(isSelected ? null : selectedTab ?? -1);
  };

  return (
    <span className={tabContaienrClasses} onClick={handleClick}>
      {heading}
    </span>
  );
};
