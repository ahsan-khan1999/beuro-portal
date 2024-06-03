import { Layout } from "@/layout";
import React from "react";
import ContentCard from "../ContentCard";
import ContentDetailsData from "./ContentDetailsData";
import useContentDetail from "@/hooks/content/useContentDetail";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const ContentDetails = () => {
  const { contentDetails, contentDeleteHandler, renderModal, loading } =
    useContentDetail();

  return (
    <Layout>
      <div className="bg-white rounded-md px-5 pt-5 pb-10 maxSize:fixed maxSize:-mt-[240px] maxSize:border-t-[14px] border-t-defaultBackground contentCalWidth z-10">
        <ContentCard
          contentDetails={contentDetails}
          contentDeleteHandler={contentDeleteHandler}
        />
      </div>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="maxSize:mt-[320px] w-full maxSize:block">
          <ContentDetailsData />
        </div>
      )}
      {renderModal()}
    </Layout>
  );
};

export default ContentDetails;
