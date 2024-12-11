import { Layout } from "@/layout";
import React from "react";
import ComposeMail from "./ComposeMail";
import { useRouter } from "next/router";

const OfferEmail = () => {
  const router = useRouter();

  const backRouteHandler = () => {
    router.push("/offer/details");
  };

  return (
    <Layout>
      <div className="mt-4">
        <ComposeMail backRouteHandler={backRouteHandler} />
      </div>
    </Layout>
  );
};

export default OfferEmail;
