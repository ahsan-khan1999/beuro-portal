import React from "react";
import TableRows from "./TableRows";
import TableLayout from "@/layout/TableLayout";
import TableHeading from "./TableHeading";
import { InvoiceDetailsTableProps } from "@/types/invoice";
import { TableCardLayout } from "@/layout/TableCardLayout";

export default function InvoiceDetailsTable({
  collectiveInvoice,
  handlePaymentStatusUpdate,
  handleInvoiceStatusUpdate,
  handleInvoiceEdit,
  handleRecurringInvoiceEdit,
}: InvoiceDetailsTableProps) {
  return (
    <TableCardLayout>
      <TableLayout>
        <TableHeading />
        <TableRows
          dataToAdd={collectiveInvoice}
          handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
          handleInvoiceEdit={handleInvoiceEdit}
          handleRecurringInvoiceEdit={handleRecurringInvoiceEdit}
        />
      </TableLayout>
    </TableCardLayout>
  );
}
