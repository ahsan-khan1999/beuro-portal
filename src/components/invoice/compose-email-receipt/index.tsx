import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";

import { useRouter } from "next/router";
import InvoiceCardLayout from "@/layout/invoice";
import InvoiceDetailsData from "../details/InvoiceDetailsData";
import { useInvoiceEmail } from "@/hooks/invoice/useInvoiceEmail";
import MailDetailsCard from "./MailDetailsCard";
import { useAppSelector } from "@/hooks/useRedux";
import LoadingState from "@/base-components/loadingEffect/loading-state";

const ReceiptEmail = () => {
  const router = useRouter();

  const onNextHandle = () => {
    router.push("/contract/pdf-preview");
  };
  const backRouteHandler = () => {
    router.push("/contract/details");
  };
  const { loading } = useAppSelector(state => state.invoice)

  return (
    <>

      <Layout>
        <InvoiceCardLayout>
          <MailDetailsCard />

        </InvoiceCardLayout>

        <div className="flex mt-[12px] mb-[18px]">
          <ComposeMail
            backRouteHandler={backRouteHandler}
            onNextHandle={onNextHandle}
          />
        </div>
      </Layout>
    </>


  );
};

export default ReceiptEmail;
