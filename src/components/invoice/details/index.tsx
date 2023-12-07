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
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import useInvoiceDetail from "@/hooks/invoice/useInvoiceDetail";

const InvoiceDetails = () => {
  const { handleInvoiceCreation, handleNotes, invoiceDetails, offerDeleteHandler, renderModal, setSwitchDetails, switchDetails ,collectiveInvoice,handlePaymentStatusUpdate,handleInvoiceStatusUpdate,collectiveReciept} = useInvoiceDetail()
  const invoiceComponent = {
    "Invoice": <InvoiceDetailsTable collectiveInvoice={collectiveInvoice} handleInvoiceStatusUpdate={handleInvoiceStatusUpdate} handlePaymentStatusUpdate={handlePaymentStatusUpdate}/>,
    "Receipt": <ReceiptDetailsTable collectiveInvoice={collectiveReciept} handleInvoiceStatusUpdate={handleInvoiceStatusUpdate} handlePaymentStatusUpdate={handlePaymentStatusUpdate}/>
  }
  return (
    <>
      <Layout>
        <InvoiceCardLayout>
          <InvoiceDetailsData handleInvoiceCreation={handleInvoiceCreation} invoiceDetails={invoiceDetails} handleNotes={handleNotes}/>
        </InvoiceCardLayout>
        <div className="flex mt-[12px] mb-[18px]">
          <DetailsSwitchBtn
            switchDetails={switchDetails}
            setSwitchDetails={setSwitchDetails}
          />
        </div>

        {invoiceComponent[switchDetails as keyof typeof invoiceComponent]}
      </Layout>
      {renderModal()}
    </>
  );
};

export default InvoiceDetails;
