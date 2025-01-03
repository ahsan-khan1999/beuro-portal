import path from "path";
import { Footer } from "./footer";
import { Header } from "./header";
import { PdfPreviewProps } from "@/types";
import { ContactAddress } from "./contact-address";
import { AddressDetails } from "./address-details";
import { ServiceTableHederRow } from "./service-table-header-row";
import { ServiceTableRow } from "./service-table-row";
import { ServicesTotalAmount } from "./services-total-ammount";
import { AggrementSignature } from "./aggrement-signature";
import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";
import { AdditionalDetails } from "./additional-details";


const fontPath = path.resolve("./public/assets/fonts");

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: `${fontPath}/Poppins-Thin.ttf`,
      fontStyle: "thin",
      fontWeight: 100,
    },
    {
      src: `${fontPath}/Poppins-Regular.ttf`,
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: `${fontPath}/Poppins-Medium.ttf`,
      fontStyle: "medium",
      fontWeight: 500,
    },
    {
      src: `${fontPath}/Poppins-Light.ttf"`,
      fontStyle: "light",
      fontWeight: 300,
    },
    {
      src: `${fontPath}/Poppins-SemiBold.ttf`,
      fontStyle: "semibold",
      fontWeight: 600,
    },
    {
      src: `${fontPath}/Poppins-Bold.ttf`,
      fontStyle: "bold",
      fontWeight: 700,
    },
    {
      src: `${fontPath}/Poppins-Black.ttf`,
      fontStyle: "black",
      fontWeight: 800,
    },
  ],
});

export const ServerPdf = ({
  data,
  templateSettings,
  emailTemplateSettings,
  systemSetting,
  lang,
  showContractSign,
  isOfferPdf,
}: PdfPreviewProps) => {
  const headerDetails = data?.headerDetails;
  const { address, header, workDates, time } = data?.movingDetails || {};
  const contactAddress = data?.contactAddress;
  const serviceItem = data?.serviceItem;
  const serviceItemFooter = data?.serviceItemFooter;
  const aggrementDetails = data?.aggrementDetails;
  const footerDetails = data?.footerDetails;

  const isDiscount =
    serviceItemFooter?.serviceDiscountSum &&
    Number(serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;

  const pageBreakCondition = isDiscount || serviceItemFooter?.isDiscount;

  return (
    <Document title={headerDetails?.offerNo || ""}>
      <Page style={styles.body} dpi={72}>
        <Header {...headerDetails} language={lang} />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120,
          }}
        >
          <ContactAddress {...{ ...contactAddress, language: lang }} />

          <AddressDetails
            {...{ address, header, workDates, time }}
            language={lang}
          />

          <ServiceTableHederRow isDiscount={isDiscount} language={lang} />
          {serviceItem?.map((item, index) => (
            <ServiceTableRow
              {...item}
              key={index}
              pagebreak={
                !pageBreakCondition
                  ? serviceItem?.length === 1
                    ? false
                    : index === serviceItem?.length - 1
                  : false
              }
              isDiscount={isDiscount}
            />
          ))}

          <ServicesTotalAmount
            {...serviceItemFooter}
            systemSettings={systemSetting}
            isBreakPage={pageBreakCondition}
            language={lang}
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

      <Page style={styles.body}>
        <Header {...headerDetails} language={lang} />
        <View style={{ paddingBottom: isOfferPdf ? 110 : 0 }}>
          <AdditionalDetails description={aggrementDetails} />
        </View>
        {isOfferPdf && (
          <AggrementSignature
            showContractSign={showContractSign}
            language={lang}
          />
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
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "Poppins",
    paddingBottom: 100,
  },
});
