import React, { useState } from "react";
import { Layout } from "@/layout";
import EmployForm from "../Form";
import { tabArrayTypes } from "@/types";
import TabSection from "@/base-components/ui/tab";

const AddEmploy = () => {
  const [tabType, setTabType] = useState<number>(0);

  const tabSection: tabArrayTypes[] = [
    {
      name: "Employ Details",
      content: <EmployForm />,
    },
    
  ];
  return (
    <Layout>
      <h1 className="text-[#222B45] text-xl mb-5">Add Employ</h1>

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

export default AddEmploy;
