import { Layout } from "@/layout";
import React from "react";
import ContentAddDetailsData from "./ContentAddDetailsData";

const ContentAddDetails = () => {
  return (
    <Layout>
      <p className="mb-5 text-2xl text-[#222B45] font-semibold">
        {translate("content.create_content")}
      </p>
      <ContentAddDetailsData />
    </Layout>
  );
};

export default ContentAddDetails;
