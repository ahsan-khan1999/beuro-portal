import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import { TRowServices } from "@/types";
import TableRowServices from "./table/TableRowServices";
import TableHeadingServices from "./table/TableHeadingServices";
import ServiceTopBar from "./table/ServiceTopBar";

export default function Services() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<TRowServices[]>([]);

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

  const servicesData: TRowServices[] = [
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },

    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
    {
      id: "001",
      service: "Cleaning",
      createdOn: parseCustomDate("25/08/2023"),
      price: {
        value: 300,
        currency: "CHF",
      },
      description: "We need to move office furniture to.....",
      action: "edit",
    },
  ];

  const totalItems = servicesData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      servicesData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-[#222B45] ">Services</h1>
        <ServiceTopBar />
      </div>
      <TableLayout>
        <TableHeadingServices />
        <TableRowServices servicesData={currentPageRows} />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}
