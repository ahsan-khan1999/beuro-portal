import React, { useState } from "react";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { useRouter } from "next/router";

const TableFunctions = () => {
  const router = useRouter();

  function onInputChange(text: string) {}

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">Customers</h1>
      <div className="flex items-center ">
        <div className="flex items-center space-x-4">
          <SearchInput onInputChange={onInputChange} />
          <div className="text-[#404040] font-medium flex items-center cursor-pointer">
            Sort by
            <svg
              className="ml-[2px]"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0961 6.12191C12.2318 6.00587 12.4191 5.97103 12.5874 6.03051C12.7557 6.08999 12.8795 6.23475 12.9122 6.41026C12.9449 6.58578 12.8814 6.76538 12.7457 6.88141L9.248 9.87946C9.06101 10.0394 8.78541 10.0394 8.59842 9.87946L5.1007 6.88141C4.89097 6.70204 4.86636 6.3866 5.04574 6.17687C5.22511 5.96714 5.54055 5.94253 5.75028 6.12191L8.92321 8.84114L12.0961 6.12291V6.12191Z"
                fill="#404040"
                stroke="black"
              />
            </svg>
          </div>
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
          >
            <g clipPath="url(#clip0_702_12694)">
              <path
                d="M7.33125 0C6.22625 0 5.29125 0.714 4.93425 1.7H0.53125V3.4H4.93425C5.28275 4.386 6.21775 5.1 7.33125 5.1C8.73375 5.1 9.88125 3.9525 9.88125 2.55C9.88125 1.1475 8.73375 0 7.33125 0ZM11.5813 1.7V3.4H17.5312V1.7H11.5813ZM11.5813 5.95C10.4763 5.95 9.54125 6.664 9.18425 7.65H0.53125V9.35H9.18425C9.53275 10.336 10.4678 11.05 11.5813 11.05C12.9838 11.05 14.1313 9.9025 14.1313 8.5C14.1313 7.0975 12.9838 5.95 11.5813 5.95ZM15.8313 7.65V9.35H17.5312V7.65H15.8313ZM4.78125 11.9C3.67625 11.9 2.74125 12.614 2.38425 13.6H0.53125V15.3H2.38425C2.73275 16.286 3.66775 17 4.78125 17C6.18375 17 7.33125 15.8525 7.33125 14.45C7.33125 13.0475 6.18375 11.9 4.78125 11.9ZM9.03125 13.6V15.3H17.5312V13.6H9.03125Z"
                fill="#404040"
              />
            </g>
            <defs>
              <clipPath id="clip0_702_12694">
                <rect
                  width="17"
                  height="17"
                  fill="white"
                  transform="translate(0.53125)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <button
          onClick={() => router.push("customers/add")}
          className="py-2 pl-2 pr-[10px] px-[8px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-8 whitespace-nowrap"
        >
          <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
          >
            <path
              d="M13.2526 7.94451H8.52654V12.6706C8.52654 13.1904 8.1012 13.6158 7.58133 13.6158C7.06146 13.6158 6.63612 13.1904 6.63612 12.6706V7.94451H1.91006C1.39019 7.94451 0.964844 7.51917 0.964844 6.9993C0.964844 6.47943 1.39019 6.05409 1.91006 6.05409H6.63612V1.32802C6.63612 0.808158 7.06146 0.382812 7.58133 0.382812C8.1012 0.382812 8.52654 0.808158 8.52654 1.32802V6.05409H13.2526C13.7725 6.05409 14.1978 6.47943 14.1978 6.9993C14.1978 7.51917 13.7725 7.94451 13.2526 7.94451Z"
              fill="white"
            />
          </svg>
          Add New
        </button>
      </div>
    </div>
  );
};

export default TableFunctions;
