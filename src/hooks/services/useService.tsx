import { useEffect, useState } from "react";
import { TRowServices } from "@/types/service";
import { servicesData } from "@/utils/static";

const useService = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<TRowServices[]>([]);

  const totalItems = servicesData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      servicesData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
  };
};

export default useService;
