import { FilterType, MoreFilterType } from "@/types";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const router = useRouter();

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
    const { pathname, query } = router;
    delete query[key];

    router.replace({
      pathname,
      query,
    });
  };

  const handleFilterResetToInitial = () => {
    setMoreFilter(moreFilters);
    const { pathname, query } = router;
    if (query.date || query.leadSource) {
      delete query.date;
      delete query.leadSource;
    }
    router.replace({  
      pathname,
      query,
    });
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
