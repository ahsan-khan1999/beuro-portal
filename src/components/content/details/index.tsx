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

      <div className=" mt-7">
        <ContentDetailsData contentDetails={contentDetails} />
      </div>
      {renderModal()}
    </Layout>
  );
};

export default ContentDetails;
