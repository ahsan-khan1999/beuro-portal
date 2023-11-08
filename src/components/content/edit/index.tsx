import { Layout } from "@/layout";
import React from "react";
import ContentCard from "../ContentCard";
import useContentDetail from "@/hooks/content/useContentDetail";

const ContentEditDetails = () => {
  const { contentDetail } = useContentDetail();
  return (
    <Layout>
      <ContentCard contentDetail={contentDetail} />
    </Layout>
  );
};

export default ContentEditDetails;
