import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import TableHeadingLeads from "@/components/leads/TableHeadingLeads";
import TableRowLeads from "@/components/leads/TableRowLeads";
import editImage from "@/assets/svgs/edit_image.svg";
import editNote from "@/assets/svgs/Edit_note.svg";

import { Pagination } from "@/base-components/ui/pagination/pagination";
import { TableRowTypes } from "@/types";
import TableFunctions from "./TableFunctions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";

export default function Leads() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<TableRowTypes[]>([]);

  const dataToAdd: TableRowTypes[] = [
    {
      id: 1,
      name: "Rahal Ahmed",
      email: "Test12@gmail.com",
      phone: "+49 302 1231234",
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
      date: "25/08/2023",
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
  const handleNotes = (item: TableRowTypes) => {
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
          <TableHeadingLeads />
          <TableRowLeads dataToAdd={currentPageRows} openModal={handleNotes} />
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
