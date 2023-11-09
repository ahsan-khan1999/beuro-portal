import { Customers } from "@/types/customer";
import { customers } from "@/utils/static";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../useRedux";
import { readCustomer, readCustomerDetail } from "@/api/slices/customer/customerSlice";

export default function useCustomer() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPageRows, setCurrentPageRows] = useState<Customers[]>(customers);
    const dispatch = useAppDispatch()

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(customers.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage]);

    const totalItems = customers.length;
    const itemsPerPage = 10;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(customers.slice(startIndex, startIndex + itemsPerPage));
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
        itemsPerPage
    }
}
