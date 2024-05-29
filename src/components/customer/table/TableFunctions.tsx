import { FilterType } from "@/types";
import React, { SetStateAction } from "react";
import CustomerFilter from "./customer-filter";
import { useTranslation } from "next-i18next";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (query: FilterType) => void;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex flex-col mlg:flex-row justify-between mlg:items-center mb-4 gap-y-3">
      <h1 className="text-xl text-[#222B45] ">
        {translate("customers.title")}
      </h1>

<<<<<<< HEAD
      {/* <div className="flex items-center">
        <div className="flex items-center space-x-4"> */}
=======
>>>>>>> 48d4a8a098b45b87ddfc9bedff9928a9da3bf9bb
      <CustomerFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
<<<<<<< HEAD
      {/* </div>
      </div> */}
=======
>>>>>>> 48d4a8a098b45b87ddfc9bedff9928a9da3bf9bb
    </div>
  );
};

export default TableFunctions;
