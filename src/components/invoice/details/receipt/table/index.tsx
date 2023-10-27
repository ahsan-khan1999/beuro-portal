import React from "react";
import TableLayout from "@/layout/TableLayout";

import TableHeading from "./TableHeading";
import TableRows from "./TableRows";
import { ReceiptDetailsTableRowTypes } from "@/types/invoice";
export default function ReceiptDetailsTable() {
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

  const dataToAdd: ReceiptDetailsTableRowTypes[] = [
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      receiptTitle: "Umzug Cleaning Service",
      paidDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      payment: "Online",
      emailStatus: "Sent",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      receiptTitle: "Umzug Cleaning Service",
      paidDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      payment: "Cash",
      emailStatus: "Pending",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      receiptTitle: "Umzug Cleaning Service",
      paidDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      payment: "Online",
      emailStatus: "Sent",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      receiptTitle: "Umzug Cleaning Service",
      paidDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      payment: "Cash",
      emailStatus: "Pending",
    },
    {
      id: "R-2000-1",
      customer: "Rahal Ahmed",
      receiptTitle: "Umzug Cleaning Service",
      paidDate: parseCustomDate("25/08/2023"),
      amount: "500 CHF",
      payment: "Online",
      emailStatus: "Sent",
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
