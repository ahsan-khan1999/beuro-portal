import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import editNote from "@/assets/svgs/Edit_note.svg";

import { Pagination } from "@/base-components/ui/pagination/pagination";
import { InvoiceTableRowTypes } from "@/types";
import { updateModalType } from "@/api/slices/globalSlice/global";
import TableFunctions from "./TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";

export default function Invoices() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<
    InvoiceTableRowTypes[]
  >([]);

  const dataToAdd: InvoiceTableRowTypes[] = [
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/2 Sent",
      paid: {
        initialValue: "300",
        finalValue: "500",
      },
      status: "1 Overdue",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "2/2 Sent",
      paid: {
        initialValue: "500",
        finalValue: "300",
      },
      status: "Paid",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/2 Sent",
      paid: {
        initialValue: "200",
        finalValue: "500",
      },
      status: "Pending",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/3 Sent",
      paid: {
        initialValue: "500",
        finalValue: "200",
      },
      status: "Paid",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/2 Sent",
      paid: {
        initialValue: "200",
        finalValue: "500",
      },
      status: "1 Overdue",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "2/2 Sent",
      paid: {
        initialValue: "500",
        finalValue: "300",
      },
      status: "Paid",
      editNote: editNote,
    },

    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/2 Sent",
      paid: {
        initialValue: "200",
        finalValue: "500",
      },
      status: "Pending",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/2 Sent",
      paid: {
        initialValue: "300",
        finalValue: "500",
      },
      status: "1 Overdue",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "2/2 Sent",
      paid: {
        initialValue: "500",
        finalValue: "300",
      },
      status: "Paid",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/2 Sent",
      paid: {
        initialValue: "200",
        finalValue: "500",
      },
      status: "Pending",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/3 Sent",
      paid: {
        initialValue: "500",
        finalValue: "200",
      },
      status: "Paid",
      editNote: editNote,
    },
    {
      id: "R-2000",
      customer: "Rahal Ahmed",
      invoiceTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      emailStatus: "1/2 Sent",
      paid: {
        initialValue: "200",
        finalValue: "500",
      },
      status: "1 Overdue",
      editNote: editNote,
    },
    // Add more rows as needed
  ];

  const totalItems = dataToAdd.length;
  const itemsPerPage = 10;

  // const dispatch = useDispatch();
  // const { modal } = useAppSelector((state) => state.global);

  // const MODAL_CONFIG: ModalConfigType = {
  //   [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: <DeleteConfirmation_2 />,
  // };

  // const renderModal = () => {
  //   return MODAL_CONFIG[modal.type] || null;
  // };

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(dataToAdd.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Layout>
        <TableFunctions />
        <TableLayout>
          <TableHeading />
          <TableRows dataToAdd={currentPageRows} />
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
