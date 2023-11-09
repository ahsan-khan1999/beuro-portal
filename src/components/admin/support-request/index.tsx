import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import useSupportRequest from "@/hooks/admin/support-request/useSupportRequest";

export default function SupportRequest() {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage } =
    useSupportRequest();

  return (
    <Layout>
      <TableFunctions />
      <TableLayout>
        <TableHeading />
        <TableRow currentPageRows={currentPageRows} />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}
