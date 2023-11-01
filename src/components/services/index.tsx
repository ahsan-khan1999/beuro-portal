import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableRowServices from "./table/TableRowServices";
import TableHeadingServices from "./table/TableHeadingServices";
import TableFunctions from "./table/TableFunctions";
import useService from "@/hooks/services/useService";

export default function Services() {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage } =
    useService();

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-[#222B45] ">Services</h1>
        <TableFunctions />
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
