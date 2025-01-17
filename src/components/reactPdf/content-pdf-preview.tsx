import { ContentPdfPreviewerProps } from "@/types";
import { Document, Font, PDFViewer, Page, View } from "@react-pdf/renderer";
import { AdditionalDetails } from "./additional-details";
import { Header } from "./header";
import { Footer } from "./footer";
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
      src: "/assets/fonts/PoppinsRegular.ttf",
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

const ContentPdfPreview = ({
  data,
  emailTemplateSettings,
  templateSettings,
  description,
  language,
  isOfferPdf,
}: ContentPdfPreviewerProps) => {
  const headerDetails = data?.headerDetails;
  const footerDetails = data?.footerDetails;

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page style={{ fontFamily: "Poppins", paddingBottom: 100 }}>
          <View style={{ marginBottom: 10 }} fixed>
            <Header {...headerDetails} language={language} />
          </View>
          <View style={{ paddingBottom: isOfferPdf ? 110 : 0 }}>
            <AdditionalDetails description={description} />
          </View>
          {isOfferPdf && (
            <AggrementSignature showContractSign={true} language={language} />
          )}
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

export default ContentPdfPreview;
