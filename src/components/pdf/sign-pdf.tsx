import { ProductPurchasedItemsDetails } from "./preview/productDetails/purchased-items-details";
import { Aggrement } from "./preview/aggrement/aggrement";
import { InvoiceEmailHeaderProps, PdfProps, TemplateType } from "@/types/types";
import { PaymentQRCodeDetails } from "./preview/qrCode/payment-qr-code-details";
import { ProductItemNewPage } from "./preview/productDetails/product-item-next-page";
import { Container } from "./container";
import { ServiceList } from "@/types/offers";
import { PreviewCard } from "./preview-card";
import { Button } from "@/base-components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  rejectOfferPublic,
  signOffer,
  updateOfferStatus,
} from "@/api/slices/offer/offerSlice";
import localStoreUtil from "@/utils/localstore.util";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useRouter } from "next/router";
import RecordUpdateSuccess from "@/base-components/ui/modals1/RecordUpdateSuccess";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { SetStateAction, useEffect, useState } from "react";
import { EmailTemplate } from "@/types/settings";
import { BASEURL } from "@/services/HttpProvider";
import axios from "axios";
import { getRefreshToken, getToken } from "@/utils/auth.util";
import toast from "react-hot-toast";
const OfferSignedPdf = dynamic(() => import("../offers/signed-pdf"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { SystemSetting } from "@/api/slices/settingSlice/settings";
import { useTranslation } from "next-i18next";
import RejectOffer from "@/base-components/ui/modals1/RejectOffer";

export const SignPdf = <T,>({
  newPageData,
  pdfData,
  templateSettings,
  isQr,
  totalPages,
  action,
  emailTemplateSettings,
  systemSettings,
}: {
  pdfData: PdfProps<T>;
  newPageData: ServiceList[][];
  templateSettings: TemplateType | null;
  isQr?: boolean;
  totalPages: number;
  action?: string;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings: SystemSetting | null;
}) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.offer);
  const [offerSignature, setOfferSignature] = useState<string | null>(null);
  // const [instance, updateInstance] = usePDF({ document: <OfferSignedPdf offerData={pdfData} signature={offerSignature} /> });

  const { modal } = useAppSelector((state) => state.global);
  const router = useRouter();
  const { action: pdfAction } = router.query;
  const [isSignatureDone, setIsSignatureDone] = useState(false);
  const acceptOffer = async () => {
    if (!offerSignature) {
      toast.error("please sign first");
      return;
    }

    const formData = new FormData();
    formData.append(
      "signature",
      new Blob([offerSignature as any], { type: "image/png" })
    );

    const data = {
      id: pdfData?.id,
    };
    const response = await dispatch(signOffer({ data, formData }));
    if (response?.payload) {
      localStoreUtil.remove_data("signature"),
        dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
    }
    setOfferSignature(null);
  };
  const rejectOffer = async () => {
    const params = {
      id: pdfData?.id,
    };
    const response = await dispatch(rejectOfferPublic({ params }));
    if (response?.payload) {
      localStoreUtil.remove_data("signature"),
        dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
    }
    setOfferSignature(null);
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const route = () => {
    router.push("/login");
    onClose();
  };
  const handleUpdateSuccess = async () => {
    const res = await dispatch(
      updateOfferStatus({ data: { id: pdfData?.id, offerStatus: 3 } })
    );
    if (res?.payload)
      dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };
  const onSuccess = () => {
    router.push("https://staging.buero365.cloudmeshsolutions.com/");
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleSignature = (sign: any) => {
    // updateInstance(<OfferSignedPdf offerData={pdfData} signature={sign} />)
    // // const signature = new Blob([offerSignature as any], { type: "image/png" })
    // console.log(instance, "instance");
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
  };
  useEffect(() => {
    const scrollToElement = () => {
        const element = document.getElementById('gohere');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    const timer = setTimeout(scrollToElement, 400);
    return () => clearTimeout(timer);
  }, []);


  return (
    // <Container>
    <>
      {/* <PreviewCard /> */}
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
          signature={pdfData?.signature}
          isCanvas={action === "Reject" ? false : pdfData?.isCanvas}
          setIsSignatureDone={setIsSignatureDone as SetStateAction<boolean>}
          isSignatureDone={isSignatureDone}
          emailTemplateSettings={emailTemplateSettings}
          setOfferSignature={setOfferSignature}
          systemSettings={systemSettings}
        />
      </div>

      <OfferSignedPdf
        offerData={pdfData}
        signature={offerSignature}
        templateSettings={templateSettings}
        emailTemplateSettings={emailTemplateSettings}
        systemSettings={systemSettings}
        showContractSign={!!offerSignature}
      />

      {renderModal()}
    </>
  );
};
