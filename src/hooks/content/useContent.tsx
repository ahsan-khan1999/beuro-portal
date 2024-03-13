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
  const { content, lastPage, totalCount, loading, isLoading } = useAppSelector(
    (state) => state.content
  );

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
  });

  const dispatch = useAppDispatch();
  const { query } = useRouter();

  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

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
    const parsedPage = parseInt(query.page as string, 10);
    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    }

    const searchQuery = query?.text as string;
    const sortedValue = query?.sort as string;

    const queryParams = searchQuery || sortedValue;

    let updatedFilter = {
      text: "",
      sort: "",
    };

    if (searchQuery || sortedValue) {
      updatedFilter.text = searchQuery;
      updatedFilter.sort = sortedValue;
    }

    setFilter(updatedFilter);

    if (parsedPage) {
      dispatch(
        readContent({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: Number(parsedPage) || currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Content);
      });
    }
  }, [query]);

  // useEffect(() => {
  //   const parsedPage = parseInt(query.page as string, 10);
  //   if (!isNaN(parsedPage)) {
  //     setCurrentPage(parsedPage);
  //   }
  //   const searchQuery = query?.text as string;

  //   const queryParams = searchQuery;

  //   let updatedFilter = {
  //     text: "",
  //   };

  //   if (searchQuery) {
  //     updatedFilter.text = searchQuery;
  //   }

  //   setFilter(updatedFilter);
  //   console.log(parsedPage, "parsedPage");
  //   if (parsedPage) {
  //     dispatch(
  //       readContent({
  //         params: {
  //           filter: queryParams ? updatedFilter : {},
  //           page: Number(parsedPage) || currentPage,
  //           size: 10,
  //         },
  //       })
  //     ).then((response: any) => {
  //       if (response?.payload) setCurrentPageRows(response?.payload?.Content);
  //     });
  //   }
  // }, [query]);

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
    isLoading,
    currentPage,
  };
};

export default useContent;
