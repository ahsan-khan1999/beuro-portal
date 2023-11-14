import { FollowUps } from "@/types/follow-up";
import { followUpsData } from "@/utils/static";
import React, { useEffect, useState } from "react";

const useFollowUps = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<FollowUps[]>([]);
  const totalItems = followUpsData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      followUpsData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return { currentPageRows, handlePageChange, totalItems, itemsPerPage };
};

export default useFollowUps;
