import { Layout } from "@/layout";
import React from "react";
import ContentAddDetailsData from "./ContentAddDetailsData";
import { useTranslation } from "next-i18next";

const ContentAddDetails = () => {
  const { t: translation } = useTranslation();
  return (
    <>
      <Layout>
        <p className="text-xl font-normal text-[#222B45]">
          {translation("content.create_content")}
        </p>
        <div className="mt-4">
          <ContentAddDetailsData />
        </div>
      </Layout>
    </>
  );
};

export default ContentAddDetails;
