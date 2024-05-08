import React, { SetStateAction, useEffect, useRef, useState } from "react";
import SignPad from "signature_pad";
import { SignatureSubmittedSuccessFully } from "./signature-submitted-success";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { Button } from "@/base-components/ui/button/button";
import { blobToFile, dataURLtoBlob } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { EmailTemplate } from "@/types/settings";
import { SystemSetting } from "@/api/slices/settingSlice/settings";
import { PdfProps, TemplateType } from "@/types";
import toast from "react-hot-toast";
import { signOffer } from "@/api/slices/offer/offerSlice";
import { ModalType } from "@/enums/ui";
import ReactPDF, {
  BlobProvider,
  Document,
  Font,
  Page,
  StyleSheet,
  View,
  usePDF,
} from "@react-pdf/renderer";
import { Header } from "@/components/reactPdf/header";
import { ContactAddress } from "@/components/reactPdf/contact-address";
import { AddressDetails } from "@/components/reactPdf/address-details";
import { ServiceTableHederRow } from "@/components/reactPdf/service-table-header-row";
import { ServiceTableRow } from "@/components/reactPdf/service-table-row";
import { ServicesTotalAmount } from "@/components/reactPdf/services-total-ammount";
import { Footer } from "@/components/reactPdf/footer";
import { AdditionalDetails } from "@/components/reactPdf/additional-details";
import { AggrementSignature } from "@/components/reactPdf/aggrement-signature";
import { useRouter } from "next/router";
export const A4_WIDTH = 595; // 72dpi
export const A4_HEIGHT = 842; // 72dpi
import { pdf as reactPdf } from "@react-pdf/renderer";

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

const ow = 442;
const oh = 173;
const originalStrokeWidth = 1;
const OfferSignedPdf = dynamic(() => import("@/components/offers/signed-pdf"), {
  ssr: false,
});
let mySignature: any = null;

