import { Lead } from "@/types/leads";
import Image from "next/image";
import React from "react";
import moreInfo from "@/assets/svgs/entity_more_info.svg";
import { useRouter } from "next/router";
import { formatDate, getStatusColor } from "@/utils/utility";

const TableRows = ({
  dataToAdd,
  openModal,
  handleImageUpload,
}: {
  dataToAdd: Lead[];
  openModal: (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleImageUpload: (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
}) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item: Lead, index: number) => {
        return (
          <div
            // onClick={() => router.push("/leads/details")}
            key={index}
            className="cursor-pointer shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md flex items-center">
              {item?.refID}
            </span>
            <span className="px-6 py-4 bg-white  flex items-center">
              {item.customerID?.fullName}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.customerID?.email}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {item.customerID?.phoneNumber}
            </span>
            <span className="px-6 py-4 bg-white flex items-center">
              {formatDate(item.createdAt)}
            </span>
            <span className="px-6 py-4 bg-white ">{item.customerID?.address?.country}</span>
            <span className={`px-6 py-4  `}>
              <div

                className={`bg-[${getStatusColor(item.leadStatus)}] text-white px-2 py-1 text-center rounded-md  w-[70px] text-sm`}
              >
                {item.leadStatus}
              </div>
            </span>
            <span className="px-6 py-4 flex justify-center items-center  bg-white cursor-pointer" onClick={(e) => handleImageUpload(item?.id, e)}>
              {/* <Image
                src={item.editImg}
                alt="edit_img_icon"
                className="cursor-pointer"
                onClick={(e) => handleImageUpload(item, e)}
              /> */}
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.03711" y="1.14453" width="31.1684" height="31" rx="7.5" fill="white" stroke="#C7C7C7" />
                <path d="M20.0838 15.9531C20.0838 15.6117 19.8071 15.335 19.4657 15.335H13.0991C12.7577 15.335 12.481 15.6117 12.481 15.9531C12.481 16.2945 12.7577 16.5712 13.0991 16.5712H19.4657C19.8071 16.5712 20.0838 16.2945 20.0838 15.9531Z" fill="#4A13E7" />
                <path d="M13.0991 17.8076C12.7577 17.8076 12.481 18.0843 12.481 18.4257C12.481 18.7671 12.7577 19.0438 13.0991 19.0438H16.9657C17.3071 19.0438 17.5838 18.7671 17.5838 18.4257C17.5838 18.0843 17.3071 17.8076 16.9657 17.8076H13.0991Z" fill="#4A13E7" />
                <path d="M14.5505 23.7418H12.4832C11.8015 23.7418 11.247 23.1873 11.247 22.5056V11.6268C11.247 10.9451 11.8015 10.3905 12.4832 10.3905H20.0826C20.7643 10.3905 21.3188 10.9451 21.3188 11.6268V15.4282C21.3188 15.7696 21.5956 16.0463 21.937 16.0463C22.2783 16.0463 22.5551 15.7696 22.5551 15.4282V11.6268C22.5551 10.2634 21.4459 9.1543 20.0826 9.1543H12.4832C11.1199 9.1543 10.0107 10.2634 10.0107 11.6268V22.5056C10.0107 23.8689 11.1199 24.9781 12.4832 24.9781H14.5505C14.8919 24.9781 15.1686 24.7013 15.1686 24.36C15.1686 24.0186 14.8919 23.7418 14.5505 23.7418Z" fill="#4A13E7" />
                <path d="M19.4657 12.8633H13.0991C12.7577 12.8633 12.481 13.14 12.481 13.4814C12.481 13.8228 12.7577 14.0995 13.0991 14.0995H19.4657C19.8071 14.0995 20.0838 13.8228 20.0838 13.4814C20.0838 13.14 19.8071 12.8633 19.4657 12.8633Z" fill="#4A13E7" />
              </svg>

            </span>
            <span className="px-6 py-4 flex justify-center items-center bg-white cursor-pointer " onClick={(e) => openModal(item?.id, e)}>

              <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.36719" y="1.14453" width="31.1684" height="31" rx="7.5" fill="white" stroke="#C7C7C7" />
                <path d="M15.4044 22.5059H12.1297C11.1072 22.5059 10.2753 21.674 10.2753 20.6515V12.2449C10.2753 11.2224 11.1072 10.3906 12.1297 10.3906H20.5362C21.5588 10.3906 22.3906 11.2224 22.3906 12.2449V15.6165C22.3906 15.9579 22.6674 16.2346 23.0088 16.2346C23.3501 16.2346 23.6269 15.9579 23.6269 15.6165V12.2449C23.6269 10.5408 22.2405 9.1543 20.5362 9.1543H12.1297C10.4255 9.1543 9.03906 10.5408 9.03906 12.2449V20.6515C9.03906 22.3557 10.4255 23.7421 12.1297 23.7421H15.4044C15.7458 23.7421 16.0225 23.4654 16.0225 23.124C16.0225 22.7826 15.7458 22.5059 15.4044 22.5059Z" fill="#4A13E7" />
                <path d="M24.3194 17.804C23.5963 17.081 22.4199 17.081 21.6969 17.804L18.5623 20.9386C17.6484 21.8525 17.145 23.0677 17.145 24.3602C17.145 24.7016 17.4218 24.9784 17.7631 24.9784C19.0557 24.9784 20.2709 24.475 21.1849 23.561L24.3194 20.4265C25.0424 19.7035 25.0424 18.527 24.3194 17.804ZM23.4452 18.6781C23.6863 18.9192 23.6863 19.3113 23.4452 19.5523L23.0081 19.9894L22.134 19.1152L22.5711 18.6781C22.8121 18.4371 23.2043 18.4371 23.4452 18.6781ZM20.3107 22.6869C19.7939 23.2036 19.1478 23.5441 18.4454 23.678C18.5793 22.9756 18.9198 22.3295 19.4365 21.8127L21.2598 19.9894L22.134 20.8636L20.3107 22.6869Z" fill="#4A13E7" />
                <path d="M13.2906 15.1545L11.6923 16.7529C11.4509 16.9943 11.4509 17.3857 11.6923 17.6271C11.9337 17.8685 12.3251 17.8685 12.5665 17.6271L14.1648 16.0287C14.4058 15.7877 14.7979 15.7877 15.0389 16.0287L18.192 19.1818C18.4334 19.4232 18.8248 19.4232 19.0662 19.1818C19.3075 18.9404 19.3075 18.549 19.0662 18.3076L15.9131 15.1545C15.1901 14.4316 14.0137 14.4316 13.2906 15.1545Z" fill="#4A13E7" />
                <path d="M19.3026 15.3347C18.2801 15.3347 17.4482 14.5029 17.4482 13.4804C17.4482 12.4579 18.2801 11.626 19.3026 11.626C20.3251 11.626 21.157 12.4579 21.157 13.4804C21.157 14.5029 20.3251 15.3347 19.3026 15.3347ZM19.3026 12.8622C18.9618 12.8622 18.6845 13.1395 18.6845 13.4804C18.6845 13.8212 18.9618 14.0985 19.3026 14.0985C19.6435 14.0985 19.9208 13.8212 19.9208 13.4804C19.9208 13.1395 19.6435 12.8622 19.3026 12.8622Z" fill="#4A13E7" />
              </svg>
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md" onClick={() =>
              router.push({
                pathname: "/leads/details",
                query: { lead: item?.id },
              })
            }>
              <Image className="cursor-pointer" src={moreInfo} alt="moreInfo" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
