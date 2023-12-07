import { FilterType } from "@/types";
import { Employee } from "@/types/employee";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { readEmployee } from "@/api/slices/employee/emplyeeSlice";

const useEmployee = () => {
  const [filter, setFilter] = useState<FilterType>({
    location: "",
    sortBy: "",
    text: "",
    type: ""
  });
  const { employee, lastPage, totalCount } = useAppSelector(state => state.employee)
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Employee[]>([]);
  const totalItems = totalCount;
  const itemsPerPage = 10;
  const { t: translate } = useTranslation();

  useEffect(() => {
    
    dispatch(readEmployee({ params: { filter: filter, page: 1, size: 10 } })).then((res: any) => {

      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.Employee?.slice(startIndex, startIndex + itemsPerPage));
      }
    })
  }, [dispatch])
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(employee?.slice(startIndex, startIndex + itemsPerPage));

  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (filter: FilterType) => {
    dispatch(readEmployee({ params: { filter: filter, page: 1, size: 10 } }))
  };

  return { currentPageRows, handlePageChange, totalItems, itemsPerPage,filter,setFilter,handleFilterChange,translate };
};

export default useEmployee;
