import { FilterType } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

const typeList = [
  {
    item: "None",
  },
  {
    item: "Individual",
  },
  {
    item: "Company",
  },
];

export default function useFilter({
  filter,
  setFilter,
}: {
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
}) {
  const [extraFilterss, setExtraFilters] = useState(false);

  const handleExtraFilterToggle = () => {
    setExtraFilters((prev) => !prev);
  };

  const handleExtraFiltersClose = () => {
    setExtraFilters(false);
  };

  const handleFilterReset = (key: keyof FilterType, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };
  const handleFilterResetToInitial = () => {
    setFilter({
      text: "",
      sortBy: "",
      type: "None",
      location: "",
      status: "",
    });
  };

  return {
    extraFilterss,
    typeList,
    setFilter,
    handleExtraFilterToggle,
    handleExtraFiltersClose,
    handleFilterReset,
    handleFilterResetToInitial,
  };
}
