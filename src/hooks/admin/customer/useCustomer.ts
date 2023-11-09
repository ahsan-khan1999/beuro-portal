import { CustomersAdmin } from "@/types/admin/customer";
import { Customers } from "@/types/customer";
import { customers, customersAdmin } from "@/utils/static";
import { useEffect, useState } from "react";

export default function useCustomer() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] =
    useState<CustomersAdmin[]>(customersAdmin);

  const totalItems = customersAdmin.length;
  const itemsPerPage = 10;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      customersAdmin.slice(startIndex, startIndex + itemsPerPage)
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
