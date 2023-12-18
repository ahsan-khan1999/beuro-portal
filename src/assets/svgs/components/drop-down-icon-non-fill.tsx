import { combineClasses } from "@/utils/utility";

export const DropDownNonFillIcon = ({
  label,
  isOpen,
  className,
}: {
  label?: string;
  isOpen: boolean;
  className?: string;
}) => {
  const rotateTransform = isOpen ? "rotate(180)" : "";
  const classes = combineClasses("text-lightGray",className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13.816"
      height="8.322"
      viewBox="0 0 13.816 8.322"
      transform={rotateTransform}
      className={`#404040 ${classes}`}
    >
      <path
        id="drop-down-icon"
        d="M-11189.91-7594.619l5.494,5.494,5.494-5.494"
        transform="translate(11191.324 7596.033)"
        fill="currentColor"
        stroke={className ? className : "#707070"}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
};
