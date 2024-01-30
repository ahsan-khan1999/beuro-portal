import { PdfPreviewProps } from "@/types";
import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { Header } from "./header";
import { ContactAddress } from "./contact-address";
import { AddressDetails } from "./address-details";
import { ServiceTableHederRow } from "./service-table-header-row";
import { ServiceTableRow } from "./service-table-row";
import { ServicesTotalAmount } from "./services-total-ammount";
import { Footer } from "./footer";
import { AdditionalDetails } from "./additional-details";
import { AggrementSignature } from "./aggrement-signature";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "/assets/fonts/Poppins-Thin.ttf",
      fontStyle: "thin",
      fontWeight: 100,
    },
    {
      src: "/assets/fonts/Poppins-ThinItalic.ttf",
      fontStyle: "italic",
      fontWeight: 100,
    },
    {
      src: "/assets/fonts/Poppins-Regular.ttf",
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: "/assets/fonts/Poppins-Light.ttf",
      fontStyle: "light",
      fontWeight: 300,
    },
    {
      src: "/assets/fonts/Poppins-LightItalic.ttf",
      fontStyle: "italic",
      fontWeight: 300,
    },
    {
      src: "/assets/fonts/Poppins-Medium.ttf",
      fontStyle: "medium",
      fontWeight: 500,
    },
    {
      src: "/assets/fonts/Poppins-MediumItalic.ttf",
      fontStyle: "italic",
      fontWeight: 500,
    },
    {
      src: "/assets/fonts/Poppins-SemiBold.ttf",
      fontStyle: "semibold",
      fontWeight: 600,
    },
    {
      src: "/assets/fonts/Poppins-SemiBoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 600,
    },
    {
      src: "/assets/fonts/Poppins-Bold.ttf",
      fontStyle: "bold",
      fontWeight: 700,
    },
    {
      src: "/assets/fonts/Poppins-BoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 700,
    },
    {
      src: "/assets/fonts/Poppins-Black.ttf",
      fontStyle: "black",
      fontWeight: 800,
    },
    {
      src: "/assets/fonts/Poppins-BlackItalic.ttf",
      fontStyle: "italic",
      fontWeight: 800,
    },
  ],
});

const OfferPdfPreview = ({
  data,
  templateSettings,
  emailTemplateSettings,
  systemSetting,
  showContractSign,
}: PdfPreviewProps) => {
  const headerDetails = data?.headerDetails;
  const { address, header, workDates } = data?.movingDetails || {};
  const contactAddress = data?.contactAddress;
  const serviceItem = data?.serviceItem;
  const serviceItemFooter = data?.serviceItemFooter;
  const aggrementDetails = data?.aggrementDetails;
  const footerDetails = data?.footerDetails;

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }} >
      <Document title={data?.headerDetails?.offerNo || ""}>
        <Page style={styles.body} dpi={72}>
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
            {serviceItem?.map((item, index, arr) => (
              <ServiceTableRow
                {...item}
                key={index}
                pagebreak={arr.length === 1 ? false : index === arr.length - 1}
              />
            ))}
            <ServicesTotalAmount
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
        <Page style={{ paddingBottom: 145, fontFamily: 'Poppins' }}>
          <View style={{ marginBottom: 10 }} fixed>
            <Header {...headerDetails} />
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
    </PDFViewer>
  );
};

export default OfferPdfPreview;

const styles = StyleSheet.create({
  body: {
    paddingBottom: 100,
    fontFamily: "Poppins",
  },
});
