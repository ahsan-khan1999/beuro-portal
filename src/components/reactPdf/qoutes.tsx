import ReactPDF, {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Header } from "./header";
import { PDF_DATA } from "./pdf-layout";
import { Footer } from "./footer";
import { ContactAddress } from "./contact-address";
import { AddressDetails } from "./address-details";
import { ServiceTableHederRow } from "./service-table-header-row";
import { ServiceTableRow } from "./service-table-row";

export const Quixote = () => (
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
  </Document>
);

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

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
