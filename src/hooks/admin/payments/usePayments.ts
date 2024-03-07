import { PaymentsAdmin } from "@/types/admin/payments";
import { paymentsAdminData } from "@/utils/static";
import { useEffect, useState } from "react";

export default function usePayments() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] =
    useState<PaymentsAdmin[]>(paymentsAdminData);

  const totalItems = paymentsAdminData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      paymentsAdminData.slice(startIndex, startIndex + itemsPerPage)
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
    currentPage
  };
}
