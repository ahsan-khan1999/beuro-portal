export const NextActionIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width="32"
      // height="32"
      viewBox="0 0 32 32"
      fill="none"
      onClick={onClick}
      className="cursor-pointer w-6 h-6 xMini:h-[32px] xMini:w-[32px]"
    >
      <g clip-path="url(#clip0_2403_4786)">
        <path
          d="M27.3145 27.3145C24.2912 30.3378 20.2732 32 16 32C11.7268 32 7.70879 30.3378 4.68548 27.3145C1.66217 24.2912 0 20.2732 0 16C0 11.7268 1.66217 7.70879 4.68548 4.68548C7.70879 1.66217 11.7268 0 16 0C20.2732 0 24.2912 1.66217 27.3145 4.68548C30.3378 7.70879 32 11.7268 32 16C32 20.2732 30.3378 24.2912 27.3145 27.3145ZM16 1.76687C8.15378 1.76687 1.76687 8.15378 1.76687 16C1.76687 23.8462 8.15378 30.2331 16 30.2331C23.8462 30.2331 30.2331 23.8462 30.2331 16C30.2331 8.15378 23.8462 1.76687 16 1.76687Z"
          fill="#747474"
        />
        <path
          d="M15.4505 20.9274C15.1036 21.2742 14.5474 21.2742 14.2006 20.9274C13.8537 20.5805 13.8537 20.0243 14.2006 19.6775L17.8783 15.9998L14.2006 12.3221C13.8537 11.9752 13.8537 11.419 14.2006 11.0722C14.3707 10.902 14.5997 10.8104 14.8222 10.8104C15.0447 10.8104 15.2738 10.8955 15.4439 11.0722L19.7433 15.3715C20.0901 15.7184 20.0901 16.2746 19.7433 16.6214L15.4505 20.9274Z"
          fill="#747474"
        />
      </g>
      <defs>
        <clipPath id="clip0_2403_4786">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="matrix(1 0 0 -1 0 32)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
