import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { ReportPDFHeader } from "./header";
import { ReportPDFFooter } from "./footer";
import { ReportContactAddress } from "./contact-address";
import { ReportAddressDetails } from "./report-address-details";
import { CustomerAddress } from "@/types/leads";

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

const addresses: CustomerAddress[] = [
  {
    streetNumber: "123",
    country: "USA",
    postalCode: "12345",
    description: "dummy address 1",
    label: "My First Address",
    addressType: "0",
    floor: 1,
    lift: Boolean("Yes"),
    room: 4,
    parkingPermit: Boolean("Yes"),
  },
  {
    streetNumber: "456",
    country: "Canada",
    postalCode: "67890",
    description: "dummy address 2",
    label: "My Second Address",
    addressType: "0",
    floor: 1,
    lift: Boolean("Yes"),
    room: 4,
    parkingPermit: Boolean("Yes"),
  },
  {
    streetNumber: "789",
    country: "UK",
    postalCode: "11223",
    description: "dummy address 3",
    label: "My Third Address",
    addressType: "0",
    floor: 1,
    lift: Boolean("Yes"),
    room: 4,
    parkingPermit: Boolean("Yes"),
  },
];

const ReportPdf = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document title={"report-id-2222"}>
        <Page style={styles.body} dpi={72}>
          <ReportPDFHeader language={"en"} />

          <ReportContactAddress />
          <ReportAddressDetails address={addresses} />

          <View style={styles.footerContainer}>
            <ReportPDFFooter />
          </View>
        </Page>
        <Page style={{ paddingBottom: 145, fontFamily: "Poppins" }}>
          <View style={{ marginBottom: 10 }} fixed>
            <ReportPDFHeader language={"en"} />
          </View>

          <View style={styles.footerContainer}>
            <ReportPDFFooter />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ReportPdf;

const styles = StyleSheet.create({
  body: {
    paddingBottom: 100,
    fontFamily: "Poppins",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
