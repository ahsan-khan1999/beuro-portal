import { Layout } from "@/layout";
import React from "react";
import AddNewLeadsData from "./AddNewLeadsData";

const AddNewLeads = () => {
  return (
    <Layout>
      {/* <p className="mb-5 text-2xl text-[#222B45] font-semibold">
        {translate("leads.add_new_lead")}
      </p> */}

      <AddNewLeadsData />
    </Layout>
  );
};

export default AddNewLeads;
