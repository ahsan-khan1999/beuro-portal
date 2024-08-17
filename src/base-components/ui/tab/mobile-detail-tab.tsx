import { ToggleIcon } from "@/assets/svgs/components/toggle-icon";
import { combineClasses } from "@/utils/utility";

export interface MobileDetailTabProps {
  containerClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  icon: string;
  heading: string;
  setTabType: (tabType: number | null) => void;
  tabType?: number;
  isSelected: boolean;
  selectedTab?: number;
  onItemSelected?: (id: string) => void;
}

export const MobileDetailTab = ({
  containerClassName,
  textClassName,
  icon,
  heading,
  isSelected,
  selectedTab,
  setTabType,
  onItemSelected,
}: MobileDetailTabProps) => {
  const defaultClasses = combineClasses(
    `px-3 py-4 flex items-center justify-between cursor-pointer ${
      isSelected
        ? "bg-primary text-white rounded-t-lg"
        : "bg-white text-[#272727] rounded-lg"
    }`,
    containerClassName
  );

  const textClasses = combineClasses(`text-sm font-medium`, textClassName);

  const handleClick = () => {
    onItemSelected && onItemSelected(heading);
    setTabType(isSelected ? null : selectedTab ?? -1);
  };

  return (
    <div className={defaultClasses} onClick={handleClick}>
      <div className="flex items-center gap-x-[10px]">
        <span dangerouslySetInnerHTML={{ __html: icon }} />
        <p className={textClasses}>{heading}</p>
      </div>
      <ToggleIcon isActive={isSelected} />
    </div>
  );
};