export const SignaturePad = ({
  signature,
  isCanvas,
  setIsSignatureDone,
  isSignatureDone,
  setOfferSignature,
  handleSignature,
  emailTemplateSettings,
  pdfData,
  setComponentMounted,
  offerSignature,
  systemSettings,
  templateSettings,
}: {
  signature?: string;
  isCanvas?: boolean;
  setIsSignatureDone?: SetStateAction<boolean>;
  isSignatureDone?: boolean;
  setOfferSignature?: SetStateAction<any>;
  handleSignature?: (sign: any) => void;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings: SystemSetting | null;
  templateSettings: TemplateType | null;
  offerSignature: string;
  pdfData: PdfProps<any>;
  setComponentMounted: SetStateAction<any>;
}) => {
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignPad | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resizeCanvas = () => {
    if (canvasRef.current && signaturePad) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scale = Math.min(rect.width / ow, rect.height / oh);

      const canvas = canvasRef.current;
      canvas.width = ow * scale;
      canvas.height = oh * scale;

      const adjustedScale = scale < 1 ? scale * 2 * 3 : scale;
      const scaledStrokeWidth = originalStrokeWidth / adjustedScale;

      signaturePad.minWidth = scaledStrokeWidth;
      signaturePad.maxWidth = scaledStrokeWidth * 0.7;

      // Redraw the signature from the existing data
      const data = signaturePad.toData();
      signaturePad.clear();
      signaturePad.fromData(data);
    }
  };

  const { loading: offerLoading } = useAppSelector((state) => state.offer);
  const headerDetails = pdfData?.headerDetails;
  const { address, header, workDates, time } = pdfData?.movingDetails || {};
  const contactAddress = pdfData?.contactAddress;
  const serviceItem = pdfData?.serviceItem;
  const serviceItemFooter = pdfData?.serviceItemFooter;
  const aggrementDetails = pdfData?.aggrementDetails;
  const router = useRouter();
  const { action: pdfAction } = router.query;
  const acceptButtonRef = useRef<HTMLDivElement>(null);

  const disscountTableRow = {
    serviceTitle: "Discount",
    price: Number(serviceItemFooter?.discount),
    unit: "-",
    totalPrice: Number(serviceItemFooter?.discount),
    serviceType: "",
    description: serviceItemFooter?.discountDescription,
    count: "-",
    pagebreak: true,
    discount: Number(serviceItemFooter?.discount),
    discountType: serviceItemFooter?.discountType,
    discountPercentage: Number(serviceItemFooter?.discountPercentage),
    updatedDiscountAmount: Number(serviceItemFooter?.updatedDiscountAmount),
    totalDiscount: serviceItemFooter?.serviceDiscountSum,
    isGlobalDiscount: serviceItemFooter?.isDiscount,
  };

  const isDiscount =
    serviceItemFooter?.serviceDiscountSum &&
    Number(serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;
  const pageBreakCondition = isDiscount || serviceItemFooter?.isDiscount;
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

          <AddressDetails {...{ address, header, workDates, time }} />

          <ServiceTableHederRow isDiscount={isDiscount} />
          {serviceItem?.map((item, index, arr) => (
            <ServiceTableRow
              {...item}
              key={index}
              pagebreak={
                !pageBreakCondition
                  ? serviceItem?.length === 1
                    ? false
                    : index === serviceItem?.length - 1
                  : false
              }
              isDiscount={isDiscount}
            />
          ))}
          {/* {(isDiscount || serviceItemFooter?.isDiscount) && (
            <ServiceTableDiscountRow
              {...disscountTableRow}
              key={Math.random()}
              pagebreak={true}
              isDiscount={isDiscount}
            />
          )} */}
          <ServicesTotalAmount
            {...serviceItemFooter}
            systemSettings={systemSettings}
          />
        </View>
        <Footer
          documentDetails={pdfData?.footerDetails}
          emailTemplateSettings={emailTemplateSettings}
          templateSettings={templateSettings}
        />
      </Page>

      <Page style={{ paddingBottom: 145, fontFamily: "Poppins" }}>
        <View style={{ marginBottom: 10 }} fixed>
          <Header {...headerDetails} />
        </View>

        {/* <ContactAddress {...{ ...contactAddress }} /> */}
        <AdditionalDetails
          description={aggrementDetails}
          signature={mySignature}
        />
        <AggrementSignature showContractSign={true} signature={mySignature} />
        <Footer
          documentDetails={pdfData?.footerDetails}
          emailTemplateSettings={emailTemplateSettings}
          templateSettings={templateSettings}
        />
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({ document: pdfDoc });

  // useMemo(() => {
  //   console.log(instance, "instance", signatureHolder);

  //   if (signatureHolder && instance?.url) {
  //     updateInstance(pdfDoc);
  //   }
  // }, [mySignature]);

  useEffect(() => {
    if (canvasRef.current && !signaturePad) {
      const sigPad = new SignPad(canvasRef.current, {
        backgroundColor: "rgb(255, 255, 255)",
      });
      setSignaturePad(sigPad);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [signaturePad]);

  const handleSave = async (signedFile: any, loading: boolean) => {
    if (signaturePad) {
      const canvasData = signaturePad.toData();
      if (canvasData?.length > 0) {
        setIsSubmitted(true);
        //@ts-expect-error
        setIsSignatureDone && setIsSignatureDone(true);

        const svgContent = signaturePad.toDataURL("image/png");
        const blob = dataURLtoBlob(svgContent);
        const file = new File([blob], "signature.png", { type: "image/png" });
        mySignature = file;
        let newPdf = (
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

                <AddressDetails {...{ address, header, workDates, time }} />

                <ServiceTableHederRow isDiscount={isDiscount} />
                {serviceItem?.map((item, index, arr) => (
                  <ServiceTableRow
                    {...item}
                    key={index}
                    pagebreak={
                      !pageBreakCondition
                        ? serviceItem?.length === 1
                          ? false
                          : index === serviceItem?.length - 1
                        : false
                    }
                    isDiscount={isDiscount}
                  />
                ))}
                {/* {(isDiscount || serviceItemFooter?.isDiscount) && (
                  <ServiceTableDiscountRow
                    {...disscountTableRow}
                    key={Math.random()}
                    pagebreak={true}
                    isDiscount={isDiscount}
                  />
                )} */}
                <ServicesTotalAmount
                  {...serviceItemFooter}
                  systemSettings={systemSettings}
                />
              </View>
              <Footer
                documentDetails={pdfData?.footerDetails}
                emailTemplateSettings={emailTemplateSettings}
                templateSettings={templateSettings}
              />
            </Page>

            <Page style={{ paddingBottom: 145, fontFamily: "Poppins" }}>
              <View style={{ marginBottom: 10 }} fixed>
                <Header {...headerDetails} />
              </View>

              {/* <ContactAddress {...{ ...contactAddress }} /> */}
              <AdditionalDetails
                description={aggrementDetails}
                signature={file}
              />
              <AggrementSignature showContractSign={true} signature={file} />
              <Footer
                documentDetails={pdfData?.footerDetails}
                emailTemplateSettings={emailTemplateSettings}
                templateSettings={templateSettings}
              />
            </Page>
          </Document>
        );
        const blobPdf = await reactPdf(newPdf).toBlob();

        // setOfferSignature && setOfferSignature(file)
        // setsignatureHolder(file as any)
        // setTimeout(() => {
        // updateInstance(pdfDoc);
        // }, 10);

        const convertedFile = blobToFile(
          blobPdf,
          `${
            pdfData?.headerDetails?.offerNo +
            "-" +
            pdfData?.headerDetails?.companyName
          }.pdf` || "offer.pdf"
        );
        if (!svgContent) {
          alert("true");
          showError(translate("common.sign_first"));
          return false;
        }

        const formData = new FormData();
        formData.append("signature", convertedFile);

        const data = {
          id: pdfData?.id,
        };

        const response = await dispatch(signOffer({ data, formData }));

        if (response?.payload) {
          dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
        }

        return true;

        // smoothScrollToSection("#acceptOffer")

        // Function to handle scrolling

        // window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
      } else {
        showError(translate("common.sign_first"));
      }
      return false;
    } else return false;
  };

  const handleClear = () => {
    signaturePad?.clear();
    setIsSubmitted(false);
  };
  const rejectOffer = async () => {
    dispatch(updateModalType({ type: ModalType.REJECT_OFFER }));
  };

  useEffect(() => {
    setComponentMounted(true);
  }, []);
  return (
    pdfAction === "Accept" && (
      <>
        <div className="select-none mb-4">
          <div className="relative border-[2px] border-[#A9A9A9] rounded-md bg-[#F5F5F5] h-[181.778px] w-full">
            {!isSubmitted ? (
              <canvas ref={canvasRef} className="w-full h-full"></canvas>
            ) : (
              <SignatureSubmittedSuccessFully />
            )}
          </div>
        </div>

        <div className="flex justify-between gap-x-3 my-2">
          <div
            className="download-link flex justify-center max-w-[1040px] w-full"
            id="gohere"
          >
            <BlobProvider document={pdfDoc}>
              {({ blob, url, loading, error }) => {
                return (
                  <div className="flex justify-between gap-x-3 my-2">
                    <Button
                      disabled={isSubmitted}
                      className="bg-[#393939] py-[7px] text-center text-white rounded-md shadow-md min-w-[220px]"
                      inputType="button"
                      id="signature"
                      onClick={handleClear}
                      text={translate("pdf.clear")}
                    />
                    <Button
                      className={`mt-[0px] ${"bg-[#45C769]"} rounded-[4px] shadow-md text-center text-white min-w-[220px]`}
                      onClick={() => handleSave(blob, loading)}
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
          {/* <button
          disabled={isSubmitted}
          onClick={handleClear}
          className="bg-[#393939] py-[7px] text-center text-white rounded-md shadow-md w-full"
        >
          {translate("pdf.clear")}
        </button>
        <Button
          id="signature"
          inputType="button"
          onClick={handleSave}
          disabled={isSubmitted}
          loading={loading}
          text={translate("pdf.submit")}
          className="bg-[#393939]  text-center text-white rounded-md shadow-md w-full"
        /> */}
        </div>
      </>
    )
    // ||
    // <div className="select-none mb-4">
    //   <div className="relative border-[2px] border-[#A9A9A9] rounded-md bg-[#F5F5F5] h-[181.778px] w-full">
    //     {signature && <Image src={signature} alt="signature" height={177} width={446} />}
    //   </div>
    // </div>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingBottom: 95,
    fontFamily: "Poppins",
  },
});
