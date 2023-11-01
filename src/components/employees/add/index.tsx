import React, { useState } from "react";
import { tabArrayTypes } from "@/types";
import DetailsTab from "@/base-components/ui/tab/DetailsTab";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import LinkSendToEmail from "@/base-components/ui/modals1/LinkSendToEmail";
import EmployeeAddDetails from "./EmployeeAddDetails";
import { useRouter } from "next/router";
import { Layout } from "@/layout";
import CreateNewPassword from "@/base-components/ui/modals1/CreateNewPassword";
import PasswordChangeSuccessfully from "@/base-components/ui/modals1/PasswordChangeSuccessfully";
import PasswordSet from "@/base-components/ui/modals1/PasswordSet";

const AddEmployeeDetails = () => {
  const [tabType, setTabType] = useState<number>(0);
  console.log(tabType);
  const router = useRouter();

  const tabSection: tabArrayTypes[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill=${
        tabType === 0 ? "#4A13E7" : "#8F8F8F"
      }>
        <path d="M13.3193 3.25781C11.0609 3.25781 9.23267 5.08602 9.23267 7.3444C9.23267 9.60277 11.0609 11.431 13.3193 11.431C15.5776 11.431 17.4058 9.60277 17.4058 7.3444C17.4058 5.08602 15.5776 3.25781 13.3193 3.25781Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}/>
        <path d="M14.9107 11.875H11.7274C8.52268 11.875 5.92017 14.4775 5.92017 17.6823V20.0482C5.92017 20.4138 6.19977 20.6934 6.56542 20.6934H20.0727C20.4383 20.6934 20.7179 20.4138 20.7179 20.0482V17.6823C20.7179 14.4775 18.1154 11.875 14.9107 11.875Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}/>
      </svg>`,
      name: "Employee Details",
    },
  ];

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for creating a password
  const linkSendHandler = () => {
    dispatch(updateModalType(ModalType.LINK_SEND_TO_EMAIL));
  };

  const createNewPswHandler = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.CREATE_NEW_PASSWORD));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const passwordSetSuccessfully = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.PASSWORD_SET));
  };


  // funtion for handling the route
  const routeHandler = () => {
    router.push("/employees/details");
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.LINK_SEND_TO_EMAIL]: (
      <LinkSendToEmail
        onClose={onClose}
        createNewPswHandler={createNewPswHandler}
      />
    ),
    [ModalType.CREATE_NEW_PASSWORD]: <CreateNewPassword onClose={onClose} passwordSetSuccessfully={passwordSetSuccessfully}/>,
    [ModalType.PASSWORD_SET]: (
      <PasswordSet onClose={onClose} routeHandler={routeHandler}/>
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const componentsLookUp = {
    0: (
      <EmployeeAddDetails
        linkSendHandler={linkSendHandler}
        routeHandler={routeHandler}
      />
    ),
  };
  return (
    <>
      <Layout>
        <h2 className="text-xl text-[#222B45] font-normal mb-5">Add Employ</h2>
        <div className="flex w-full gap-6">
          <div className="flex flex-col gap-[14px]">
            {tabSection.map((item, index) => (
              <DetailsTab
                isSelected={tabType === index}
                setTabType={setTabType}
                tabType={tabType}
                name={item.name}
                icon={item.icon}
                selectedTab={index}
              />
            ))}
          </div>

          {componentsLookUp[tabType as keyof typeof componentsLookUp]}
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default AddEmployeeDetails;
