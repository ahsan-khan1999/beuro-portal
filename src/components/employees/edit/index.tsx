import React from "react";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import EmployeeEditDetails from "./EmployeeEditDetails";
import { useRouter } from "next/router";
import useEmployeeDetail from "@/hooks/employee/useEmployeeDetail";

const EmployDetailsEdit = () => {
  const router = useRouter();

  // funtion for handling the route
  const routeHandler = () => {
    router.push({
      pathname: "/employees/details",
      query: { employee: employeeDetail.id },
    });
  };
  const { employeeDetail } = useEmployeeDetail();

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          date={employeeDetail?.createdOn}
          id={employeeDetail?.id}
          name={employeeDetail?.name}
        />
      </DetailsCard>
      <div className="flex mt-8">
        <EmployeeEditDetails
          routeHandler={routeHandler}
          employeeDetail={employeeDetail}
        />
        <SideCard />
      </div>
    </Layout>
  );
};

export default EmployDetailsEdit;
