import { FilterType, MoreFilterType } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

const typeList = [
  {
    item: "All",
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

  const [moreFilter, setMoreFilter] = useState<MoreFilterType>({
    type: filter?.type || "All",
    location: filter?.location || "",
    date: {
      $gte: "",
      $lte: "",
    },
    payment: "",
    email: [],
    price: ["0", "0"],
  });

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
    setMoreFilter({
      type: "All",
      location: "",
      date: {
        $gte: "",
        $lte: "",
      },
      payment: "",
      email: [],
      price: ["0", "0"],
    });
    // setFilter({
    //   text: "",
    //   sort: "",
    //   type: "",
    //   location: "",
    // });
  };

  return {
    extraFilterss,
    typeList,
    moreFilter,
    setMoreFilter,
    setFilter,
    handleExtraFilterToggle,
    handleExtraFiltersClose,
    handleFilterReset,
    handleFilterResetToInitial,
  };
}
