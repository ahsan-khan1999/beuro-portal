import React from "react";
import { Layout } from "@/layout";
import { CreateInvoice } from "./CreateInvoiceDetailsData";
import { useTranslation } from "next-i18next";

export const InvoiceCreateDetail = () => {
  const { t: translate } = useTranslation();

  return (
    <Layout>
      <p className="mb-5 text-2xl text-[#222B45] font-semibold">
        {translate("common.add_new_invoice")}
      </p>
      <CreateInvoice />
    </Layout>
  );
};
