import { FilterType, MoreFilterType } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

export default function useFilter({
  filter,
  setFilter,
  moreFilters,
}: {
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  moreFilters: MoreFilterType;
}) {
  const [extraFilterss, setExtraFilters] = useState(false);

  const [moreFilter, setMoreFilter] = useState<MoreFilterType>(moreFilters);

  const handleExtraFilterToggle = () => {
    setExtraFilters((prev) => !prev);
  };

  const handleExtraFiltersClose = () => {
    setExtraFilters(false);
  };

  const handleFilterReset = (
    key: keyof FilterType,
    value: string | string[] | {}
  ) => {
    setMoreFilter((prev) => ({ ...prev, [key]: value }));
  };
  const handleFilterResetToInitial = () => {
    setMoreFilter(moreFilters);
  };

  return {
    extraFilterss,
    moreFilter,
    setMoreFilter,
    setFilter,
    handleExtraFilterToggle,
    handleExtraFiltersClose,
    handleFilterReset,
    handleFilterResetToInitial,
  };
}
