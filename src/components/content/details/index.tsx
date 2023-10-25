import { Layout } from "@/layout";
import React from "react";
import ContentCard from "../ContentCard";
import ContentDetailsData from "./ContentDetailsData";

const ContentDetails = () => {
  return (
    <Layout>
      <ContentCard />

      <div className="flex mt-7">
        <ContentDetailsData />
      </div>
    </Layout>
  );
};

export default ContentDetails;
