import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import { Header } from "./header";

export interface PdfHeader {
  companyLogo: string;
  offerNumber: string;
  offerDate: string;
  createdBy: string;
}

interface PdfData {
  header: PdfHeader;
}

export const PDF_DATA: PdfData = {
  header: {
    companyLogo: "",
    offerNumber: "R-2004",
    offerDate: "2012-1-1",
    createdBy: "Talha R",
  },
};

// const styles = StyleSheet.create({
//   body: {
//     paddingTop: 20,
//     fontFamily: "Inter",
//   },
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Define a component for your PDF content
const PDFLayout = () => {
  return (
    <PDFViewer>
      <Document>
        <Page size="A4">
          <Header
            companyLogo={PDF_DATA.header.companyLogo}
            offerNumber={PDF_DATA.header.offerNumber}
            offerDate={PDF_DATA.header.offerDate}
            createdBy={PDF_DATA.header.createdBy}
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFLayout;
