import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import TableHeadings from "@/components/contract/table/TableHeading";
import editImage from "@/assets/svgs/edit_image.svg";
import editNote from "@/assets/svgs/Edit_note.svg";

import { Pagination } from "@/base-components/ui/pagination/pagination";
import { TableRowTypes, contractTableTypes } from "@/types";
import TableFunctions from "./table/TableFunctions";
import TableRows from "./table/TableRows";
import EmailForm from "./EmailForm";
import EmailPriview from "./emailPriview";
import CkEditor from "@/base-components/ui/editor/ck-editor";
import { useDispatch } from "react-redux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";

export default function Contract() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<TableRowTypes[]>([]);

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

  const dataToAdd: contractTableTypes[] = [
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Cash",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Online",
      status: "Confirmed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Cash",
      status: "Cancelled",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Online",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Online",
      status: "Confirmed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Cash",
      status: "Cancelled",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Online",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Cash",
      status: "Confirmed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Online",
      status: "Confirmed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Cash",
      status: "Cancelled",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Online",
      status: "Confirmed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Cash",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "V-2000",
      customer: "Rahal Ahmed",
      contractTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      payment: "Online",
      status: "Cancelled",
      editImg: editImage,
      editNote: editNote,
    },

    // Add more rows as needed
  ];

  const totalItems = dataToAdd.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(dataToAdd.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // Function for handling the modal for exiting notes
  const handleNotes = (item: contractTableTypes) => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.EXISTING_NOTES));
  };

  // function for hnadling the add note
  const handleAddNote = () => {
    dispatch(updateModalType(ModalType.ADD_NOTE));
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} />
    ),
    [ModalType.ADD_NOTE]: <AddNewNote onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        <TableFunctions />
        <TableLayout>
          <TableHeadings />
          <TableRows dataToAdd={currentPageRows} openModal={handleNotes}/>
        </TableLayout>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />

        {/* <EmailForm />
        <EmailPriview /> */}
      </Layout>

      {renderModal()}
    </>
  );
}
