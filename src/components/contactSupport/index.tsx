import React from "react";
import ContactSupportForm from "./ContactSupportForm";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function ContactSupport() {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const { t: translate } = useTranslation();

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const router = useRouter();

  const route = () => {
    router.push("/dashboard");
    onClose()
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const requestSubmitHandler = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("request_modal.main_heading")}
        subHeading={translate("request_modal.sub_heading")}
        route={route}
      />
    ),
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-[#222B45] ">
          {translate("contact_support.main_heading")}
        </h1>
      </div>
      <div className="flex mt-5">
        <ContactSupportForm requestSubmitHandler={requestSubmitHandler} />
      </div>

      {renderModal()}
    </>
  );
}
