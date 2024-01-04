import React, { useState } from "react";
import Link from "next/link";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { useRouter } from "next/router";

const EntryLinks = () => {
  const [language, setLanguage] = useState("English");
  const router = useRouter()
  const handleLanguageSelected = (selectedItem: string) => {
    setLanguage(selectedItem);
    const updatedQuery = {
      ...router.query,
    };
    const routeWithQuery = {
      pathname: `${router.pathname}`,
      query: updatedQuery,
    };
    router.push(routeWithQuery, undefined, {
      locale: selectedItem == "English" ? "en" : "de",
    });
  };

  return (
    <div className="grid grid-cols-3 items-center gap-x-[18px] px-7">
      <DropDown
        items={[{ item: "English" }, { item: "German" }]}
        onItemSelected={handleLanguageSelected}
        selectedItem={language}
        dropDownTextClassName="custom-text-style"
        dropDownIconClassName="custom-icon-style"
        dropDownDisabled={false}
        shouldNotSelectItem={false}
        dropDownClassName="!h-[42px]"
      />

      <div className="flex justify-center">
        <Link href="https://buero-365.com/" className="text-xs text-[#8F8F8F]">
          Privacy Policy
        </Link>
      </div>

      <div className="flex justify-center">
        <Link href="https://buero-365.com/" className="text-xs text-[#8F8F8F]">
          Copyright 2024
        </Link>
      </div>
    </div>
  );
};

export default EntryLinks;
