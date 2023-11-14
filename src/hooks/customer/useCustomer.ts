import { Customers } from "@/types/customer";
import { customers } from "@/utils/static";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../useRedux";
import {
  readCustomer,
  readCustomerDetail,
} from "@/api/slices/customer/customerSlice";

export default function useCustomer() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] =
    useState<Customers[]>(customers.slice(0,3));
  const dispatch = useAppDispatch();


  const totalItems = 10;
  const itemsPerPage = 10;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(customers.slice(0,3).slice(startIndex, startIndex + itemsPerPage));
    // dispatch(readCustomerDetail({ params: { filter: "65436739f4a8c09ef4669708" } }))
    // dispatch(readCustomer({ params: { filter: { sortBy: "desc", name: "test", type: "none" }, page: 1, size: 10 } }))
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
