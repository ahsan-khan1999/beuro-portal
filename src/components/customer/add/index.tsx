import { Layout } from "@/layout";

import React, { useState } from "react";

import CustomerForm from "../Form";
import { articlesSectionTypes, tabArrayTypes } from "@/types";
import TabSection from "@/base-components/ui/tab";

const AddCustomer = () => {
  const [tabType, setTabType] = useState<number>(1);

  const tabSection: tabArrayTypes[] = [
    {
      name: "Customer Details",
      content: <CustomerForm />,
    },
    {
      name: "Security Settings",
      content: "Security Settings",
    },
    {
      name: "Address Settings",
      content: <CustomerForm />,
    },
    {
      name: "Payments Settings",
      content: <CustomerForm />,
    },
    {
      name: "Social Media Links",
      content: <CustomerForm />,
    },
    {
      name: "Notification Preferences",
      content: <CustomerForm />,
    },
  ];
  return (
    <Layout>
      <h1 className="text-[#222B45] text-xl mb-5">Add new Customer </h1>

      <div className="flex ">
        <div className="space-y-4 mr-6">
          <TabSection
            tabsArray={tabSection}
            setTabType={setTabType}
            tabType={tabType}
          />
        </div>
        {tabSection.map((item, index) => {
          return index == tabType && item.content;
        })}
      </div>
    </Layout>
  );
};

export default AddCustomer;
