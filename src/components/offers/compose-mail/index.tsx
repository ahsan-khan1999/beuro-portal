import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import MailDetailsCard from "./MailDetailsCard";

import { useRouter } from "next/router";

const OfferEmail = () => {
  const router = useRouter();

  const onNextHandle = () => {
    router.push("/offer/pdf-preview");
  };
  const backRouteHandler = () => {
    router.push("/offer/details");
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

export default OfferEmail;
