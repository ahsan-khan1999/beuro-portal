import React from "react";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import EmployeeEditDetails from "./EmployeeEditDetails";
import { useRouter } from "next/router";

const EmployDetailsEdit = () => {
  const router = useRouter();

  // funtion for handling the route
  const routeHandler = () => {
    router.push("/employees/details");
  };

  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <EmployeeEditDetails routeHandler={routeHandler} />
        <SideCard />
      </div>
    </Layout>
  );
};

export default EmployDetailsEdit;
