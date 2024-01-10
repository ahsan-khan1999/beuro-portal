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
import { useEffect, useState } from "react";
import LoadingState from "@/base-components/loadingEffect/loading-state";

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
      src: "/assets/fonts/Poppins-Light.ttf",
      fontStyle: "light",
      fontWeight: 300,
    },
    {
      src: "/assets/fonts/Poppins-Medium.ttf",
      fontStyle: "medium",
      fontWeight: 500,
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

const OfferPdfPreview = ({
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
  const footerDetails = data?.footerDetails;

  return (
    <PDFViewer height={1000} style={{ width: "100%" }}>
      <Document
        title={data?.headerDetails?.offerNo || ""}
        onRender={(file) => {}}
      >
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
        <Page style={{ paddingBottom: 140 }}>
          <Header {...headerDetails} />
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 120,
              fontFamily: 'Poppins',
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
      </Document>
    </PDFViewer>
  );
};

export default OfferPdfPreview;

const styles = StyleSheet.create({
  body: {
    paddingBottom: 140,
    fontFamily: "Poppins",
  },
});
