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
    renderModal,
    deleteHandler
  } = useServiceDetail(true);
  return (
    <Layout>
      <DetailsCard>
        <DetailsData serviceDetail={serviceDetails} isUpdate={isUpdate} deleteHandler={deleteHandler}/>
      </DetailsCard>
      <div className="flex mt-8">
        <ServicesForm
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          serviceDetail={serviceDetails}
          fields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
        <SideCard />
      </div>
      {renderModal()}
    </Layout>
  );
};

export default ServicesDetails;
