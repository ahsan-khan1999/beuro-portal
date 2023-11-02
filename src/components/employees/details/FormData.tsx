import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import editPswIcon from "@/assets/svgs/edit-password.svg";
import DetailsCard from "@/layout/customers/DetailsCard";
import { TRowEmployees } from "@/types/employee";

const FormData = ({ handlePasswordReset, employeeDetail }: { handlePasswordReset: () => void, employeeDetail: TRowEmployees }) => {
  const router = useRouter();
  return (
    <div className="rounded-md bg-white py-[26px] pl-[32px] pr-[25px] w-full h-fit">
      <div className="flex justify-between items-center pb-[26px] border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Employs Details</h2>
        <div className="flex gap-5">
          <button
            onClick={() => handlePasswordReset()}
            className="flex items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4  w-fit whitespace-nowrap"
          >
            <Image
              src={editPswIcon}
              alt="edit password icon"
              className="mr-3"
            />
            Edit Password
          </button>
          <button
            onClick={() => router.push("/employees/edit")}
            className="flex  items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <g clipPath="url(#clip0_1241_60323)">
                <path
                  d="M16.3079 10.197C15.8471 10.197 15.4746 10.5704 15.4746 11.0303V17.697C15.4746 18.1561 15.1012 18.5303 14.6413 18.5303H2.97461C2.51456 18.5303 2.14133 18.1561 2.14133 17.697V6.03027C2.14133 5.57114 2.51456 5.19699 2.97461 5.19699H9.64133C10.1021 5.19699 10.4746 4.82361 10.4746 4.36371C10.4746 3.90366 10.1021 3.53027 9.64133 3.53027H2.97461C1.59628 3.53027 0.474609 4.65195 0.474609 6.03027V17.697C0.474609 19.0753 1.59628 20.197 2.97461 20.197H14.6413C16.0197 20.197 17.1413 19.0753 17.1413 17.697V11.0303C17.1413 10.5695 16.7687 10.197 16.3079 10.197Z"
                  fill="#4B4B4B"
                />
                <path
                  d="M8.28756 9.43707C8.22927 9.49536 8.19006 9.56952 8.17342 9.64948L7.58428 12.5963C7.55682 12.7328 7.60015 12.8737 7.69842 12.9728C7.77761 13.052 7.88427 13.0945 7.99352 13.0945C8.02007 13.0945 8.04769 13.092 8.07516 13.0862L11.021 12.4971C11.1027 12.4803 11.1768 12.4412 11.2343 12.3828L17.8277 5.78946L14.8818 2.84375L8.28756 9.43707Z"
                  fill="#4B4B4B"
                />
                <path
                  d="M19.8647 0.806664C19.0524 -0.005867 17.7307 -0.005867 16.9189 0.806664L15.7656 1.95992L18.7115 4.90578L19.8647 3.75237C20.2581 3.35992 20.4748 2.83654 20.4748 2.2799C20.4748 1.72326 20.2581 1.19988 19.8647 0.806664Z"
                  fill="#4B4B4B"
                />
              </g>
              <defs>
                <clipPath id="clip0_1241_60323">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.474609 0.158203)"
                  />
                </clipPath>
              </defs>
            </svg>
            Edit Details
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center gap-3">
          <div className="w-[67%]">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              Employ Name
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {name}
            </div>
          </div>
          <div className="w-[33%]">
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              Designation
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {designation}
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4 ">
          <div>
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              Email Address
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {email}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              Phone Number
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {phone}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-[10px] block text-sm">
              Mobile Number
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormData;
