import React from "react";
import TableLayout from "@/layout/TableLayout";
import TableHeading from "./TableHeading";
import TableRows from "./TableRows";
import { SubInvoiceTableRowTypes } from "@/types/invoice";
import { TableCardLayout } from "@/layout/TableCardLayout";

export default function ReceiptDetailsTable({
  collectiveInvoice,
  handleInvoiceStatusUpdate,
  handlePaymentStatusUpdate,
}: {
  collectiveInvoice: SubInvoiceTableRowTypes[];
  handlePaymentStatusUpdate: (id: string, status: string, type: string) => void;
  handleInvoiceStatusUpdate: (id: string, status: string, type: string) => void;
}) {
  return (
    <TableCardLayout>
      <TableLayout>
        <TableHeading />
        <TableRows
          collectiveInvoice={collectiveInvoice}
          handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
        />
      </TableLayout>
    </TableCardLayout>
  );
}
