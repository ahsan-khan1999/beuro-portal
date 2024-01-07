// import {
//   Document,
//   Page,
//   Text,
//   View,
//   Image,
//   PDFViewer,
//   StyleSheet,
//   Font,
// } from "@react-pdf/renderer";
// import { Header } from "./header";
// import { ContactAddress } from "./contact-address";
import { PDFResponse } from "@/types/pdf";
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

export const PDF_DATA: PDFResponse = {
  header: {
    companyLogo: "",
    offerNumber: "R-2004",
    offerDate: "2012-1-1",
    createdBy: {
      fullName: "Talha R",
    },
  },
  contactAddress: {
    company: {
      phoneNumber: "+923088924153",
      bankDetails: {},
      address: {},
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
      count: "1",
      description:
        "This is dummy description This is dummy description This is dummy description This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
    {
      count: "2",
      description: "This is dummy description",
      price: "345",
      total: "3450",
      unit: "std",
    },
    {
      count: "3",
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
  createdBy: {
    email: "talha@gmail.com",
  },
  footer: {
    company: {
      address: {
        city: "Islamabad",
        country: "Pakistan",
        houseNumber: "3rd Floor",
        postalCode: "13150",
        streetNumber: "24A",
      },
      bankDetails: {
        bankName: "Meezan Bank",
        ibanNumber: "PKMZ1234567890987",
      },
      companyName: "CMS",
      mobileNumber: "+923088922423",
      phoneNumber: "+155433455",
      taxNumber: "R-5555",
      website: "https://cloudmeshsolutions.com",
    },
    createdBy: {
      email: "talha@cloudmeshsolutions.com",
    },
  },
  additionalDetails: {
    heading: "Zahlungsarten",
    description:
      "Banküberweisung: Sie können den Betrag auf unser angegebenes Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).",
  },
};

// export const A4_WIDTH = 595; // 72dpi
// export const A4_HEIGHT = 842; // 72dpi

// const styles = StyleSheet.create({
//   body: {
//     fontFamily: "Poppins",
//     fontWeight: 400,
//     fontSize: 16,
//     paddingBottom: 30,
//   },
// });

// const PDFLayout = () => {
//   return (
//     <PDFViewer width={A4_WIDTH} height={A4_HEIGHT}>
//       {/* <Document>
//         <Page size="A4" style={styles.body}>
//           <Header
//             companyLogo={PDF_DATA.header.companyLogo}
//             offerNumber={PDF_DATA.header.offerNumber}
//             offerDate={PDF_DATA.header.offerDate}
//             createdBy={PDF_DATA.header.createdBy}
//           />
//           <View style={{ position: "absolute", top: 120 }}>
//             <ContactAddress
//               company={PDF_DATA.contactAddress.company}
//               createdBy={PDF_DATA.contactAddress.createdBy}
//               customerDetail={PDF_DATA.contactAddress.customerDetail}
//             />
//             <AddressDetails {...PDF_DATA.addressDetails} />
//             <ServiceTableHederRow />
//             {PDF_DATA.serviceDetails.map((item, index) => (
//               <ServiceTableRow {...item} count={`${index + 1}`} key={index} />
//             ))}
//             <Footer
//               {...PDF_DATA.footer}
//               pages="10"
//               createdBy={PDF_DATA.createdBy}
//             />
//           </View>
//         </Page>
//       </Document> */}

//       <Quixote />
//     </PDFViewer>
//   );
// };

// export default PDFLayout;

import ReactPDF, {
  Document,
  Font,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Header } from "./header";
import { Footer } from "./footer";
import { ContactAddress } from "./contact-address";
import { AddressDetails } from "./address-details";
import { ServiceTableHederRow } from "./service-table-header-row";
import { ServiceTableRow } from "./service-table-row";

export const A4_WIDTH = 595; // 72dpi
export const A4_HEIGHT = 842; // 72dpi

const PDF = () => (
  <PDFViewer width={A4_WIDTH} height={A4_HEIGHT}>
    <Document>
      <Page style={styles.body}>
        <Header {...PDF_DATA.header} />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120,
          }}
        >
          <ContactAddress
            company={PDF_DATA.contactAddress.company}
            createdBy={PDF_DATA.contactAddress.createdBy}
            customerDetail={PDF_DATA.contactAddress.customerDetail}
          />

          <AddressDetails {...PDF_DATA.addressDetails} />

          <ServiceTableHederRow />
          {PDF_DATA.serviceDetails.map((item, index) => (
            <ServiceTableRow {...item} count={`${index + 1}`} key={index} />
          ))}
        </View>
        <Footer {...PDF_DATA.footer} />
      </Page>

      {/* additional details */}
      <Page size="A4" style={styles.body}>
        <Header
          companyLogo={PDF_DATA.header.companyLogo}
          offerNumber={PDF_DATA.header.offerNumber}
          offerDate={PDF_DATA.header.offerDate}
          createdBy={PDF_DATA.header.createdBy}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120,
          }}
        >
          <ContactAddress
            company={PDF_DATA.contactAddress.company}
            createdBy={PDF_DATA.contactAddress.createdBy}
            customerDetail={PDF_DATA.contactAddress.customerDetail}
          />
          <AdditionalDetails {...PDF_DATA.additionalDetails} />

          <Footer {...PDF_DATA.footer} />
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PDF;

// Font.register({
//   family: "Oswald",
//   src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
// });

const styles = StyleSheet.create({
  body: {
    paddingBottom: 95,
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
