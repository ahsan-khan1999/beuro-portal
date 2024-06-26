import { Layout } from "@/layout";
import React from "react";
import DetailsData from "../DetailsData";
import CustomerForm from "../CustomerForm";
import { formatDateTimeToDate } from "@/utils/utility";
import DetailsCard from "@/layout/customers/DetailsCard";
import useCustomerDetail from "@/hooks/customer/useCustomerDetail";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const CustomerDetails = () => {
  const {
    customerDetail,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    handlePreviousClick,
    deleteHandler,
    renderModal,
    loading,
    isLoading,
  } = useCustomerDetail({ detail: true, idAddNewCustomer: false });

  console.log({ loading });

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          date={formatDateTimeToDate(customerDetail?.createdAt) as string}
          id={customerDetail?.refID}
          name={customerDetail?.createdBy?.fullName}
          handlePreviousClick={handlePreviousClick}
          handleDelete={deleteHandler}
        />
      </DetailsCard>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="w-full my-5">
          <CustomerForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            customerDetail={customerDetail}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
      )}
      {renderModal()}
    </Layout>
  );
};

export default CustomerDetails;
