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
import InvoiceEmptyState from "./invoice-empty-state";
enum checkDATA { data, nodata };
import emptyState from "@/assets/svgs/empty-state.svg"
const InvoiceDetails = () => {

  const check = (Currentcomponent: JSX.Element, val: checkDATA) => {

    const isData = {
      [checkDATA.data]: Currentcomponent,
      [checkDATA.nodata]: <InvoiceEmptyState
        imageUrl={emptyState}
        imageAlt="No Data Found"
        emptyName="No Data Found"
        emptyDescription="Whoops ... this information is not avilable for a moment"
      />
    }
    return isData[val];
  };
  const { handleInvoiceCreation, handleNotes, invoiceDetails, offerDeleteHandler, renderModal, setSwitchDetails, switchDetails, collectiveInvoice, handlePaymentStatusUpdate, handleInvoiceStatusUpdate, collectiveReciept, handleEditInvoiceFrequencyCreation, handleRecurringInvoiceCreation, handleStopInvoiceCreation ,handleInvoiceEdit} = useInvoiceDetail()
  const invoiceComponent = {
    "Invoice": check(<InvoiceDetailsTable collectiveInvoice={collectiveInvoice} handleInvoiceStatusUpdate={handleInvoiceStatusUpdate} handlePaymentStatusUpdate={handlePaymentStatusUpdate} handleInvoiceEdit={handleInvoiceEdit}/>, collectiveInvoice?.length === 0 && checkDATA.nodata || checkDATA.data),
    "Receipt": check(<ReceiptDetailsTable collectiveInvoice={collectiveReciept} handleInvoiceStatusUpdate={handleInvoiceStatusUpdate} handlePaymentStatusUpdate={handlePaymentStatusUpdate} />, collectiveReciept?.length === 0 && checkDATA.nodata || checkDATA.data)
  }
  return (
    <>
      <Layout>
        <InvoiceCardLayout>
          <InvoiceDetailsData handleInvoiceCreation={handleInvoiceCreation} invoiceDetails={invoiceDetails} handleNotes={handleNotes} handleEditInvoiceFrequencyCreation={handleEditInvoiceFrequencyCreation} handleRecurringInvoiceCreation={handleRecurringInvoiceCreation} handleStopInvoiceCreation={handleStopInvoiceCreation} />
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
