import {
  BlobProvider,
  Document,
  Font,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { PdfPreviewProps } from "@/types";
import { Header } from "@/components/reactPdf/header";
import { ContactAddress } from "@/components/reactPdf/contact-address";
import { AddressDetails } from "@/components/reactPdf/address-details";
import { ServiceTableHederRow } from "@/components/reactPdf/service-table-header-row";
import { ServiceTableRow } from "@/components/reactPdf/service-table-row";
import { ServicesTotalAmount } from "@/components/reactPdf/services-total-ammount";
import { Footer } from "@/components/reactPdf/footer";
import { AdditionalDetails } from "@/components/reactPdf/additional-details";
import { blobToFile } from "@/utils/utility";

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

const PdfDownload = ({
  data,
  templateSettings,
  emailTemplateSettings,
  pdfFile,
  setPdfFile,
  fileName,
  qrCode: remotePdfFile,
  systemSetting
}: PdfPreviewProps) => {
  const headerDetails = data?.headerDetails;
  const { address, header, workDates } = data?.movingDetails || {};
  const contactAddress = data?.contactAddress;
  const serviceItem = data?.serviceItem;
  const serviceItemFooter = data?.serviceItemFooter;
  const aggrementDetails = data?.aggrementDetails;
  const footerDetails = data?.footerDetails;

  return (
    <div className="download-link">
      <BlobProvider
        document={
          <Document>
            <Page style={{...styles.body, minHeight: "100%"}} dpi={72}>
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
                <ServicesTotalAmount {...serviceItemFooter} />
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
          </Document>
        }
      >
        {({ blob, url, loading, error }) => {
          if (blob && !pdfFile) {
            setPdfFile(blobToFile(blob, fileName || "output.pdf"));
          }
          return <></>;
        }}
      </BlobProvider>
    </div>
  );
};

export default PdfDownload;

const styles = StyleSheet.create({
  body: {
    paddingBottom: 95,
    height: '895px'
  },
});
