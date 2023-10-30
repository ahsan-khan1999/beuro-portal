import { SVGIconProp } from "@/types";
import { combineClasses } from "@/utils/utility";

export const CopyIcon = ({ className }: SVGIconProp) => {
  const classes = combineClasses("text-primary", className);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={classes}
    >
      <defs>
        <clipPath id="clipPath">
          <path
            id="Path_20743"
            data-name="Path 20743"
            d="M0,0H20V20H0Z"
            fill="none"
          />
        </clipPath>
      </defs>
      <g id="copy_1_" data-name="copy (1)" clipPath="url(#clipPath)">
        <path
          id="Path_20742"
          data-name="Path 20742"
          d="M12.833,1H3.667A1.672,1.672,0,0,0,2,2.667V13.5a.833.833,0,0,0,1.667,0V3.5A.836.836,0,0,1,4.5,2.667h8.333a.833.833,0,0,0,0-1.667Zm3.333,3.333H7A1.672,1.672,0,0,0,5.333,6V17.667A1.672,1.672,0,0,0,7,19.333h9.167a1.672,1.672,0,0,0,1.667-1.667V6A1.672,1.672,0,0,0,16.167,4.333Zm-.833,13.333h-7.5A.836.836,0,0,1,7,16.833v-10A.836.836,0,0,1,7.833,6h7.5a.836.836,0,0,1,.833.833v10A.836.836,0,0,1,15.333,17.667Z"
          transform="translate(-0.333 -0.167)"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
