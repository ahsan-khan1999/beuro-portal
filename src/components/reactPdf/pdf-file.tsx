import { PdfPreviewProps } from "@/types";
import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";
import { Header } from "./header";
import { ContactAddress } from "./contact-address";
import { AddressDetails } from "./address-details";
import { ServiceTableHederRow } from "./service-table-header-row";
import { ServiceTableRow } from "./service-table-row";
import { ServicesTotalAmount } from "./services-total-ammount";
import { Footer } from "./footer";
import { AdditionalDetails } from "./additional-details";

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

export const PdfFile = ({
  data,
  templateSettings,
  emailTemplateSettings,
  systemSetting,
}: PdfPreviewProps) => {
  const headerDetails = data?.headerDetails;
  const { address, header, workDates } = data?.movingDetails || {};
  const contactAddress = data?.contactAddress;
  const serviceItem = data?.serviceItem;
  const serviceItemFooter = data?.serviceItemFooter;
  const aggrementDetails = data?.aggrementDetails;
  const qrCode = data?.qrCode;
  const footerDetails = data?.footerDetails;

  return (
    <Document>
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
          {serviceItem?.map((item, index) => (
            <ServiceTableRow {...item} key={index} />
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
          <AdditionalDetails description={aggrementDetails} />
        </View>
        <Footer
          {...{
            documentDetails: footerDetails,
            emailTemplateSettings,
            templateSettings,
          }}
        />
      </Page>

      {/* merge here remote pdf file */}
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingBottom: 140,
    fontFamily: "Poppins",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
