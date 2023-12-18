import { Layout } from "@/layout";
import React from "react";
import ContentCard from "../ContentCard";
import ContentDetailsData from "./ContentDetailsData";
import useContentDetail from "@/hooks/content/useContentDetail";

const ContentDetails = () => {
  const { contentDetails, contentDeleteHandler, renderModal } =
    useContentDetail();
  return (
    <Layout>
      <ContentCard
        contentDetails={contentDetails}
        contentDeleteHandler={contentDeleteHandler}
      />
      <ContentDetailsData contentDetails={contentDetails} />
      {renderModal()}
    </Layout>
  );
};

export default ContentDetails;
