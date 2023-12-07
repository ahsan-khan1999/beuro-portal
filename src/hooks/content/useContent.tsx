import { ContentTableRowTypes } from "@/types/content";
import { DEFAULT_CONTENT, contentData } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readContent, setContentDetails } from "@/api/slices/content/contentSlice";
import localStoreUtil from "@/utils/localstore.util";

const useContent = () => {
  const { content, lastPage, totalCount } = useAppSelector(state => state.content)
  const [filter, setFilter] = useState<FilterType>({
    location: "",
    sortBy: "",
    text: "",
    type: ""
  });
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<
    ContentTableRowTypes[]
  >([]);
  const totalItems = totalCount;
  const { t: translate } = useTranslation();
  const itemsPerPage = 10;
  useEffect(() => {
    localStoreUtil.remove_data("content")
    dispatch(setContentDetails(DEFAULT_CONTENT))
    dispatch(readContent({ params: { filter: filter, page: 1, size: 10 } })).then((res: any) => {
      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.Content?.slice(startIndex, startIndex + itemsPerPage));
      }
    })
  }, [dispatch])
  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      content?.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (filter: FilterType) => {
    dispatch(readContent({ params: { filter: filter, page: 1, size: 10 } }))
  };
  return {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleFilterChange,
    filter,
    setFilter,
    translate
  };
};

export default useContent;
