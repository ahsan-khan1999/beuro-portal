import { SupportRequestAdmin } from "@/types/admin/support-request";
import { supportRequestData } from "@/utils/static";
import { useEffect, useState } from "react";

export default function useSupportRequest() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] =
    useState<SupportRequestAdmin[]>(supportRequestData);

  const totalItems = supportRequestData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      supportRequestData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
  };
}
