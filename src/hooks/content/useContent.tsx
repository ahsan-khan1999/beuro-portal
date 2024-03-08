import { ContentTableRowTypes } from "@/types/content";
import { DEFAULT_CONTENT } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import {
  readContent,
  setContentDetails,
} from "@/api/slices/content/contentSlice";
import localStoreUtil from "@/utils/localstore.util";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";

const useContent = () => {
  const { content, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.content
  );

  const { query } = useRouter();

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
  });

  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<
    ContentTableRowTypes[]
  >([]);

  const totalItems = totalCount;
  const { t: translate } = useTranslation();
  const itemsPerPage = 10;

  useEffect(() => {
    localStoreUtil.remove_data("content");
    dispatch(setContentDetails(DEFAULT_CONTENT));
  }, []);

  const handleFilterChange = (filter: FilterType) => {
    setCurrentPage(1);
    // dispatch(
    //   readContent({ params: { filter: filter, page: currentPage, size: 10 } })
    // ).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.Content);
    //   }
    // });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const queryStatus = query?.status;
    const searchQuery = query?.text as string;

    const queryParams = queryStatus || searchQuery;

    if (queryParams !== undefined) {
      const filteredStatus =
        query?.status === "None"
          ? "None"
          : queryParams
              .toString()
              .split(",")
              .filter((item) => item !== "None");

      let updatedFilter: {
        status: string | string[];
        text?: string;
      } = {
        status: filteredStatus,
      };

      if (searchQuery) {
        updatedFilter.text = searchQuery;
      }

      setFilter(updatedFilter);

      dispatch(
        readContent({
          params: {
            filter: updatedFilter,
            page: currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Content);
      });
    }
  }, [query]);

  return {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleFilterChange,
    filter,
    setFilter,
    translate,
    loading,
    currentPage,
  };
};

export default useContent;
