import React from "react";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { useRouter } from "next/router";
import addIcon from "@/assets/svgs/plus_icon.svg";
import filterDropDownIcon from "@/assets/svgs/filter_drop_dwon_icon.svg";
import Image from "next/image";

const TableFunctions = () => {
  const router = useRouter();
  function onInputChange(text: string) {}

  return (
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
        <Image
          src={filterDropDownIcon}
          alt="filterDropDownIcon"
          className="cursor-pointer"
        />
      </div>
      <button
        onClick={() => router.push("/employees/add")}
        className="py-2 px-[10px]  cursor-pointer flex items-center gap-x-2 text-[13px] font-semibold bg-primary text-white rounded-md ml-8 whitespace-nowrap"
      >
        <Image src={addIcon} alt="addIcon" />
        Add New
      </button>
    </div>
  );
};

export default TableFunctions;
