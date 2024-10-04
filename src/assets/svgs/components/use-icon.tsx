import { combineClasses } from "@/utils/utility";

export interface UserIconProps {
  containerClassName?: string;
}

export const UserIcon = ({ containerClassName }: UserIconProps) => {
  const defaultClasses = combineClasses(
    "w-[35px] h-[35px]",
    containerClassName
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      className={defaultClasses}
    >
      <g clip-path="url(#clip0_1589_10558)">
        <path
          d="M17.6133 0.370605C12.6701 0.370605 8.64844 4.39223 8.64844 9.33545C8.64844 14.2787 12.6701 18.3003 17.6133 18.3003C22.5565 18.3003 26.5781 14.2787 26.5781 9.33545C26.5781 4.39223 22.5565 0.370605 17.6133 0.370605Z"
          fill="#FE9244"
        />
        <path
          d="M28.7673 24.157C26.3129 21.6649 23.0592 20.2925 19.6055 20.2925H15.6211C12.1674 20.2925 8.91366 21.6649 6.45929 24.157C4.01693 26.6369 2.67188 29.9103 2.67188 33.3745C2.67188 33.9246 3.11786 34.3706 3.66797 34.3706H31.5586C32.1087 34.3706 32.5547 33.9246 32.5547 33.3745C32.5547 29.9103 31.2096 26.6369 28.7673 24.157Z"
          fill="#FE9244"
        />
      </g>
      <defs>
        <clipPath id="clip0_1589_10558">
          <rect
            width="34"
            height="34"
            fill="white"
            transform="translate(0.613281 0.370605)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
