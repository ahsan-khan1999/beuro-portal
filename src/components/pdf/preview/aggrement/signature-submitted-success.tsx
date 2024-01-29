export const SignatureSubmittedSuccessFully = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="67"
        height="67"
        viewBox="0 0 67 67"
        fill="none"
      >
        <path
          d="M33.7681 0.426025C15.7091 0.426025 0.910156 15.2249 0.910156 33.2839C0.910156 51.3429 15.7091 66.1418 33.7681 66.1418C51.8271 66.1418 66.626 51.3429 66.626 33.2839C66.626 15.2249 51.8271 0.426025 33.7681 0.426025Z"
          fill="#45C769"
        />
        <path
          d="M52.5302 19.1426C54.0397 20.6521 54.0388 23.0998 52.528 24.6082L30.7931 46.3087L28.1707 48.931C27.4922 49.6096 26.3922 49.6103 25.7127 48.9327L15.0793 38.3272C13.5294 36.7815 13.5278 34.2715 15.0756 32.7237C16.5461 31.2533 18.9309 31.2558 20.3983 32.7293L26.1317 38.4865C26.5792 38.9359 27.3066 38.9367 27.755 38.4882L30.7931 35.4502L47.0652 19.1453C48.5731 17.6344 51.0208 17.6331 52.5302 19.1426Z"
          fill="#F2F2F2"
        />
      </svg>
      <span className="text-[32px] font-semibold text-[#393939]">
      Eingereicht
      </span>
      {/* <span className="text-[16px] font-bold text-[#393939]">
        Now accept this offer!
      </span> */}
    </div>
  );
};
