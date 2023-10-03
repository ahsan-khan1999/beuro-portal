import { SVGIconProp } from "@/types";

export const ServicesIcon = ({ className, pathClass }: SVGIconProp) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M19.1576 8.86655C19.1273 8.59643 18.8122 8.39322 18.5398 8.39322C17.6593 8.39322 16.8779 7.87643 16.5501 7.07656C16.2156 6.25749 16.4315 5.30245 17.0875 4.70064C17.2941 4.51172 17.3193 4.1954 17.1461 3.97582C16.6953 3.40351 16.1831 2.88647 15.6238 2.43841C15.4049 2.26288 15.0834 2.28731 14.8935 2.4975C14.3207 3.13181 13.2919 3.36752 12.4969 3.03582C11.6698 2.68783 11.1478 1.84948 11.1991 0.949623C11.2159 0.666792 11.0091 0.42103 10.7273 0.3882C10.0095 0.305088 9.28532 0.302678 8.5654 0.382549C8.28714 0.4133 8.08052 0.653245 8.08975 0.932502C8.12092 1.82355 7.59299 2.6471 6.77392 2.98263C5.98843 3.30352 4.96673 3.06956 4.39517 2.44082C4.20625 2.2337 3.89035 2.20827 3.67002 2.38006C3.09421 2.83195 2.57053 3.34932 2.11557 3.91697C1.93829 4.13764 1.96447 4.45745 2.17283 4.64703C2.8418 5.25283 3.05748 6.2161 2.71015 7.04473C2.37854 7.83471 1.5583 8.34361 0.619386 8.34361C0.314697 8.3338 0.0978578 8.5385 0.0641974 8.8156C-0.0202445 9.53726 -0.0211587 10.273 0.0601249 11.0005C0.0904608 11.2718 0.414847 11.4733 0.690281 11.4733C1.52722 11.452 2.33025 11.9698 2.6676 12.7899C3.00329 13.6089 2.7872 14.5635 2.13011 15.1662C1.92458 15.3551 1.89831 15.6707 2.07185 15.89C2.51808 16.4588 3.03072 16.9761 3.59172 17.428C3.81197 17.6054 4.13228 17.5805 4.32319 17.3701C4.89816 16.7343 5.92684 16.499 6.71865 16.8313C7.54811 17.1784 8.06989 18.0167 8.01894 18.9168C8.00223 19.1996 8.20951 19.4461 8.49035 19.4782C8.85771 19.5212 9.22697 19.5425 9.5974 19.5425C9.94897 19.5425 10.3006 19.5233 10.6523 19.4841C10.9309 19.4534 11.1371 19.2132 11.1277 18.9338C11.0956 18.0432 11.6247 17.2196 12.4427 16.8847C13.2335 16.5617 14.2506 16.7981 14.8225 17.4259C15.0124 17.6326 15.3264 17.6577 15.5476 17.4866C16.1224 17.0359 16.6451 16.5188 17.1021 15.9496C17.2795 15.7294 17.2544 15.4091 17.0448 15.2192C16.376 14.6138 16.1592 13.6501 16.5065 12.8224C16.833 12.043 17.6227 11.5197 18.4721 11.5197L18.591 11.5229C18.8667 11.5453 19.1201 11.3329 19.1535 11.0516C19.2383 10.3292 19.2392 9.59436 19.1576 8.86655ZM9.60895 15.4731C6.54935 15.4731 4.0692 12.993 4.0692 9.93346C4.0692 6.87394 6.54943 4.39379 9.60895 4.39379C12.6685 4.39379 15.1487 6.87394 15.1487 9.93346C15.1487 10.9719 14.8624 11.9433 14.3651 12.7739L11.9394 10.3481C12.115 9.93404 12.2078 9.48515 12.2077 9.02188C12.2077 8.11472 11.8544 7.2619 11.2129 6.62053C10.5715 5.97915 9.71866 5.62592 8.81166 5.62592C8.50897 5.62592 8.20769 5.66615 7.91621 5.74552C7.78855 5.78035 7.68416 5.88557 7.65017 6.01348C7.61543 6.14429 7.65457 6.27835 7.7568 6.38067C7.7568 6.38067 8.95436 7.58745 9.35505 7.98805C9.39702 8.03002 9.39694 8.13017 9.39104 8.16624L9.38729 8.19259C9.3469 8.63309 9.26903 9.16185 9.20478 9.36505C9.19614 9.37361 9.18799 9.38085 9.17918 9.38966C9.16996 9.39888 9.16148 9.40777 9.15259 9.41692C8.94672 9.48299 8.40981 9.56178 7.96234 9.60184L7.96242 9.59943L7.94231 9.6045C7.93874 9.60492 7.93209 9.60541 7.92327 9.60541C7.8749 9.60541 7.80376 9.59187 7.7391 9.52729C7.32204 9.11023 6.17144 7.96786 6.17144 7.96786C6.06821 7.86496 5.96233 7.84335 5.89177 7.84335C5.72729 7.84335 5.58001 7.9622 5.53364 8.13267C5.2169 9.3048 5.55267 10.5656 6.41014 11.4232C7.05168 12.0646 7.90458 12.4178 8.81174 12.4178C9.27501 12.4178 9.7239 12.3252 10.1379 12.1496L12.5899 14.6016C11.7291 15.1525 10.7068 15.4731 9.60895 15.4731Z"
        fill="#4B4B4B"
      />
    </svg>
  );
};