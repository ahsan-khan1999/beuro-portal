import {
  ContactSupport,
  readContactSupport,
} from "@/api/slices/contactSupport/contactSupportSlice";
import { FiltersDefaultValues } from "@/enums/static";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import { useEffect, useState } from "react";

export default function useSupportRequest() {
  const { contactSupport, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.contactSupport
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [filter, setFilter] = useState<FilterType>({
  //   location: "",
  //   sort: "",
  //   text: "",
  //   type: ""
  // });
  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    // type: FiltersDefaultValues.None,
  });

  const [currentPageRows, setCurrentPageRows] =
    useState<ContactSupport[]>(contactSupport);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;
  useEffect(() => {
    // dispatch(set(DEFAULT_CUSTOMER))
    dispatch(
      readContactSupport({ params: { filter: filter, page: 1, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.ContactSupport);
      }
    });
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      readContactSupport({ params: { filter: filter, page: page, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.ContactSupport);
      }
    });
  };
  const handleFilterChange = (query: FilterType) => {
    dispatch(
      readContactSupport({
        params: { filter: query, page: currentPage, size: 10 },
      })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.ContactSupport);
      }
    });
  };
  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    loading,
  };
}
