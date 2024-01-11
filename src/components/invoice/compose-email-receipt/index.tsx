import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import InvoiceCardLayout from "@/layout/invoice";
import MailDetailsCard from "./MailDetailsCard";
import { useReceiptPdf } from "@/hooks/invoice/useReceiptPdf";

const ReceiptEmail = () => {
  const { loading, activeButtonId, router, handleEmailSend, handleSendByPost } =
    useReceiptPdf();

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
          <MailDetailsCard
            onEmailSend={handleEmailSend}
            loading={loading}
            onSendViaPost={handleSendByPost}
            activeButtonId={activeButtonId}
          />
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
