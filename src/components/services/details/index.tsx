import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import useServiceDetail from "@/hooks/services/useServiceDetail";
import ServicesForm from "../ServicesForm";

const ServicesDetails = () => {
  const {
    serviceDetails,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
  } = useServiceDetail(true);
  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          serviceDetail={serviceDetails}
          isUpdate={isUpdate}
          // deleteHandler={deleteHandler}
        />
      </DetailsCard>
      <div className="grid grid-cols-1 mt-8 gap-x-8 gap-y-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ServicesForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            serviceDetail={serviceDetails}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
        <div className="xl:col-span-1">
          <SideCard />
        </div>
      </div>

      {/* {renderModal()} */}
    </Layout>
  );
};

export default ServicesDetails;
