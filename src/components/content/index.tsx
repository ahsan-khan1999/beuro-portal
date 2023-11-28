import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableHeadings from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import TableFunctions from "./table/TableFunctions";
import useContent from "@/hooks/content/useContent";

export default function Content() {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage,filter,setFilter,handleFilterChange } =
    useContent();
  return (
    <>
      <Layout>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl text-[#222B45] ">Content</h1>
          <TableFunctions filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange}/>
        </div>
        <TableLayout>
          <TableHeadings />
          <TableRows contentData={currentPageRows} />
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
