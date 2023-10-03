import { SVGIconProp } from "@/types";

export const SettingsIcon = ({ className, pathClass }: SVGIconProp) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M20.4333 14.9845C20.0608 15.0386 19.7053 15.1761 19.3933 15.3866C19.0813 15.5972 18.8208 15.8754 18.6312 16.2006C18.4416 16.5258 18.3278 16.8895 18.2983 17.2648C18.2688 17.64 18.3243 18.0171 18.4607 18.3679C18.5475 18.5973 18.5602 18.848 18.4973 19.085C18.4343 19.322 18.2988 19.5333 18.1096 19.6893C17.2747 20.3905 16.3243 20.9413 15.3008 21.3172C15.0677 21.4038 14.8133 21.4146 14.5737 21.3481C14.3342 21.2816 14.1217 21.1412 13.9666 20.9469C13.7331 20.6484 13.4347 20.407 13.0941 20.2409C12.7534 20.0748 12.3794 19.9885 12.0004 19.9885C11.6214 19.9885 11.2474 20.0748 10.9067 20.2409C10.5661 20.407 10.2677 20.6484 10.0342 20.9469C9.87911 21.1412 9.66664 21.2816 9.42708 21.3481C9.18751 21.4146 8.93308 21.4038 8.70002 21.3172C7.75502 20.9702 6.87146 20.4745 6.08269 19.8489C5.88387 19.6915 5.74066 19.4746 5.67403 19.2299C5.60741 18.9853 5.62087 18.7257 5.71244 18.4892C5.85975 18.1291 5.92061 17.7395 5.89014 17.3516C5.85968 16.9638 5.73873 16.5884 5.53701 16.2557C5.33529 15.9231 5.05841 15.6423 4.72857 15.4359C4.39874 15.2296 4.02513 15.1034 3.63773 15.0675C3.38621 15.0406 3.14998 14.9337 2.9638 14.7625C2.77763 14.5912 2.65135 14.3647 2.60356 14.1164C2.4847 13.528 2.42482 12.9292 2.42482 12.3289C2.42394 11.8264 2.46451 11.3246 2.54611 10.8287C2.58672 10.5724 2.71065 10.3365 2.89873 10.1577C3.08682 9.97884 3.32859 9.86692 3.58666 9.83925C3.98257 9.8021 4.36383 9.67065 4.69851 9.45591C5.0332 9.24117 5.31158 8.94938 5.51035 8.60497C5.70912 8.26055 5.8225 7.87354 5.841 7.47632C5.8595 7.07909 5.78258 6.68322 5.61668 6.32182C5.50811 6.08675 5.48118 5.82214 5.54017 5.57001C5.59915 5.31788 5.74067 5.09268 5.94225 4.93017C6.77221 4.24175 7.71346 3.69988 8.72556 3.32785C8.85498 3.28302 8.99078 3.25931 9.12773 3.25763C9.31552 3.25804 9.50048 3.30347 9.66709 3.3901C9.8337 3.47674 9.97711 3.60206 10.0853 3.75556C10.3128 4.08706 10.6178 4.35802 10.9738 4.54491C11.3298 4.73181 11.726 4.82899 12.1281 4.82803C12.5177 4.82753 12.9017 4.73609 13.2497 4.56099C13.5977 4.38588 13.9 4.13194 14.1326 3.8194C14.2873 3.61147 14.5064 3.46054 14.7558 3.3901C15.0052 3.31967 15.2709 3.33369 15.5115 3.42999C16.4369 3.80245 17.2985 4.31723 18.065 4.9557C18.2575 5.1149 18.3946 5.33105 18.4565 5.57308C18.5185 5.81511 18.5021 6.07055 18.4097 6.30267C18.2595 6.65813 18.1941 7.04362 18.2184 7.42872C18.2428 7.81382 18.3564 8.18798 18.5501 8.52166C18.7439 8.85535 19.0126 9.13943 19.335 9.35147C19.6574 9.56352 20.0246 9.69772 20.4078 9.7435C20.6562 9.77785 20.8873 9.89041 21.0675 10.0649C21.2477 10.2393 21.3676 10.4666 21.41 10.7138C21.5125 11.2463 21.5681 11.7867 21.576 12.3289C21.5761 12.9008 21.5227 13.4714 21.4164 14.0334C21.3733 14.2751 21.2551 14.4971 21.0786 14.6679C20.9022 14.8386 20.6764 14.9494 20.4333 14.9845ZM15.1923 12.3289C15.1923 11.6976 15.0051 11.0805 14.6543 10.5556C14.3036 10.0307 13.8051 9.62159 13.2219 9.38001C12.6386 9.13842 11.9969 9.07522 11.3777 9.19837C10.7585 9.32153 10.1898 9.62553 9.74342 10.0719C9.29703 10.5183 8.99304 11.087 8.86988 11.7062C8.74672 12.3254 8.80993 12.9671 9.05151 13.5504C9.2931 14.1336 9.70221 14.6321 10.2271 14.9828C10.752 15.3336 11.3691 15.5208 12.0004 15.5208C12.8469 15.5208 13.6588 15.1845 14.2574 14.5859C14.856 13.9873 15.1923 13.1754 15.1923 12.3289Z"
        fill="#4B4B4B"
      />
    </svg>
  );
};