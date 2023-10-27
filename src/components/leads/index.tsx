import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import editImage from "@/assets/svgs/edit_image.svg";
import editNote from "@/assets/svgs/Edit_note.svg";

import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import TableRows from "./table/TableRows";
import TableHeadings from "./table/TableHeadings";
import { LeadsTableRowTypes } from "@/types/leads";

export default function Leads() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<LeadsTableRowTypes[]>(
    []
  );


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

  const dataToAdd: LeadsTableRowTypes[] = [
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Close",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Close",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Expired",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Expired",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Expired",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Close",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Close",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      createdOn: parseCustomDate("25/08/2023"),
      location: "Islamabad",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },

    // Add more rows as needed
  ];

  const totalItems = dataToAdd.length;
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // Function for handling the modal for exiting notes
  const handleNotes = (item: LeadsTableRowTypes) => {
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
          <TableHeadings />
          <TableRows dataToAdd={currentPageRows} openModal={handleNotes} />
        </TableLayout>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Layout>
      {renderModal()}
    </>
  );
}
