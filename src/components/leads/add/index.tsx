import { Layout } from "@/layout";
import React from "react";
import AddNewLeadsData from "./AddNewLeadsData";
import { useTranslation } from "next-i18next";

const AddNewLeads = () => {
  const { t: translate } = useTranslation();
  return (
    <Layout>
      <AddNewLeadsData />
    </Layout>
  );
};

export default AddNewLeads;
