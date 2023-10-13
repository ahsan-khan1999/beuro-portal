import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";

import { Pagination } from "@/base-components/ui/pagination/pagination";
import { TableRowEmailTracker, TableRowTypes } from "@/types";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { closeModal } from "../../utils/hooks";
import DeleteConfirmation_1 from "../../base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "../../base-components/ui/modals1/DeleteConfirmation_2";

export default function EmailTracker() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const { modal } = useAppSelector((state) => state.global);
  const [currentPageRows, setCurrentPageRows] = useState<
    TableRowEmailTracker[]
  >([]);


  const { modal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const dataToAdd: TableRowEmailTracker[] = [
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Pending",
        colorClass: "#FE9244",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Failed",
        colorClass: "#FF376F",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Failed",
        colorClass: "#FF376F",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Pending",
        colorClass: "#FE9244",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Pending",
        colorClass: "#FE9244",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "open",
        colorClass: "#45C769",
      },
    },
    {
      id: 1,
      recipient: "Rahal Ahmed",
      subject: "Test12@gmail.com",
      sendAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      viewedAt: {
        time: "08:34am",
        date: "25/08/2023",
      },
      status: {
        text: "Failed",
        colorClass: "#FF376F",
      },
    },

    // Add more rows as needed
  ];

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_TRACKER]: <DeleteConfirmation_2 />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  
  const totalItems = dataToAdd.length;
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(updateModalType(ModalType.EMAIL_TRACKER));
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(dataToAdd.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage]);
  console.log(modal, "modal", renderModal());

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return <Layout>{renderModal()}</Layout>;
}
