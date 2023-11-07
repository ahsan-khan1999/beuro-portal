import { Layout } from "@/layout";
import React from "react";
import ContentCard from "../ContentCard";
import ContentDetailsData from "./ContentDetailsData";
import useContentDetail from "@/hooks/content/useContentDetail";

const ContentDetails = () => {
  const { contentDetail } = useContentDetail();
  return (
    <Layout>
      <ContentCard contentDetail={contentDetail} />

      <div className="flex mt-7">
        <ContentDetailsData contentDetail={contentDetail} />
      </div>
    </Layout>
  );
};

export default ContentDetails;
