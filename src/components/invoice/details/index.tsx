import { Layout } from "@/layout";
import React, { useState } from "react";
import InvoiceDetailsData from "./invoice/InvoiceDetailsData";
import InvoiceCardLayout from "@/layout/invoice";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import InvoiceDetailsTable from "./invoice/table";
import ReceiptDetailsTable from "./receipt/table";
import ReceiptDetailsData from "./receipt/ReceiptDetailsData";

const InvoiceDetails = () => {
  const [switchDetails, setSwitchDetails] = useState("Invoice");

  return (
    <>
      <Layout>
        {switchDetails.includes("Invoice") ? (
          <InvoiceCardLayout>
            <InvoiceDetailsData />
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
      {/* {renderModal()} */}
    </>
  );
};

export default InvoiceDetails;
