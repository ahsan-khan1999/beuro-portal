import { Layout } from "@/layout";
import React from "react";
import ContentCard from "../ContentCard";
import useContentDetail from "@/hooks/content/useContentDetail";

const ContentEditDetails = () => {
  const { contentDetails, contentDeleteHandler } = useContentDetail();
  return (
    <Layout>
      <ContentCard contentDetails={contentDetails} contentDeleteHandler={contentDeleteHandler} />
    </Layout>
  );
};

export default ContentEditDetails;
