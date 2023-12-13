import React from "react";
import TableLayout from "@/layout/TableLayout";

import TableHeading from "./TableHeading";
import TableRows from "./TableRows";
import { ReceiptDetailsTableRowTypes, SubInvoiceTableRowTypes } from "@/types/invoice";
export default function ReceiptDetailsTable({ collectiveInvoice, handleInvoiceStatusUpdate, handlePaymentStatusUpdate }: { collectiveInvoice: SubInvoiceTableRowTypes[], handlePaymentStatusUpdate: (id: string,status:string,type:string) => void, handleInvoiceStatusUpdate: (id: string,status:string,type:string) => void }) {


  
  return (
    <>
      <TableLayout>
        <TableHeading />
        <TableRows collectiveInvoice={collectiveInvoice} handleInvoiceStatusUpdate={handleInvoiceStatusUpdate} handlePaymentStatusUpdate={handlePaymentStatusUpdate} />
      </TableLayout>
    </>
  );
}
