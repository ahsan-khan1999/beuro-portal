import React from "react";
import { Layout } from "@/layout";
import { CreateInvoice } from "./CreateInvoiceDetailsData";

export const InvoiceCreateDetail = () => {
  return (
    <Layout>
      {/* <p className="mb-5 text-2xl text-[#222B45] font-semibold">
        {translate("common.add_new_invoice")}
      </p> */}
      <CreateInvoice />
    </Layout>
  );
};
