import React from "react";
import TableLayout from "@/layout/TableLayout";
import TableHeading from "./TableHeading";
import TableRows from "./TableRows";
import {
  InvoiceDetailsTableProps,
  InvoiceDetailsTableRowTypes,
  InvoiceTableRowTypes,
  SubInvoiceTableRowTypes,
} from "@/types/invoice";

export default function InvoiceDetailsTable({
  collectiveInvoice,
  handlePaymentStatusUpdate,
  handleInvoiceStatusUpdate,
  handleInvoiceEdit,
}: InvoiceDetailsTableProps) {
  return (
    <>
      <TableLayout>
        <TableHeading />
        <TableRows
          dataToAdd={collectiveInvoice}
          handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
          handleInvoiceEdit={handleInvoiceEdit}
        />
      </TableLayout>
    </>
  );
}
