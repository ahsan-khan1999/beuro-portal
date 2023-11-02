import { ContentTableRowTypes } from "@/types/content";
import { contentData } from "@/utils/static";
import { useEffect, useState } from "react";

const useContent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<
    ContentTableRowTypes[]
  >([]);
  const totalItems = contentData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      contentData.slice(startIndex, startIndex + itemsPerPage)
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

export default useContent;
