import { Document, Page } from "@react-pdf/renderer";
import { Header } from "./header";
import { DownloadPdf } from "./pdf-download";

export interface PdfHeader {
  companyLogo: string;
  offerNumber: string;
  offerDate: string;
  createdBy: string;
}

interface PdfData {
  header: PdfHeader;
}

const PDF_DATA: PdfData = {
  header: {
    companyLogo: "https://kaufes-dev-v2.s3.me-south-1.amazonaws.com/testing/",
    offerNumber: "R-2004",
    offerDate: "2012-1-1",
    createdBy: "Talha R",
  },
};

export const ReactPdf = () => {
  const {
    header: { companyLogo, createdBy, offerDate, offerNumber },
  } = PDF_DATA;
  return (
    <Document>
      <Page size="A4">
        <Header
          companyLogo={companyLogo}
          offerNumber={offerNumber}
          offerDate={offerDate}
          createdBy={createdBy}
        />
        <DownloadPdf />
      </Page>
    </Document>
  );
};
