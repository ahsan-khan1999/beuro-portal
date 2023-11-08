import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import MailDetailsCard from "./MailDetailsCard";

import { useRouter } from "next/router";

const ContractMail = () => {
  const router = useRouter();

  const onNextHandle = () => {
    router.push("/contract/pdf-preview");
  };
  const backRouteHandler = () => {
    router.push("/contract/details");
  };

  return (
    <Layout>
      <MailDetailsCard />
      <div className="mt-4">
        <ComposeMail
          backRouteHandler={backRouteHandler}
          onNextHandle={onNextHandle}
        />
      </div>
    </Layout>
  );
};

export default ContractMail;
