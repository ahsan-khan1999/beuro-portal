import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import MailDetailsCard from "./MailDetailsCard";

import { useRouter } from "next/router";
import PdfCard from "../invoice/pdf/PdfCard";

const InvoiceMail = () => {
  const router = useRouter();

  const onNextHandle = () => {
    router.push("/invoice/pdf-preview");
  };
  const backRouteHandler = () => {
    router.push("/invoice/details");
  };

  return (
    <Layout>
      <PdfCard />
      <div className="mt-4">
        <ComposeMail
          backRouteHandler={backRouteHandler}
          onNextHandle={onNextHandle}
        />
      </div>
    </Layout>
  );
};

export default InvoiceMail;
