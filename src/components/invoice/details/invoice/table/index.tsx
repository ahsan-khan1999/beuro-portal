import React from "react";
import TableLayout from "@/layout/TableLayout";

import TableHeading from "./TableHeading";
import TableRows from "./TableRows";
import { InvoiceDetailsTableRowTypes, InvoiceTableRowTypes, SubInvoiceTableRowTypes } from "@/types/invoice";

export default function InvoiceDetailsTable({ collectiveInvoice, handlePaymentStatusUpdate, handleInvoiceStatusUpdate, handleInvoiceEdit }: { collectiveInvoice: SubInvoiceTableRowTypes[], handlePaymentStatusUpdate: (id: string, status: string) => void, handleInvoiceStatusUpdate: (id: string, status: string) => void, handleInvoiceEdit: (item: any) => void }) {

  return (
    <>
      <TableLayout>
        <TableHeading />
        <TableRows dataToAdd={collectiveInvoice} handleInvoiceStatusUpdate={handleInvoiceStatusUpdate} handlePaymentStatusUpdate={handlePaymentStatusUpdate} handleInvoiceEdit={handleInvoiceEdit} />
      </TableLayout>
    </>
  );
}
