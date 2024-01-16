import { Layout } from "@/layout";
import React from "react";
import AddNewLeadsData from "./AddNewLeadsData";
import { useTranslation } from "next-i18next";

const AddNewLeads = () => {
  const { t: translate } = useTranslation();
  return (
    <Layout>
      <p className="mt-5 font-normal text-xl text-[#222B45]">
        {translate("leads.add_new_lead")}
      </p>
      <AddNewLeadsData />
    </Layout>
  );
};

export default AddNewLeads;
