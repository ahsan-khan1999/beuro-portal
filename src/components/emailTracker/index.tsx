import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";

import { Pagination } from "@/base-components/ui/pagination/pagination";
import { TableRowTypes } from "@/types";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";

export default function EmailTracker() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<TableRowTypes[]>([]);

  const dataToAdd: TableRowTypes[] = [
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
      location: "Islamabad",
      type: "Individual",
    },
    // Add more rows as needed
  ];

  const totalItems = dataToAdd.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(dataToAdd.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <TableFunctions />
      <TableLayout>
        <TableHeading />
        <TableRow dataToAdd={currentPageRows} />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}
