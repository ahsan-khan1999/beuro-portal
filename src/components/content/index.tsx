import React, { useEffect, useState } from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import { ContentTableRowTypes } from "@/types";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreateNewPassword from "@/base-components/ui/modals1/CreateNewPassword";
import TableHeadings from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import TopBar from "./table/TopBar";

export default function Content() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<
    ContentTableRowTypes[]
  >([]);

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

  const contentData: ContentTableRowTypes[] = [
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
    {
      id: "001",
      name: "Text For Contract",
      contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
      createdOn: parseCustomDate("25/08/2023"),
    },
  ];

  const totalItems = contentData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      contentData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.NEW_PASSWORD]: <CreateNewPassword />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    dispatch(updateModalType(ModalType.NEW_PASSWORD));
  }, []);

  return (
    <>
      <Layout>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl text-[#222B45] ">Content</h1>
          <TopBar />
        </div>
        <TableLayout>
          <TableHeadings />
          <TableRows contentData={currentPageRows} />
        </TableLayout>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Layout>
      {/* {renderModal()} */}
    </>
  );
}
