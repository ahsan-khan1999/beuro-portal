import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import useEmployeeDetail from "@/hooks/employee/useEmployeeDetail";
import EmployeeForm from "../EmployeeForm";

const EmploysDetails = () => {
  const {
    employeeDetail,
    handlePasswordReset,
    renderModal,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
  } = useEmployeeDetail(true);

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData
            date={employeeDetail?.createdOn}
            id={employeeDetail?.id}
            name={employeeDetail?.name}
            isUpdate={isUpdate}
          />
        </DetailsCard>
        <div className="flex mt-8">
          <EmployeeForm
            isUpdate={isUpdate}
            handlePasswordReset={handlePasswordReset}
            setIsUpdate={setIsUpdate}
            employeeDetail={employeeDetail}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
          <SideCard />
        </div>
      </Layout>

      {renderModal()}
    </>
  );
};

export default EmploysDetails;
