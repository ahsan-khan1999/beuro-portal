import { Layout } from "@/layout";
import React, { useState } from "react";
import InvoiceDetailsData from "./InvoiceDetailsData";
import InvoiceCardLayout from "@/layout/invoice";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import InvoiceDetailsTable from "./invoice/table";
import ReceiptDetailsTable from "./receipt/table";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import InvoiceCreated from "@/base-components/ui/modals1/InvoiceCreated";
import InvoiceCreatedSuccessfully from "@/base-components/ui/modals1/InvoiceCreatedSuccessfully";

const InvoiceDetails = () => {
  const [switchDetails, setSwitchDetails] = useState("Invoice");

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleInvoiceCreation = () => {
    dispatch(updateModalType(ModalType.INVOICE_CREATE));
  };

  const invoiceCreated = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.INVOICE_CREATED_SUCCESSFULLY));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.INVOICE_CREATE]: (
      <InvoiceCreated onClose={onClose} invoiceCreated={invoiceCreated} />
    ),
    [ModalType.INVOICE_CREATED_SUCCESSFULLY]: (
      <InvoiceCreatedSuccessfully onClose={onClose} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        {/* {switchDetails.includes("Invoice") ? (
          <InvoiceCardLayout>
            <InvoiceDetailsData handleInvoiceCreation={handleInvoiceCreation} />
          </InvoiceCardLayout>
        ) : (
          <InvoiceCardLayout>
            <ReceiptDetailsData />
          </InvoiceCardLayout>
        )} */}

        <InvoiceCardLayout>
          <InvoiceDetailsData handleInvoiceCreation={handleInvoiceCreation} />
        </InvoiceCardLayout>
        <div className="flex mt-[12px] mb-[18px]">
          <DetailsSwitchBtn
            switchDetails={switchDetails}
            setSwitchDetails={setSwitchDetails}
          />
        </div>

        {switchDetails.includes("Invoice") ? (
          <InvoiceDetailsTable />
        ) : (
          <ReceiptDetailsTable />
        )}
      </Layout>
      {renderModal()}
    </>
  );
};

export default InvoiceDetails;
