import { Layout } from "@/layout";
import InvoiceDetailsData from "./InvoiceDetailsData";
import InvoiceCardLayout from "@/layout/invoice";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import InvoiceDetailsTable from "./invoice/table";
import ReceiptDetailsTable from "./receipt/table";
import useInvoiceDetail from "@/hooks/invoice/useInvoiceDetail";
import { useEmptyStates } from "@/utils/hooks";

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
  } = useInvoiceDetail();

  const invoiceComponent = {
    invoice_tab: {
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
    receipt_tab: {
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

        <div className="flex mt-[12px] mb-[18px]">
          <DetailsSwitchBtn
            activeTab={activeTab}
            onComponentChange={setActiveTab}
          />
        </div>
        {CurrentComponent}
      </Layout>
      {renderModal()}
    </>
  );
};

export default InvoiceDetails;
