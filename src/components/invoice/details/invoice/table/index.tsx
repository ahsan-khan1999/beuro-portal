import React from "react";
import TableLayout from "@/layout/TableLayout";

import TableHeading from "./TableHeading";
import TableRows from "./TableRows";
import { InvoiceDetailsTableRowTypes, InvoiceTableRowTypes, SubInvoiceTableRowTypes } from "@/types/invoice";

export default function InvoiceDetailsTable({ collectiveInvoice, handlePaymentStatusUpdate, handleInvoiceStatusUpdate }: { collectiveInvoice: SubInvoiceTableRowTypes[], handlePaymentStatusUpdate: (id: string) => void, handleInvoiceStatusUpdate: (id: string) => void }) {

  return (
    <>
      <TableLayout>
        <TableHeading />
        <TableRows dataToAdd={collectiveInvoice} handleInvoiceStatusUpdate={handleInvoiceStatusUpdate} handlePaymentStatusUpdate={handlePaymentStatusUpdate} />
      </TableLayout>
    </>
  );
}
