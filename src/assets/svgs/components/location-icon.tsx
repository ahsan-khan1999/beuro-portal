import { combineClasses } from "@/utils/utility";

export interface LocationconProps {
  containerClassName?: string;
}

export const LocationIcon = ({ containerClassName }: LocationconProps) => {
  const defaultClasses = combineClasses(
    "bg-[#EBEBEB] rounded-[4px] p-1",
    containerClassName
  );

  return (
    <div className={defaultClasses}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect
          x="0.602539"
          y="0.409668"
          width="23.2656"
          height="23.2656"
          rx="4"
          fill="#EBEBEB"
        />
        <path
          d="M12.2352 4.1958C8.90209 4.1958 6.19043 6.90746 6.19043 10.2405C6.19043 14.377 11.5999 20.4495 11.8302 20.706C12.0465 20.9469 12.4242 20.9465 12.6402 20.706C12.8705 20.4495 18.2799 14.377 18.2799 10.2405C18.2799 6.90746 15.5683 4.1958 12.2352 4.1958ZM12.2352 13.2818C10.5582 13.2818 9.19395 11.9175 9.19395 10.2405C9.19395 8.56356 10.5583 7.19929 12.2352 7.19929C13.9121 7.19929 15.2764 8.56359 15.2764 10.2406C15.2764 11.9175 13.9121 13.2818 12.2352 13.2818Z"
          fill="#393939"
        />
      </svg>
    </div>
  );
};
