export const PrintIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer w-6 h-6 xMini:w-[41px] xMini:h-[41px]"
    >
      <rect
        x="0.73584"
        y="1.3125"
        width="39.2105"
        height="39"
        rx="7.5"
        fill="white"
        stroke="#4A13E7"
      />
      <path
        d="M26.6815 26.124H27.8911C29.2734 26.124 30.3938 25.0095 30.3938 23.6344V18.6551C30.3938 17.28 29.2734 16.1655 27.8911 16.1655H12.7913C11.409 16.1655 10.2886 17.28 10.2886 18.6551V23.6344C10.2886 25.0095 11.409 26.124 12.7913 26.124H14.001"
        stroke="#4A13E7"
        stroke-width="1.4"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.6841 22.8037H13.0015"
        stroke="#4A13E7"
        stroke-width="1.4"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.2528 30.8125H25.4306C26.1217 30.8125 26.682 30.2552 26.682 29.5677V22.8042H14.0015V29.5677C14.0015 30.2552 14.5617 30.8125 15.2528 30.8125Z"
        stroke="#4A13E7"
        stroke-width="1.4"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.0084 25.46H18.6714"
        stroke="#4A13E7"
        stroke-width="1.4"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.0084 28.1152H18.6714"
        stroke="#4A13E7"
        stroke-width="1.4"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0036 18.8203H13.0015"
        stroke="#4A13E7"
        stroke-width="1.4"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5042 10.8123H24.1792C25.5615 10.8123 26.682 11.927 26.682 13.302V16.165H14.0015V13.302C14.0015 11.927 15.122 10.8123 16.5042 10.8123Z"
        stroke="#4A13E7"
        stroke-width="1.4"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
