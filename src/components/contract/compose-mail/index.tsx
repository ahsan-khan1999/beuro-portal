import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import { useRouter } from "next/router";

const ContractMail = () => {
  const router = useRouter();

  const backRouteHandler = () => {
    router.push("/contract/details");
  };

  return (
    <Layout>
      <div className="mt-4">
        <ComposeMail backRouteHandler={backRouteHandler} />
      </div>
    </Layout>
  );
};

export default ContractMail;
