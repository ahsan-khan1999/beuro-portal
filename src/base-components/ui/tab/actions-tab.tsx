import { NextActionIcon } from "@/assets/svgs/components/next-action-icon";
import { PreviousActionIcon } from "@/assets/svgs/components/previous-action-icon";
import { combineClasses } from "@/utils/utility";

export interface ActionTabProps {
  previousClick: () => void;
  nextClick: () => void;
  containerClassName?: string;
  heading?: string;
}

export const ActionsTab = ({
  containerClassName,
  nextClick,
  previousClick,
  heading,
}: ActionTabProps) => {
  const defaultClasses = combineClasses(
    "flex items-center gap-x-2",
    containerClassName
  );

  const textView = combineClasses(
    "border border-[#DADADA] rounded-lg px-3 py-[6px]"
  );

  
  return (
    <div className={defaultClasses}>
      <PreviousActionIcon onClick={previousClick} />

      <div className={textView}>
        <span className="text-base font-medium">{heading}</span>
      </div>
      <NextActionIcon onClick={nextClick} />
    </div>
  );
};
