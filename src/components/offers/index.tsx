import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import useOffers from "@/hooks/offers/useOffers";

export default function Offers() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleNotes,
    handleImagesUpload,
    renderModal,
  } = useOffers();

  return (
    <>
      <Layout>
        <TableFunctions />
        <TableLayout>
          <TableHeading />
          <TableRows
            dataToAdd={currentPageRows}
            openModal={handleNotes}
            handleImagesUpload={handleImagesUpload}
          />
        </TableLayout>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Layout>
      {renderModal()}
    </>
  );
}
