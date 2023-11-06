import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import useEmailTracker from "@/hooks/emailTracker/useEmailTracker";

export default function EmailTracker() {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage } =
    useEmailTracker();
  return (
    <>
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
    </>
  );
}
