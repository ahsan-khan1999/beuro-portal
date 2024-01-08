import React, { useState } from "react";
import Link from "next/link";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const EntryLinks = () => {
  const [language, setLanguage] = useState("English");
  const { t: translate } = useTranslation();
  const router = useRouter();
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
    <div className="grid grid-cols-[minmax(110px,_110px)_minmax(160px,_160px)_minmax(120px,_120px)] gap-x-3 items-center px-7">
      <DropDown
        items={[{ item: "English" }, { item: "German" }]}
        onItemSelected={handleLanguageSelected}
        selectedItem={language}
        dropDownTextClassName="custom-text-style"
        dropDownIconClassName="custom-icon-style"
        dropDownDisabled={false}
        shouldNotSelectItem={false}
        dropDownClassName="!h-[42px]"
        dropDownItemsContainerClassName="w-full"
      />

      <div className="flex justify-center">
        <Link href="https://buero-365.com/" className="text-xs text-[#8F8F8F]">
          {translate("common.privacy")}
        </Link>
      </div>

      <div className="flex justify-center">
        <Link href="https://buero-365.com/" className="text-xs text-[#8F8F8F]">
          {translate("common.copy_right")}
        </Link>
      </div>
    </div>
  );
};

export default EntryLinks;
