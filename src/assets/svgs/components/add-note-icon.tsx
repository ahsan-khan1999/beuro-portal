export interface NoteIconProps {
  isNoteCreated?: boolean;
}

export const AddNoteIcon = ({ isNoteCreated }: NoteIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
    >
      <rect
        x="1.36719"
        y="0.69043"
        width="31.1684"
        height="31"
        rx="7.5"
        fill="white"
        stroke={isNoteCreated ? "#FF0000" : "#4A13E7"}
      />
      <path
        d="M15.4044 22.0518H12.1297C11.1072 22.0518 10.2753 21.2199 10.2753 20.1974V11.7908C10.2753 10.7683 11.1072 9.93645 12.1297 9.93645H20.5362C21.5588 9.93645 22.3906 10.7683 22.3906 11.7908V15.1624C22.3906 15.5038 22.6674 15.7805 23.0088 15.7805C23.3501 15.7805 23.6269 15.5038 23.6269 15.1624V11.7908C23.6269 10.0867 22.2405 8.7002 20.5362 8.7002H12.1297C10.4255 8.7002 9.03906 10.0867 9.03906 11.7908V20.1974C9.03906 21.9016 10.4255 23.288 12.1297 23.288H15.4044C15.7458 23.288 16.0225 23.0113 16.0225 22.6699C16.0225 22.3285 15.7458 22.0518 15.4044 22.0518Z"
        fill={isNoteCreated ? "#FF0000" : "#4A13E7"}
      />
      <path
        d="M24.3194 17.3499C23.5963 16.6269 22.4199 16.6269 21.6969 17.3499L18.5623 20.4845C17.6484 21.3984 17.145 22.6136 17.145 23.9061C17.145 24.2475 17.4218 24.5243 17.7631 24.5243C19.0557 24.5243 20.2709 24.0209 21.1849 23.1069L24.3194 19.9724C25.0424 19.2494 25.0424 18.0729 24.3194 17.3499ZM23.4452 18.224C23.6863 18.4651 23.6863 18.8572 23.4452 19.0982L23.0081 19.5353L22.134 18.6611L22.5711 18.224C22.8121 17.983 23.2043 17.983 23.4452 18.224ZM20.3107 22.2328C19.7939 22.7495 19.1478 23.09 18.4454 23.2239C18.5793 22.5215 18.9198 21.8754 19.4365 21.3586L21.2598 19.5353L22.134 20.4095L20.3107 22.2328Z"
        fill={isNoteCreated ? "#FF0000" : "#4A13E7"}
      />
      <path
        d="M13.2906 14.7004L11.6923 16.2988C11.4509 16.5402 11.4509 16.9316 11.6923 17.173C11.9337 17.4144 12.3251 17.4144 12.5665 17.173L14.1648 15.5746C14.4058 15.3336 14.7979 15.3336 15.0389 15.5746L18.192 18.7277C18.4334 18.9691 18.8248 18.9691 19.0662 18.7277C19.3075 18.4863 19.3075 18.0949 19.0662 17.8535L15.9131 14.7004C15.1901 13.9775 14.0137 13.9775 13.2906 14.7004Z"
        fill={isNoteCreated ? "#FF0000" : "#4A13E7"}
      />
      <path
        d="M19.3026 14.8806C18.2801 14.8806 17.4482 14.0488 17.4482 13.0263C17.4482 12.0038 18.2801 11.1719 19.3026 11.1719C20.3251 11.1719 21.157 12.0038 21.157 13.0263C21.157 14.0488 20.3251 14.8806 19.3026 14.8806ZM19.3026 12.4081C18.9618 12.4081 18.6845 12.6854 18.6845 13.0263C18.6845 13.3671 18.9618 13.6444 19.3026 13.6444C19.6435 13.6444 19.9208 13.3671 19.9208 13.0263C19.9208 12.6854 19.6435 12.4081 19.3026 12.4081Z"
        fill={isNoteCreated ? "#FF0000" : "#4A13E7"}
      />
    </svg>
  );
};