import { Layout } from "@/layout";
import React, { useState } from "react";
import { tabArrayTypes } from "@/types";
import TabSection from "@/base-components/ui/tab";
import AddCustomerForm from "../../employees/fields/add-employee-form";
import { useRouter } from "next/router";
type ComponentLookupType = Record<string, JSX.Element>; 

const AddCustomer = () => {
  const [tabType, setTabType] = useState<string>("Customer Details");
  const router = useRouter()
  const handleCancel = () => {
    router.push("/customers")
  }

  const tabSection: tabArrayTypes[] = [
    {
      name: "Customer Details",
      content: <AddCustomerForm handleCancel={handleCancel} />,
      icon:""
    },
  ];
  
  const componentLookup: ComponentLookupType = {
    "Customer Details": <AddCustomerForm handleCancel={handleCancel} />
  }

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
        {componentLookup[tabType]}
      </div>
    </Layout>
  );
};

export default AddCustomer;
