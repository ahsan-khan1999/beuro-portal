import { IconOnlyButtonProps } from "@/types";

export const IconOnlyButton = ({
  icon,
  onClick,
  disabled,
  buttonClassName,
}: IconOnlyButtonProps) => (
  <button onClick={(e) => { e.stopPropagation(),onClick()}} className={buttonClassName} disabled={disabled}>
    {icon}
  </button>
);
