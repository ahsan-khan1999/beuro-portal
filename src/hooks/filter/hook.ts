import { ExtraFiltersType, FilterType } from "@/types";
import { SetStateAction, useState } from "react";

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
  setFilter: SetStateAction<any>;
}) {
  const [moreFilter, setMoreFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterReset = (key: keyof FilterType, value: string) => {
    setFilter({ ...filter, [key]: value });
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

  const toggleHandler = () => setIsOpen((prev) => !prev);

  return {
    moreFilter,
    setMoreFilter,
    filter,
    setFilter,
    isOpen,
    setIsOpen,
    toggleHandler,
    handleFilterReset,
    handleFilterResetToInitial,
    typeList,
  };
}
