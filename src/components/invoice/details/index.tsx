import { Layout } from "@/layout";
import React, { useState } from "react";
import InvoiceDetailsData from "./InvoiceDetailsData";
import InvoiceCardLayout from "@/layout/invoice";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import InvoiceDetailsTable from "./invoice/table";
import ReceiptDetailsTable from "./receipt/table";
import useInvoiceDetail from "@/hooks/invoice/useInvoiceDetail";

enum CheckData {
  data,
  nodata,
}
import emptyState from "@/assets/svgs/empty-state.svg";
import ComposeMail from "./compose-mail/ComposeMail";
import NoDataEmptyState from "./invoice-empty-state";
const InvoiceDetails = () => {
  const check = (Currentcomponent: JSX.Element, val: CheckData) => {
    const isData = {
      [CheckData.data]: Currentcomponent,
      [CheckData.nodata]: <NoDataEmptyState />,
    };
    return isData[val];
  };

  const {
    handleInvoiceCreation,
    handleNotes,
    invoiceDetails,
    offerDeleteHandler,
    renderModal,
    setSwitchDetails,
    switchDetails,
    collectiveInvoice,
    handlePaymentStatusUpdate,
    handleInvoiceStatusUpdate,
    collectiveReciept,
    handleEditInvoiceFrequencyCreation,
    handleRecurringInvoiceCreation,
    handleStopInvoiceCreation,
    handleInvoiceEdit,
    handleSendEmail,
    isSendEmail,
    onNextHandle,
    setIsSendEmail,
  } = useInvoiceDetail();
  const invoiceComponent = {
    Invoice: check(
      <InvoiceDetailsTable
        collectiveInvoice={collectiveInvoice}
        handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
        handlePaymentStatusUpdate={handlePaymentStatusUpdate}
        handleInvoiceEdit={handleInvoiceEdit}
      />,
      (collectiveInvoice?.length === 0 && CheckData.nodata) || CheckData.data
    ),
    Receipt: check(
      <ReceiptDetailsTable
        collectiveInvoice={collectiveReciept}
        handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
        handlePaymentStatusUpdate={handlePaymentStatusUpdate}
      />,
      (collectiveReciept?.length === 0 && CheckData.nodata) || CheckData.data
    ),
  };
  return (
    <>
      <Layout>
        <InvoiceCardLayout>
          <InvoiceDetailsData
            handleInvoiceCreation={handleInvoiceCreation}
            invoiceDetails={invoiceDetails}
            handleNotes={handleNotes}
            handleEditInvoiceFrequencyCreation={
              handleEditInvoiceFrequencyCreation
            }
            handleRecurringInvoiceCreation={handleRecurringInvoiceCreation}
            handleStopInvoiceCreation={handleStopInvoiceCreation}
            handleSendEmail={handleSendEmail}
          />
        </InvoiceCardLayout>
        {isSendEmail ? (
          <ComposeMail
            backRouteHandler={handleSendEmail}
            onNextHandle={onNextHandle}
          />
        ) : (
          <>
            <div className="flex mt-[12px] mb-[18px]">
              <DetailsSwitchBtn
                switchDetails={switchDetails}
                setSwitchDetails={setSwitchDetails}
              />
            </div>

            {invoiceComponent[switchDetails as keyof typeof invoiceComponent]}
          </>
        )}
      </Layout>
      {renderModal()}
    </>
  );
};

export default InvoiceDetails;
