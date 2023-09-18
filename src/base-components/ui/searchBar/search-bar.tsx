
import Image from "next/image";

import searchIcon from "@/assets/search.png";
import { SearchInputProps } from "@/types";

export const SearchInput = ({onInputChange}: SearchInputProps) => {
  return (
    <div className="flex flex-col gap-y-2 max-w-[376px] w-full">
      <label className="text-gray text-sm" htmlFor="searchBar">
        Suche
      </label>
      <div className="relative w-full">
        <input
          id="searchBar"
          type="text"
          placeholder="Artikel Titel, Nummer"
          className="bg-white w-full h-10 text-sm font-medium border rounded-lg border-lightGray pl-8 pr-3 py-3 focus:outline-none"
          onChange={(e) => onInputChange(e.target.value)}
        />
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
          <Image src={searchIcon} alt="search icon" width={16} height={16} />
        </div>
      </div>
    </div>
  );
};
