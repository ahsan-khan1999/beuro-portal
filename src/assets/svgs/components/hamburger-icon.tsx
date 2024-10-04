import { combineClasses } from "@/utils/utility";

export interface HamburgerIconProps {
  containerClassName?: string;
  strokeColor?: string; // Changed from strokeClassName to strokeColor
  onClick: (e: any) => void;
}

export const HamburgerIcon = ({
  containerClassName,
  onClick,
  strokeColor = "white", // Default color is white
}: HamburgerIconProps) => {
  const defaultClasses = combineClasses("cursor-pointer", containerClassName);

  return (
    <div onClick={onClick} className={defaultClasses}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="16"
        viewBox="0 0 21 16"
        fill="none"
      >
        <path
          d="M1.02115 1.20825H19.5615"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1.02116 8.03442L15.8652 8.03442"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1.02115 14.8596H19.5615"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
