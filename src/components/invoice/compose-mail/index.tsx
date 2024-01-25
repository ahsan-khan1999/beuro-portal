import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import MailDetailsCard from "./MailDetailsCard";

import { useRouter } from "next/router";
import InvoiceCardLayout from "@/layout/invoice";
import InvoiceDetailsData from "../details/InvoiceDetailsData";
import { useInvoiceEmail } from "@/hooks/invoice/useInvoiceEmail";
import { useAppSelector } from "@/hooks/useRedux";
import LoadingState from "@/base-components/loadingEffect/loading-state";

const InvoiceEmail = () => {
  const router = useRouter();

  const { loading } = useAppSelector((state) => state.invoice);
  return (
    <Layout>
      <InvoiceCardLayout>
        <MailDetailsCard />
      </InvoiceCardLayout>

      <div className="flex mt-[12px] mb-[18px]">
        <ComposeMail />
      </div>

    </Layout>
  );
};

export default InvoiceEmail;
