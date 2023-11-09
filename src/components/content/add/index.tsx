import { Layout } from "@/layout";
import React from "react";
import ContentAddDetailsData from "./ContentAddDetailsData";

const ContentAddDetails = () => {
  return (
    <>
      <Layout>
        <p className="text-xl font-normal text-[#222B45]">Create Content</p>
        <div className="mt-4">
          <ContentAddDetailsData />
        </div>
      </Layout>
    </>
  );
};

export default ContentAddDetails;
