import React from "react";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import Form from "../Form";

const EmployDetailsEdit = () => {
  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <Form />
        <SideCard />
      </div>
    </Layout>
  );
};

export default EmployDetailsEdit;
