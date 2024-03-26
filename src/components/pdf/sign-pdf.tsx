import { ProductPurchasedItemsDetails } from "./preview/productDetails/purchased-items-details";
import { Aggrement } from "./preview/aggrement/aggrement";
import { PdfProps, TemplateType } from "@/types/types";
import { ProductItemNewPage } from "./preview/productDetails/product-item-next-page";
import { ServiceList } from "@/types/offers";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateOfferStatus } from "@/api/slices/offer/offerSlice";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useRouter } from "next/router";
import RecordUpdateSuccess from "@/base-components/ui/modals1/RecordUpdateSuccess";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { SetStateAction, useEffect, useState } from "react";
import { EmailTemplate } from "@/types/settings";

const OfferSignedPdf = dynamic(() => import("../offers/signed-pdf"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import { SystemSetting } from "@/api/slices/settingSlice/settings";
import { useTranslation } from "next-i18next";
import RejectOffer from "@/base-components/ui/modals1/RejectOffer";
import { smoothScrollToSection } from "@/utils/utility";
import { EditDate } from "@/base-components/ui/modals1/editDate";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";

export const SignPdf = <T,>({
  newPageData,
  pdfData,
  templateSettings,
  isQr,
  totalPages,
  action,
  emailTemplateSettings,
  systemSettings,
  setOfferData,
}: {
  pdfData: PdfProps<T>;
  newPageData: ServiceList[][];
  templateSettings: TemplateType | null;
  isQr?: boolean;
  totalPages: number;
  action?: string;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings: SystemSetting | null;
  setOfferData?: SetStateAction<any>;
}) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.offer);
  const [offerSignature, setOfferSignature] = useState<string | null>(null);
  const { modal } = useAppSelector((state) => state.global);
  const router = useRouter();
  const { action: pdfAction } = router.query;
  const [isSignatureDone, setIsSignatureDone] = useState(false);
  const [componentMounted, setComponentMounted] = useState(false);

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleUpdateSuccess = async () => {
    const res = await dispatch(
      updateOfferStatus({ data: { id: pdfData?.id, offerStatus: 3 } })
    );
    if (res?.payload)
      dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };

  const onSuccess = () => {
    router.push("https://buero-365.com/");
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const editDateHandler = () => {
    dispatch(updateModalType({ type: ModalType.EDIT_DATE }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.UPDATE_SUCCESS]: (
      <RecordUpdateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.are_sure")}
        modelSubHeading={translate("common.modals.reject_offer")}
        cancelHandler={onClose}
        confirmHandler={handleUpdateSuccess}
        loading={loading}
      />
    ),
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.offer_created")}
        modelSubHeading={translate("common.modals.admin_setting_des")}
        routeHandler={onSuccess}
      />
    ),
    [ModalType.REJECT_OFFER]: (
      <RejectOffer
        onClose={onClose}
        modelHeading={translate("common.modals.offer_update")}
        modelSubHeading={translate("common.modals.admin_setting_des")}
        routeHandler={onSuccess}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.update_success")}
        route={onClose}
      />
    ),
    [ModalType.EDIT_DATE]: (
      <EditDate
        onClose={onClose}
        setOfferData={setOfferData}
        pdfData={pdfData}
      />
    ),
  };

  useEffect(() => {
    if (componentMounted) {
      smoothScrollToSection("gohere");
    }

    return () => setComponentMounted(false);
  }, [componentMounted]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-y-[30px]">
        {newPageData.length > 0 && (
          <ProductPurchasedItemsDetails
            {...pdfData}
            serviceItem={newPageData[0]}
            isShowTotal={newPageData.length === 1}
            templateSettings={templateSettings}
            totalPages={totalPages}
            isOffer={pdfData.isOffer}
            emailTemplateSettings={emailTemplateSettings}
            systemSettings={systemSettings}
            handleEditDateModal={editDateHandler}
          />
        )}
        {newPageData.slice(1).map((pageItems, index) => (
          <ProductItemNewPage
            key={index}
            serviceItem={pageItems}
            footerDetails={pdfData.footerDetails}
            headerDetails={pdfData.headerDetails}
            serviceItemFooter={pdfData.serviceItemFooter}
            isShowTotal={index === newPageData.length - 2}
            templateSettings={templateSettings}
            totalPages={totalPages}
            currPage={index + 2}
            emailTemplateSettings={emailTemplateSettings}
            systemSettings={systemSettings}
          />
        ))}
        <Aggrement
          contactAddress={pdfData?.contactAddress}
          headerDetails={pdfData?.headerDetails}
          footerDetails={pdfData?.footerDetails}
          aggrementDetails={pdfData?.aggrementDetails}
          templateSettings={templateSettings}
          totalPages={totalPages}
          currPage={totalPages}
          isOffer={pdfData.isOffer}
          handleDescriptionUpdate={
            pdfData.movingDetails?.handleDescriptionUpdate
          }
          signature={offerSignature as string}
          isCanvas={pdfData?.isCanvas}
          setIsSignatureDone={setIsSignatureDone as SetStateAction<boolean>}
          isSignatureDone={isSignatureDone}
          emailTemplateSettings={emailTemplateSettings}
          setOfferSignature={setOfferSignature}
          systemSettings={systemSettings}
          pdfData={pdfData}
          setComponentMounted={() => setComponentMounted(true)}
        />
      </div>
      {/* <OfferSignedPdf
        {...{
          emailTemplateSettings,
          signature: offerSignature,
          systemSettings,
          templateSettings,
          offerData: pdfData,
          showContractSign: !!offerSignature,
          onComponentMounted: () => setComponentMounted(true),
        }}
      /> */}

      {renderModal()}
    </div>
  );
};
