import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Header } from "./header";
import { ContactAddress } from "./contact-address";
import { PDFResponse } from "@/types/pdf";
import { AddressDetails } from "./address-details";
import { ServiceTableHederRow } from "./service-table-header-row";
import { ServiceTableRow } from "./service-table-row";

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

export const PDF_DATA: PDFResponse = {
  header: {
    companyLogo: "",
    offerNumber: "R-2004",
    offerDate: "2012-1-1",
    createdBy: "Talha R",
  },
  contactAddress: {
    company: {
      phoneNumber: "+923088924153",
    },
    createdBy: {
      email: "talha@cloudmeshsoltuions.com",
    },
    customerDetail: {
      address: {
        country: "Pakistan",
        postalCode: "13150",
        streetNumber: "24A",
      },
      fullName: "Talha Nazir R",
    },
  },
  addressDetails: {
    addresses: [
      {
        country: "Pakistan",
        postalCode: "13150",
        streetNumber: "24A",
        description: "This is description 1",
      },
      {
        country: "Pakistan",
        postalCode: "13150",
        streetNumber: "24A",
        description: "This is description 2",
      },
      {
        country: "Pakistan",
        postalCode: "13150",
        streetNumber: "24A",
        description: "This is description 3",
      },
    ],
    dates: [
      {
        endDate: "2022-33-21",
        startDate: "2021-4-02",
      },
      {
        endDate: "2022-33-21",
        startDate: "2021-4-02",
      },
    ],
    title: "This is dummy Title",
  },
  serviceDetails: [
    {
      count: "10",
      description: "This is dummy description This is dummy description This is dummy description This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
    {
      count: "10",
      description: "This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
    {
      count: "10",
      description: "This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
    {
      count: "10",
      description: "This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
    {
      count: "10",
      description: "This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
    {
      count: "10",
      description: "This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
    {
      count: "10",
      description: "This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
  ],
};

export const A4_WIDTH = 595; // 72dpi
export const A4_HEIGHT = 842; // 72dpi

const styles = StyleSheet.create({
  body: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 16,
    position: "relative",
  },
});

const PDFLayout = () => {
  return (
    <PDFViewer width={A4_WIDTH} height={A4_HEIGHT}>
      <Document>
        <Page size="A4" style={styles.body}>
          <Header
            companyLogo={PDF_DATA.header.companyLogo}
            offerNumber={PDF_DATA.header.offerNumber}
            offerDate={PDF_DATA.header.offerDate}
            createdBy={PDF_DATA.header.createdBy}
          />
          <View style={{ position: "absolute", top: 120 }}>
            <ContactAddress
              company={PDF_DATA.contactAddress.company}
              createdBy={PDF_DATA.contactAddress.createdBy}
              customerDetail={PDF_DATA.contactAddress.customerDetail}
            />
            <AddressDetails {...PDF_DATA.addressDetails} />
            <ServiceTableHederRow />
            {PDF_DATA.serviceDetails.map((item, index) => (
              <ServiceTableRow {...item} key={index} />
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFLayout;
