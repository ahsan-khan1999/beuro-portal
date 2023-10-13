import React, { useEffect, useState } from "react";
import { Layout } from "@/layout";
import EmployForm from "../Form";
import { tabArrayTypes } from "@/types";
import TabSection from "@/base-components/ui/tab";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import LinkSendToEmail from "@/base-components/ui/modals1/LinkSendToEmail";
import LeadCreated from "@/base-components/ui/modals1/LeadCreated";

const AddEmploy = () => {
  const [tabType, setTabType] = useState<number>(0);

  const tabSection: tabArrayTypes[] = [
    {
      name: "Employ Details",
      content: <EmployForm />,
    },
  ];

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.LEAD_CREATED]: <LeadCreated />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    dispatch(updateModalType(ModalType.LEAD_CREATED));
  }, []);
  return (
    <>
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

      {renderModal()}
    </>
  );
};

export default AddEmploy;
