import { Layout } from "@/layout";
import React from "react";
import ContentCard from "../ContentCard";
import ContentEditDetailsData from "./ContentEditDetailsData";

const ContentEditDetails = () => {
  return (
    <Layout>
      <ContentCard />

      <div className="flex mt-7">
        <ContentEditDetailsData />
      </div>
    </Layout>
  );
};

export default ContentEditDetails;
