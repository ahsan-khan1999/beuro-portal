import { AllCustomers } from "@/types/follow-up";
import { AllCustomersData } from "@/utils/static";
import React, { useEffect, useState } from "react";

const useAllCustomers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<AllCustomers[]>([]);
  const totalItems = AllCustomersData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      AllCustomersData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return { currentPageRows, handlePageChange, totalItems, itemsPerPage };
};

export default useAllCustomers;