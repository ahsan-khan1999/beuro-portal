import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import MailDetailsCard from "./MailDetailsCard";

import { useRouter } from "next/router";
import InvoiceCardLayout from "@/layout/invoice";
import InvoiceDetailsData from "../details/InvoiceDetailsData";
import { useInvoiceEmail } from "@/hooks/invoice/useInvoiceEmail";

const InvoiceEmail = () => {
  const router = useRouter();

  const onNextHandle = () => {
    router.push("/contract/pdf-preview");
  };
  const backRouteHandler = () => {
    router.push("/contract/details");
  };

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

export default InvoiceEmail;