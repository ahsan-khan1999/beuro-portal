import { IconButtonProps } from "@/types";

export const IconButton = ({
  icon,
  type,
  onClick,
  disabled,
  buttonClassName,
  onMouseDown,
  onMouseLeave,
  onMouseUp,
  onMouseEnter,
}: IconButtonProps) => (
  <button
    onClick={onClick}
    className={`hover-transition ${buttonClassName}`}
    disabled={disabled}
    type={type}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
    onMouseEnter={onMouseEnter}
  >
    {icon}
  </button>
);
