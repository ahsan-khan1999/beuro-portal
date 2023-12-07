import React, { useState } from "react";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { useRouter } from "next/router";
import CustomerFilter from "./customer-filter";
import { useTranslation } from "next-i18next";

const TableFunctions = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  function onInputChange(text: string) {}

  return (
    <div className="flex flex-col xlg:flex-row gap-y-3 justify-between xlg:items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">{translate("admin.customers_details.main_heading")}</h1>
      <CustomerFilter />
    </div>
  );
};

export default TableFunctions;
