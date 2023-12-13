import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import usePayments from "@/hooks/admin/payments/usePayments";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import MonthSelect from "@/base-components/ui/modals1/MonthSelect";
import { useTranslation } from "next-i18next";
import DownloadModal from "@/base-components/ui/modals1/DownloadModal";

export default function Payments() {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage } =
    usePayments();
  const { t: translate } = useTranslation();

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleSelectMonth = () => {
    dispatch(updateModalType(ModalType.SELECT_MONTH));
  };

  const handleDownload = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.DOWNLOAD_MODAL));
  };

  const route = () => {
    onClose();
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.SELECT_MONTH]: (
      <MonthSelect onClose={onClose} handleDownload={handleDownload} />
    ),
    [ModalType.DOWNLOAD_MODAL]: (
      <DownloadModal
        onClose={onClose}
        heading={translate("common.download_modal.heading")}
        subHeading={translate("common.download_modal.sub_heading")}
        button={translate("common.download_modal.button")}
        route={route}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        <TableFunctions handleSelectMonth={handleSelectMonth} />
        <TableLayout>
          <TableHeading />
          <TableRow currentPageRows={currentPageRows} />
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
