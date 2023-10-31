import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import editImage from "@/assets/svgs/edit_image.svg";
import editNote from "@/assets/svgs/Edit_note.svg";

import { Pagination } from "@/base-components/ui/pagination/pagination";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import { OffersTableRowTypes } from "@/types/offers";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";

export default function Offers() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<OffersTableRowTypes[]>(
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

  const dataToAdd: OffersTableRowTypes[] = [
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Draft",
      payment: "Cash",
      status: "Open",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Send",
      payment: "Cash",
      status: "Signed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Faild",
      payment: "Cash",
      status: "Expired",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Draft",
      payment: "Cash",
      status: "Rejected",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Send",
      payment: "Cash",
      status: "Signed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Faild",
      payment: "Cash",
      status: "Expired",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Draft",
      payment: "Cash",
      status: "Rejected",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Send",
      payment: "Cash",
      status: "Signed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Faild",
      payment: "Cash",
      status: "Expired",
      editImg: editImage,
      editNote: editNote,
    },

    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Faild",
      payment: "Cash",
      status: "Expired",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Draft",
      payment: "Cash",
      status: "Rejected",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Send",
      payment: "Cash",
      status: "Signed",
      editImg: editImage,
      editNote: editNote,
    },
    {
      id: "A-2000",
      customer: "Rahal Ahmed",
      offerTitle: "Umzug Cleaning Service",
      totalPrice: "1000 CHF",
      createdOn: parseCustomDate("25/08/2023"),
      email: "Faild",
      payment: "Cash",
      status: "Expired",
      editImg: editImage,
      editNote: editNote,
    },

    // Add more rows as needed
  ];

  const totalItems = dataToAdd.length;
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleAddNote = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.ADD_NOTE));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleImagesUpload = (item: OffersTableRowTypes) => {
    dispatch(updateModalType(ModalType.UPLOADS_IMAGES));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} />
    ),
    [ModalType.ADD_NOTE]: <AddNewNote onClose={onClose} />,
    [ModalType.UPLOADS_IMAGES]: <ImagesUpload onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleNotes = (item: OffersTableRowTypes) => {
    dispatch(updateModalType(ModalType.EXISTING_NOTES));
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
          <TableHeading />
          <TableRows dataToAdd={currentPageRows} openModal={handleNotes} handleImagesUpload={handleImagesUpload}/>
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
