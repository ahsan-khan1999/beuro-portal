import React, { useState } from "react";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { useRouter } from "next/router";
import CustomerFilter from "./customer-filter";

const TableFunctions = () => {
  const router = useRouter();

  function onInputChange(text: string) {}

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">Customer Management </h1>
      <CustomerFilter />
    </div>
  );
};

export default TableFunctions;
