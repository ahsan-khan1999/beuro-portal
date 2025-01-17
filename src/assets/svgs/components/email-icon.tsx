import { SVGIconProp } from "@/types";

export const EmailIcon = ({ className }: SVGIconProp) => {
  return (
    <svg
      width="25"
      height="19"
      viewBox="0 0 25 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.172 0.417969H3.77825C2.22586 0.417969 0.962891 1.68094 0.962891 3.23333V15.2456C0.962891 16.7979 2.22586 18.0609 3.77825 18.0609H22.172C23.7244 18.0609 24.9873 16.7979 24.9873 15.2456V3.23333C24.9873 1.68094 23.7244 0.417969 22.172 0.417969ZM23.1104 15.2456C23.1104 15.763 22.6894 16.184 22.172 16.184H3.77825C3.26079 16.184 2.8398 15.763 2.8398 15.2456V3.23333C2.8398 2.71587 3.26079 2.29488 3.77825 2.29488H22.172C22.6894 2.29488 23.1104 2.71587 23.1104 3.23333V15.2456Z"
        fill="currentColor"
      />
      <path
        d="M22.955 1.58789L12.979 9.00811L3.00305 1.58789L1.88281 3.09388L12.979 11.3473L24.0752 3.09388L22.955 1.58789Z"
        fill="currentColor"
      />
    </svg>
  );
};
