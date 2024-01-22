import { Layout } from "@/layout";
import React, { useState } from "react";
import { tabArrayTypes } from "@/types";
import TabSection from "@/base-components/ui/tab";
import { useRouter } from "next/router";
import AddCustomerForm from "../add-customer-form";
import { useTranslation } from "next-i18next";
type ComponentLookupType = Record<string, JSX.Element>;

const AddCustomer = () => {
  const { t: translate } = useTranslation();
  const [tabType, setTabType] = useState<string>("Customer Details");
  const router = useRouter();
  const handleCancel = () => {
    router.push("/customers");
  };

  const tabSection: tabArrayTypes[] = [
    {
      name: `${translate("customers.tab_heading")}`,
      content: <AddCustomerForm handleCancel={handleCancel} />,
      icon: "",
    },
  ];

  const componentLookup: ComponentLookupType = {
    "Customer Details": <AddCustomerForm handleCancel={handleCancel} />,
  };

  return (
    <Layout>
      <h1 className="text-[#222B45] text-xl mb-5">
        {translate("customers.details.add_customer_heading")}
      </h1>

      <div className="flex flex-col xl:flex-row gap-4">
        <div className="space-y-4 w-fit">
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
