import React from "react";
import { Layout } from "@/layout/layout";
import ContactSupportForm from "./ContactSupportForm";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useRouter } from "next/router";

export default function ContactSupport() {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const router = useRouter();

  const route = () => {
    router.push("/dashboard");
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const requestSubmitHandler = () => {
    dispatch(updateModalType({type:ModalType.CREATION}));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Your Request has been sent"
        subHeading="Thanks for sending your request to Buro we are happy to have you. "
        route={route}
      />
    ),
  };

  return (
    <>
      <Layout>
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-[#222B45] ">Contact & Support</h1>
        </div>
        <div className="flex mt-5">
          <ContactSupportForm requestSubmitHandler={requestSubmitHandler} />
        </div>
      </Layout>

      {renderModal()}
    </>
  );
}
