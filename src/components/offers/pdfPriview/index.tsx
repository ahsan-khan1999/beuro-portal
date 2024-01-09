import React, { useEffect, useMemo, useState } from "react";
import EmailCard from "./PdfCard";
import { Pdf } from "@/components/pdf/pdf";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  readOfferDetails,
  sendOfferByPost,
  sendOfferEmail,
} from "@/api/slices/offer/offerSlice";
import { useRouter } from "next/router";
import { OffersTableRowTypes, ServiceList } from "@/types/offers";
import {
  AcknowledgementSlipProps,
  CompanySettingsActionType,
  EmailHeaderProps,
  EmailSettingsActionType,
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import {
  getTemplateSettings,
  readEmailSettings,
} from "@/api/slices/settingSlice/settings";
import localStoreUtil from "@/utils/localstore.util";
import {
  updateModalType,
  uploadFileToFirebase,
} from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { EmailTemplate } from "@/types/settings";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { Container } from "@/components/pdf/container";
import { YogaPdfContainer } from "@/components/pdf/yoga-pdf-container";
const OfferPdf = dynamic(() => import("@/components/reactPdf/pdf-layout"), { ssr: false, loading: () => <LoadingState /> });
const OfferPdfDownload = dynamic(() => import("./generate-offer-pdf"), { ssr: false });

import { useOfferPdf } from "@/hooks/offers/useOfferPdf";
import dynamic from "next/dynamic";

export const productItems: ServiceList[] = [
  {
    serviceTitle: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: 150,
    count: 2,
    serviceType: "",
    totalPrice: 1000,
    unit: "1",
  },
];

const qrCodeAcknowledgementData: AcknowledgementSlipProps = {
  accountDetails: {
    accountNumber: "CH48 0900 0000 1556 1356 9",
    name: "Rahal GmbH",
    street: "St.Urbanstrasse 79",
    city: "4914 Roggwil",
  },
  referenceNumber: "27 12323 0000 0000 0006 22926",
  payableByDetails: {
    name: "Rahal GmbH",
    street: "St. Urbanstrasse 79",
    city: "4914 Roggwill BE",
  },
  currency: "CHF",
  amount: 6418.92,
};

const qrCodePayableToData: PayableToProps = {
  accountDetails: {
    accountNumber: "CH48 0900 0000 1556 1356 9",
    name: "Rahal GmbH",
    street: "St.Urbanstrasse 79",
    city: "4914 Roggwil",
  },
  referenceNumber: "27 12323 0000 0000 0006 22926",
  payableByDetails: {
    name: "Rahal GmbH",
    street: "St. Urbanstrasse 79",
    city: "4914 Roggwill BE",
  },
  additionalInformation: "R-2000 Umzugsfuchs",
};

export const DUMMY_DATA: PdfProps = {
  emailHeader: { emailStatus: "pending", offerNo: "23-A" },
  headerDetails: {
    offerNo: "O-4040 Umzugsfuchs",
    offerDate: "22.09.2023",
    createdBy: "Heiniger Michèle",
    logo: "",
    emailTemplateSettings: null,
  },
  contactAddress: {
    address: {
      name: "Frau Natalie Semeli",
      city: "Buren an der Aare",
      postalCode: "3294",
      streetWithNumber: "Erlenweg 8",
    },
    email: "karinsch242@gmail.com",
    phone: "031 350 15 15",
  },
  movingDetails: {
    header: "Anger fur Ihren Umzug, Entsogung inkl. Ein- und Auspacken",
    address: [
      {
        country: "",
        description: "",
        postalCode: "",
        streetNumber: "",
      },
    ],
    workDates: [{ startDate: "30-11-2023", endDate: " 07-11-2023" }],
  },
  serviceItem: productItems,
  serviceItemFooter: {
    subTotal: "2000CHF",
    tax: "100CHF (7.7%)",
    discount: "100.50 CHF",
    grandTotal: "2100.50 CHF",
  },
  footerDetails: {
    firstColumn: {},
    secondColumn: {},
    thirdColumn: {},
    fourthColumn: {},
    columnSettings: null,
    currPage: 0,
    totalPages: 0,
  },
  qrCode: {
    acknowledgementSlip: qrCodeAcknowledgementData,
    payableTo: qrCodePayableToData,
  },
  aggrementDetails: "",
};

const PdfPriview = () => {
  const {
    offerData,
    activeButtonId,
    emailTemplateSettings,
    templateSettings,
    modal,
    loading,
    loadingGlobal,
    pdfFile,
    setPdfFile,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    onClose,
    onSuccess,
    systemSetting
  } = useOfferPdf();

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Email Sent Successfully "
        subHeading="Thanks for updating offer we are happy to have you. "
        route={onSuccess}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  return (
    <>
      {loading || loadingGlobal ? (
        <LoadingState />
      ) : (
        <div className="">
          <EmailCard
            emailStatus={offerData?.emailHeader?.emailStatus}
            offerNo={offerData?.emailHeader?.offerNo}
            onEmailSend={handleEmailSend}
            loading={loading}
            onDownload={handleDonwload}
            onPrint={handlePrint}
            handleSendByPost={handleSendByPost}
            activeButtonId={activeButtonId}
          />
          {/* <YogaPdfContainer>

              <div className="flex justify-center my-5">
                <Pdf<EmailHeaderProps>
                  pdfData={offerData}
                  newPageData={newPageData}
                  templateSettings={templateSettings}
                  totalPages={calculateTotalPages}
                  emailTemplateSettings={emailTemplateSettings}

                />
              </div>
            </YogaPdfContainer> */}


          <div className="flex justify-center my-5">
            <OfferPdf
              data={offerData}
              emailTemplateSettings={emailTemplateSettings}
              templateSettings={templateSettings}
              systemSetting={systemSetting}
            />
            <OfferPdfDownload
              data={offerData}
              templateSettings={templateSettings}
              emailTemplateSettings={emailTemplateSettings}
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              systemSetting={systemSetting}

            />
          </div>

          {renderModal()}
        </div>
      )}
    </>
  );
};

export default PdfPriview;
