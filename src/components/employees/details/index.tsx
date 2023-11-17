import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import useEmployeeDetail from "@/hooks/employee/useEmployeeDetail";
import EmployeeForm from "../EmployeeForm";

const EmploysDetails = () => {
  const {
    employeeDetails,
    handlePasswordReset,
    renderModal,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    deleteHandler
  } = useEmployeeDetail(true);

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData
            date={employeeDetails?.creationDate}
            id={employeeDetails?.employeeID}
            name={employeeDetails?.createdBy}
            isUpdate={isUpdate}
            handleDelete={deleteHandler}
          />
        </DetailsCard>
        <div className="flex mt-8">
          <EmployeeForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            handlePasswordReset={handlePasswordReset}
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
