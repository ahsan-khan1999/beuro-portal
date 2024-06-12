import {
  BlobProvider,
  Document,
  Font,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { PdfPreviewProps } from "@/types";
import { ContactAddress } from "@/components/reactPdf/contact-address";
import { ServiceTableRow } from "@/components/reactPdf/service-table-row";
import { Footer } from "@/components/reactPdf/footer";
import { AdditionalDetails } from "@/components/reactPdf/additional-details";
import { blobToFile } from "@/utils/utility";
import { AggrementSignature } from "@/components/reactPdf/aggrement-signature";
import { OfferPdfHeader } from "@/components/reactPdf/offer-pdf-header";
import { OfferAddressDetails } from "@/components/reactPdf/offer-address-details";
import { OfferServiceTableHederRow } from "@/components/reactPdf/offer-service-table-header-row";
import { OfferServicesTotalAmount } from "@/components/reactPdf/offer-services-total-amount";

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

const OfferPdfDownload = ({
  data,
  templateSettings,
  emailTemplateSettings,
  pdfFile,
  setPdfFile,
  systemSetting,
  showContractSign,
}: PdfPreviewProps) => {
  const headerDetails = data?.headerDetails;

  const { address, header, workDates, time } = data?.movingDetails || {};
  const contactAddress = data?.contactAddress;
  const serviceItem = data?.serviceItem;
  const serviceItemFooter = data?.serviceItemFooter;
  const aggrementDetails = data?.aggrementDetails;
  const footerDetails = data?.footerDetails;

  const disscountTableRow = {
    serviceTitle: "Rabatt",
    price: Number(serviceItemFooter?.discount),
    unit: "-",
    totalPrice: Number(serviceItemFooter?.discount),
    serviceType: "",
    description: serviceItemFooter?.discountDescription,
    count: "-",
    pagebreak: true,
    discount: Number(serviceItemFooter?.discount),
    totalDiscount: serviceItemFooter?.serviceDiscountSum,
    isGlobalDiscount: serviceItemFooter?.isDiscount,
  };

  const isDiscount =
    serviceItemFooter?.serviceDiscountSum &&
    Number(serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;
  const pageBreakCondition = isDiscount || serviceItemFooter?.isDiscount;

  return (
    <div className="download-link">
      <BlobProvider
        document={
          <Document
            title={data?.headerDetails?.offerNo || ""}
            // onRender={(blob) => {
            //   if(!pdfFile){
            //     setPdfFile(blobToFile(blob, "offer.pdf"));
            //   }
            // }}
          >
            <Page style={styles.body} dpi={72}>
              <OfferPdfHeader {...headerDetails} />
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 120,
                }}
              >
                <ContactAddress {...{ ...contactAddress }} />

                <OfferAddressDetails
                  {...{ address, header, workDates, time }}
                />

                <OfferServiceTableHederRow isDiscount={isDiscount} />
                {serviceItem?.map((item, index) => (
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
                <OfferServicesTotalAmount
                  {...serviceItemFooter}
                  systemSettings={systemSetting}
                />
              </View>
              <Footer
                {...{
                  documentDetails: footerDetails,
                  emailTemplateSettings,
                  templateSettings,
                }}
              />
            </Page>

            {/* Additional details */}
            <Page style={{ paddingBottom: 145, fontFamily: "Poppins" }}>
              <View style={{ marginBottom: 10 }} fixed>
                <OfferPdfHeader {...headerDetails} />
              </View>
              {/* <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 120,
              fontFamily: "Poppins",
            }}
          > */}
              {/* <ContactAddress {...{ ...contactAddress }} /> */}
              <AdditionalDetails description={aggrementDetails} />
              <AggrementSignature showContractSign={showContractSign} />

              {/* </View> */}
              <Footer
                {...{
                  documentDetails: footerDetails,
                  emailTemplateSettings,
                  templateSettings,
                }}
              />
            </Page>
          </Document>
        }
      >
        {({ blob, url, loading, error }) => {
          if (blob && !pdfFile) {
            setPdfFile(
              blobToFile(
                blob,
                `${headerDetails?.companyName} ${headerDetails?.offerNo}.pdf`
              )
            );
          }
          return <></>;
        }}
      </BlobProvider>
    </div>
  );
};

export default OfferPdfDownload;

const styles = StyleSheet.create({
  body: {
    paddingBottom: 95,
    fontFamily: "Poppins",
  },
});
