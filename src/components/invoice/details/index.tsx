import { Layout } from "@/layout";
import InvoiceDetailsData from "./InvoiceDetailsData";
import InvoiceCardLayout from "@/layout/invoice";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import InvoiceDetailsTable from "./invoice/table";
import ReceiptDetailsTable from "./receipt/table";
import useInvoiceDetail from "@/hooks/invoice/useInvoiceDetail";
import { useEmptyStates } from "@/utils/hooks";
import { PendingInvoice } from "./PendingInvoice";
import { useEffect, useState } from "react";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const InvoiceDetails = () => {
  const {
    handleInvoiceCreation,
    handleNotes,
    invoiceDetails,
    renderModal,
    activeTab,
    setActiveTab,
    collectiveInvoice,
    handlePaymentStatusUpdate,
    handleInvoiceStatusUpdate,
    collectiveReciept,
    handleEditInvoiceFrequencyCreation,
    handleRecurringInvoiceCreation,
    handleStopInvoiceCreation,
    handleInvoiceEdit,
    handleSendEmail,
    handleRecurringInvoiceEdit,
    loading,
    systemSettings,
    handleInvoiceUpdate,
    totalCount,
  } = useInvoiceDetail();

  const invoiceComponent = {
    invoice: {
      comp: (
        <InvoiceDetailsTable
          collectiveInvoice={collectiveInvoice}
          handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
          handleInvoiceEdit={handleInvoiceEdit}
          handleRecurringInvoiceEdit={handleRecurringInvoiceEdit}
        />
      ),
      isData: collectiveInvoice?.length > 0,
    },
    receipt: {
      comp: (
        <ReceiptDetailsTable
          collectiveInvoice={collectiveReciept}
          handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
        />
      ),
      isData: collectiveReciept?.length > 0,
    },
  };

  const CurrentComponent = useEmptyStates(
    invoiceComponent[activeTab as keyof typeof invoiceComponent].comp,
    invoiceComponent[activeTab as keyof typeof invoiceComponent].isData,
    loading
  );

  const shouldShowPendingInvoice =
    !collectiveInvoice?.length && !collectiveReciept?.length;

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
            currency={systemSettings?.currency}
            handleInvoiceEdit={handleInvoiceUpdate}
          />
        </InvoiceCardLayout>

        <div className="flex my-3">
          <DetailsSwitchBtn
            activeTab={activeTab}
            onComponentChange={setActiveTab}
          />
        </div>

        {shouldShowPendingInvoice ? (
          <PendingInvoice handleInvoiceCreation={handleInvoiceCreation} />
        ) : (
          CurrentComponent
        )}
      </Layout>
      {renderModal()}
    </>
  );
};

export default InvoiceDetails;
