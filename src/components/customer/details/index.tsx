import { Layout } from "@/layout";
import React from "react";
import CustomerForm from "../CustomerForm";
import { formatDateTimeToDate } from "@/utils/utility";
import DetailsCard from "@/layout/customers/DetailsCard";
import useCustomerDetail from "@/hooks/customer/useCustomerDetail";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { CustomerDetailsData } from "../customer-details-data";

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
  } = useCustomerDetail({ detail: true, idAddNewCustomer: false });

  return (
    <Layout>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <DetailsCard>
            <CustomerDetailsData
              date={formatDateTimeToDate(customerDetail?.createdAt) as string}
              id={customerDetail?.refID}
              name={customerDetail?.createdBy?.fullName}
              handlePreviousClick={handlePreviousClick}
              handleDelete={deleteHandler}
              customerDetails={customerDetail}
            />
          </DetailsCard>

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
        </>
      )}
      {renderModal()}
    </Layout>
  );
};

export default CustomerDetails;
