import { combineClasses } from "@/utils/utility";

export const DropDownFillIcon = ({
  isOpen,
  className,
}: {
  isOpen: boolean;
  className?: string;
}) => {
  const rotateTransform = isOpen ? "rotate(180)" : "";
  const classes = combineClasses("text-lightGray", className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11.787"
      height="8.182"
      viewBox="0 0 11.787 8.182"
      transform={rotateTransform}
      className={classes}
    >
      <path
        id="dropdwon-icon"
        d="M65.868,237.549H55.555a.65.65,0,0,0-.518.27,1.043,1.043,0,0,0,0,1.278l5.157,6.363a.632.632,0,0,0,1.036,0l5.157-6.364a1.043,1.043,0,0,0,0-1.278A.65.65,0,0,0,65.868,237.549Z"
        transform="translate(-54.818 -237.549)"
        fill="currentColor"
      />
    </svg>
  );
};
