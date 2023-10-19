import { Layout } from "@/layout";
import React, { useEffect, useState } from "react";
import InvoiceDetailsData from "./invoice/InvoiceDetailsData";
import InvoiceCardLayout from "@/layout/invoice";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import InvoiceDetailsTable from "./invoice/table";
import ReceiptDetailsTable from "./receipt/table";
import ReceiptDetailsData from "./receipt/ReceiptDetailsData";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import InvoiceCreated from "@/base-components/ui/modals1/InvoiceCreated";

const InvoiceDetails = () => {
  const [switchDetails, setSwitchDetails] = useState("Invoice");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.INVOICE_CREATED]: <InvoiceCreated />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    dispatch(updateModalType(ModalType.INVOICE_CREATED));
  }, []);

  return (
    <>
      <Layout>
        {switchDetails.includes("Invoice") ? (
          <InvoiceCardLayout>
            <InvoiceDetailsData setShowModal={setShowModal} />
          </InvoiceCardLayout>
        ) : (
          <InvoiceCardLayout>
            <ReceiptDetailsData />
          </InvoiceCardLayout>
        )}
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
      {showModal && renderModal()}
    </>
  );
};

export default InvoiceDetails;
