import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import { TRowEmployees } from "@/types";
import TableRowEmploys from "./table/TableRowEmploys";
import TableHeadingEmploys from "./table/TableHeadingEmploys";
import EmploysTopBar from "./table/EmploysTopBar";

export default function Employees() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<TRowEmployees[]>([]);

  // Function for handling the date format
  function parseCustomDate(dateString: string) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }

    return null;
  }

  const employeesData: TRowEmployees[] = [
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
    {
      id: "001",
      name: "Rahal Ahmad",
      email: "Test12@gmail.com",
      phone: +49014561235,
      designation: "Islamabad",
      createdOn: parseCustomDate("25/08/2023"),
      action: "edit",
    },
  ];

  const totalItems = employeesData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      employeesData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-[#222B45] ">Employs</h1>
        <EmploysTopBar />
      </div>
      <TableLayout>
        <TableHeadingEmploys />
        <TableRowEmploys employsData={currentPageRows} />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}
