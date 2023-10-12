import { Layout } from "@/layout";
import React from "react";
import AddNewLeadsData from "./AddNewLeadsData";

const AddNewLeads = () => {
  return (
    <Layout>
      <p className="mt-5 font-normal text-[20px] leading-6 text-[#222B45]">Add New Lead</p>
      <div className="mt-[22px]">
        <AddNewLeadsData />
      </div>
    </Layout>
  );
};

export default AddNewLeads;
