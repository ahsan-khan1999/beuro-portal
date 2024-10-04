import { Layout } from "@/layout";
import InvoiceDetailsData from "./InvoiceDetailsData";
import InvoiceCardLayout from "@/layout/invoice";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import InvoiceDetailsTable from "./invoice/table";
import ReceiptDetailsTable from "./receipt/table";
import useInvoiceDetail from "@/hooks/invoice/useInvoiceDetail";
import { useEmptyStates } from "@/utils/hooks";
import { PendingInvoice } from "./PendingInvoice";
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
    loadingInvoice,
    loadingReceipt,
    handlePaymentStatusChange,
    handleDeleteInvoice,
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
          onPaymentStatusChange={handlePaymentStatusChange}
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

  const invoiceTotalAmount =
    invoiceDetails?.total - Number(invoiceDetails?.paidAmount);

  const shouldShowPendingInvoice =
    activeTab === "invoice"
      ? ((!loading || !loadingInvoice || !loadingReceipt) &&
          collectiveInvoice?.length === 0 &&
          invoiceTotalAmount > 0) ||
        !collectiveReciept?.map((item) => item.invoiceStatus !== "Paid")
      : false;

  return (
    <Layout>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
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
              onDeleteHandler={handleDeleteInvoice}
            />
          </InvoiceCardLayout>

          <div className="flex my-3">
            <DetailsSwitchBtn
              activeTab={activeTab}
              onComponentChange={setActiveTab}
            />
          </div>
          {loading || loadingInvoice || loadingReceipt ? (
            <CustomLoader />
          ) : shouldShowPendingInvoice ? (
            <PendingInvoice handleInvoiceCreation={handleInvoiceCreation} />
          ) : (
            CurrentComponent
          )}
        </>
      )}

      {renderModal()}
    </Layout>
  );
};

export default InvoiceDetails;
