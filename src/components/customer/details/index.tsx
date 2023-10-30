import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import FormData from "./FormData";

import useCustomerDetail from "@/hooks/customer/useCustomerDetail";

const CustomerDetails = () => {
  const { customerDetail } = useCustomerDetail()
  
  return (
    <Layout>
      <DetailsCard>
        <DetailsData date={customerDetail?.date} id={customerDetail?.id} name={customerDetail?.name} />
      </DetailsCard>
      <div className="flex mt-8">
        <FormData {...customerDetail} />
        <SideCard />
      </div>
    </Layout>
  );
};

export default CustomerDetails;
