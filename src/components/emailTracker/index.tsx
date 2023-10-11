import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";

import { Pagination } from "@/base-components/ui/pagination/pagination";
import { TableRowEmailTracker, TableRowTypes } from "@/types";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import DeleteConfirmation from "./modals/DeleteConfirmation";
import { useAppSelector } from "@/hooks/useRedux";

export default function EmailTracker() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const { modal } = useAppSelector((state) => state.global);
  const [currentPageRows, setCurrentPageRows] = useState<
    TableRowEmailTracker[]
  >([]);

  const dataToAdd: TableRowEmailTracker[] = [
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Pending",
        colorClass: "#FE9244",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Failed",
        colorClass: "#FF376F",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Failed",
        colorClass: "#FF376F",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Pending",
        colorClass: "#FE9244",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Pending",
        colorClass: "#FE9244",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Failed",
        colorClass: "#FF376F",
      },
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
      {/* <DeleteConfirmation /> */}
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
