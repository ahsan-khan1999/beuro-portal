import { Employee } from "@/types/employee";
import { employeesData } from "@/utils/static";
import React, { useEffect, useState } from "react";

const useEmployee = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Employee[]>([]);
  const totalItems = employeesData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      employeesData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return { currentPageRows, handlePageChange, totalItems, itemsPerPage };
};

export default useEmployee;
