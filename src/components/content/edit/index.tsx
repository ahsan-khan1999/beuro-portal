import { Layout } from "@/layout";
import React from "react";
import ContentCard from "../ContentCard";
import ContentEditDetailsData from "./ContentEditDetailsData";
import useContentDetail from "@/hooks/content/useContentDetail";

const ContentEditDetails = () => {
  const { contentDetail } = useContentDetail();
  return (
    <Layout>
      <ContentCard contentDetail={contentDetail} />

      <div className="flex mt-7">
        <ContentEditDetailsData contentDetail={contentDetail} />
      </div>
    </Layout>
  );
};

export default ContentEditDetails;
