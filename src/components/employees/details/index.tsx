import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import FormData from "./FormData";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import useEmployeeDetail from "@/hooks/employee/useEmployeeDetail";

const EmploysDetails = () => {
  const { employeeDetail, handlePasswordReset, renderModal } =
    useEmployeeDetail();

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData
            date={employeeDetail?.createdOn}
            id={employeeDetail?.id}
            name={employeeDetail?.name}
          />
        </DetailsCard>
        <div className="flex mt-8">
          <FormData
            handlePasswordReset={handlePasswordReset}
            employeeDetail={employeeDetail}
          />
          <SideCard />
        </div>
      </Layout>

      {renderModal()}
    </>
  );
};

export default EmploysDetails;
