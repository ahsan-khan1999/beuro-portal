import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import InvoiceCardLayout from "@/layout/invoice";
import MailDetailsCard from "./MailDetailsCard";

const ReceiptEmail = () => {
  return (
    <Layout>
      <InvoiceCardLayout>
        <MailDetailsCard />
      </InvoiceCardLayout>

      <div className="flex mt-5 mb-[18px]">
        <ComposeMail />
      </div>
    </Layout>
  );
};

export default ReceiptEmail;
