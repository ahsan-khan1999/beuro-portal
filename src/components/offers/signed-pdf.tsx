import { PDFResponse } from "@/types/pdf";
import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  View,
  PDFDownloadLink,
  usePDF,
  BlobProvider,
} from "@react-pdf/renderer";
import { Header } from "../reactPdf/header";
import { ContactAddress } from "../reactPdf/contact-address";
import { AddressDetails } from "../reactPdf/address-details";
import { ServiceTableHederRow } from "../reactPdf/service-table-header-row";
import { ServiceTableRow } from "../reactPdf/service-table-row";
import { ServicesTotalAmount } from "../reactPdf/services-total-ammount";
import { Footer } from "../reactPdf/footer";
import { AdditionalDetails } from "../reactPdf/additional-details";
import { EmailHeaderProps, PdfProps, TemplateType } from "@/types";
import Link from "next/link";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Button } from "@/base-components/ui/button/button";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { rejectOfferPublic, signOffer } from "@/api/slices/offer/offerSlice";
import localStoreUtil from "@/utils/localstore.util";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { blobToFile } from "@/utils/utility";
import { EmailTemplate } from "@/types/settings";
import { SystemSetting } from "@/api/slices/settingSlice/settings";
import { RefObject } from "@fullcalendar/core/preact.js";
import { AggrementSignature } from "../reactPdf/aggrement-signature";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "/assets/fonts/Poppins-Thin.ttf",
      fontStyle: "thin",
      fontWeight: 100,
    },
    {
      src: "/assets/fonts/Poppins-Regular.ttf",
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: "/assets/fonts/Poppins-Medium.ttf",
      fontStyle: "medium",
      fontWeight: 500,
    },
    {
      src: "/assets/fonts/Poppins-Light.ttf",
      fontStyle: "light",
      fontWeight: 300,
    },
    {
      src: "/assets/fonts/Poppins-SemiBold.ttf",
      fontStyle: "semibold",
      fontWeight: 600,
    },
    {
      src: "/assets/fonts/Poppins-Bold.ttf",
      fontStyle: "bold",
      fontWeight: 700,
    },
    {
      src: "/assets/fonts/Poppins-Black.ttf",
      fontStyle: "black",
      fontWeight: 800,
    },
  ],
});


export const A4_WIDTH = 595; // 72dpi
export const A4_HEIGHT = 842; // 72dpi

interface SignPdfProps {
  offerData?: PdfProps<EmailHeaderProps>;
  signature: any;
  templateSettings: TemplateType | null;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings: SystemSetting | null;
  showContractSign?: boolean;
  onComponentMounted: () => void;
}

const OfferSignedPdf = ({
  emailTemplateSettings,
  signature,
  systemSettings,
  templateSettings,
  offerData,
  showContractSign,
  onComponentMounted,
}: SignPdfProps) => {
  const { loading: offerLoading } = useAppSelector((state) => state.offer);
  const headerDetails = offerData?.headerDetails;
  const { address, header, workDates } = offerData?.movingDetails || {};
  const contactAddress = offerData?.contactAddress;
  const serviceItem = offerData?.serviceItem;
  const serviceItemFooter = offerData?.serviceItemFooter;
  const aggrementDetails = offerData?.aggrementDetails;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { action: pdfAction } = router.query;
  
  const acceptButtonRef = useRef<HTMLDivElement>(null);

  const pdfDoc = (
    <Document style={{ width: A4_WIDTH, height: A4_HEIGHT }}>
      <Page style={styles.body}>
        <Header {...headerDetails} />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120,
          }}
        >
          <ContactAddress {...{ ...contactAddress }} />

          <AddressDetails {...{ address, header, workDates }} />

          <ServiceTableHederRow />
          {serviceItem?.map((item, index) => (
            <ServiceTableRow {...item} key={index} />
          ))}
          <ServicesTotalAmount
            {...serviceItemFooter}
            systemSettings={systemSettings}
          />
        </View>
        <Footer
          documentDetails={offerData?.footerDetails}
          emailTemplateSettings={emailTemplateSettings}
          templateSettings={templateSettings}
        />
      </Page>

      <Page  style={{ paddingBottom: 145, fontFamily: 'Poppins' }}>
      <View style={{marginBottom: 10}} fixed>

        <Header {...headerDetails} />
        </View>

     
        <ContactAddress {...{ ...contactAddress }} />
        <AdditionalDetails
          description={aggrementDetails}
          signature={signature}
        />
        <AggrementSignature showContractSign={true} signature={signature} />
        <Footer
          documentDetails={offerData?.footerDetails}
          emailTemplateSettings={emailTemplateSettings}
          templateSettings={templateSettings}
        />
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({ document: pdfDoc });

  useMemo(() => {
    if (signature && instance?.url) {
      updateInstance(pdfDoc);
    }
  }, [signature]);

  const acceptOffer = async (file: any) => {
    const convertedFile = blobToFile(file, "offer.pdf");
    if (!signature) {
      toast.error("please sign first");
      return;
    }

    const formData = new FormData();
    formData.append("signature", convertedFile);

    const data = {
      id: offerData?.id,
    };
    const response = await dispatch(signOffer({ data, formData }));
    if (response?.payload) {
      dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
    }
  };
  const rejectOffer = async () => {
    dispatch(updateModalType({ type: ModalType.REJECT_OFFER }));
  };

  useEffect(() => {
    if (onComponentMounted) onComponentMounted();
  }, []);

  return (
    <div className="download-link w-full" id="gohere">
      <BlobProvider document={pdfDoc}>
        {({ blob, url, loading, error }) => {
          return (
            <div className=" ">
            <Button
              className={`mt-[55px] w-full  ${
                pdfAction === "Reject" ? "bg-red" : "bg-[#45C769]"
              } rounded-[4px] shadow-md  text-center text-white`}
              onClick={() =>
                pdfAction === "Reject" ? rejectOffer() : acceptOffer(blob)
              }
              inputType="button"
              id="signature"
              loading={offerLoading}
              text={pdfAction as string}
            />
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
};

export default OfferSignedPdf;

const styles = StyleSheet.create({
  body: {
    paddingBottom: 95,
    fontFamily: "Poppins",

  },
  // pageNumber: {
  //   position: "absolute",
  //   fontSize: 12,
  //   bottom: 30,
  //   left: 0,
  //   right: 0,
  //   textAlign: "center",
  //   color: "grey",
  // },
});
