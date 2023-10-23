import React from "react";
import TableLayout from "@/layout/TableLayout";

import TableHeading from "./TableHeading";
import TableRows from "./TableRows";
import { InvoiceDetailsTableRowTypes } from "@/types";

export default function InvoiceDetailsTable() {
  // Function for handling the date format
  function parseCustomDate(dateString: string) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }

    return null;
  }

  const dataToAdd: InvoiceDetailsTableRowTypes[] = [
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      issueDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      emailStatus: "Sent",
      payment: "Online",
      status: "Overdue",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      issueDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      emailStatus: "Post",
      payment: "Cash",
      status: "Pending",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      issueDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      emailStatus: "Pending",
      payment: "online",
      status: "Draft",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      issueDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      emailStatus: "Sent",
      payment: "Online",
      status: "Overdue",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      issueDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      emailStatus: "Post",
      payment: "Cash",
      status: "Pending",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      issueDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      emailStatus: "Pending",
      payment: "online",
      status: "Overdue",
    },
  ];

  return (
    <>
      <TableLayout>
        <TableHeading />
        <TableRows dataToAdd={dataToAdd} />
      </TableLayout>
    </>
  );
}
