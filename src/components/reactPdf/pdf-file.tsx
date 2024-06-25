import { PdfPreviewProps } from "@/types";
import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";
import { Header } from "./header";
import { ContactAddress } from "./contact-address";
import { AddressDetails } from "./address-details";
import { ServiceTableHederRow } from "./service-table-header-row";
import { ServiceTableRow } from "./service-table-row";
import { ServicesTotalAmount } from "./services-total-ammount";
import { Footer } from "./footer";
import { AdditionalDetails } from "./additional-details";
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

const PdfFile = ({
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
          <ContactAddress {...{ ...contactAddress }} />

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
          {/* {(isDiscount || serviceItemFooter?.isDiscount) && (
            <ServiceTableDiscountRow
              {...disscountTableRow}
              key={Math.random()}
              pagebreak={true}
              isDiscount={isDiscount}
            />
          )} */}
          <ServicesTotalAmount
            {...serviceItemFooter}
            systemSettings={systemSetting}
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
        <View style={{ paddingBottom: 100 }}>
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

export default PdfFile;
