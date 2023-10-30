import { Customers } from "@/types/customer";
import { customers } from "@/utils/static";
import { useEffect, useState } from "react";

export default function useCustomer() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPageRows, setCurrentPageRows] = useState<Customers[]>(customers);



    const totalItems = customers.length;
    const itemsPerPage = 10;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(customers.slice(startIndex, startIndex + itemsPerPage));
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
