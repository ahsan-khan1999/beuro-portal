import { AllLeads } from "@/types/follow-up";
import { AllLeadsData } from "@/utils/static";
import React, { useEffect, useState } from "react";

const useAllLeads = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<AllLeads[]>([]);
  const totalItems = AllLeadsData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
        AllLeadsData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return { currentPageRows, handlePageChange, totalItems, itemsPerPage };
};

export default useAllLeads;
