import { PdfPreviewProps } from "@/types";
import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Header } from "./header";
import { ContactAddress } from "./contact-address";
import { AddressDetails } from "./address-details";
import { ServiceTableHederRow } from "./service-table-header-row";
import { ServiceTableRow } from "./service-table-row";
import { ServicesTotalAmount } from "./services-total-ammount";
import { Footer } from "./footer";
import { AdditionalDetails } from "./additional-details";
import { ServiceTableDiscountRow } from "./service-table-discount";

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
}: PdfPreviewProps) => {
  const headerDetails = data?.headerDetails;
  const { address, header, workDates, time } = data?.movingDetails || {};
  const contactAddress = data?.contactAddress;
  const serviceItem = data?.serviceItem;
  const serviceItemFooter = data?.serviceItemFooter;
  const aggrementDetails = data?.aggrementDetails;
  const footerDetails = data?.footerDetails;
  const disscountTableRow = {
    serviceTitle: "Rabatt",
    price: Number(serviceItemFooter?.discount),
    unit: "-",
    totalPrice: Number(serviceItemFooter?.discount),
    serviceType: "",
    description: serviceItemFooter?.discountDescription,
    count: "-",
    pagebreak: true,
    discount: Number(serviceItemFooter?.discount),
    totalDiscount: serviceItemFooter?.serviceDiscountSum,
    isGlobalDiscount: serviceItemFooter?.isDiscount,
  };
  const isDiscount =
    serviceItemFooter?.serviceDiscountSum &&
    Number(serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;
  const pageBreakCondition = isDiscount || serviceItemFooter?.isDiscount;
  return (
    <Document title={headerDetails?.offerNo || ""}>
      <Page style={styles.body} dpi={72}>
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

          <AddressDetails {...{ address, header, workDates, time }} />

          <ServiceTableHederRow isDiscount={isDiscount} />
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
          {(isDiscount || serviceItemFooter?.isDiscount) && (
            <ServiceTableDiscountRow
              {...disscountTableRow}
              key={Math.random()}
              pagebreak={true}
              isDiscount={isDiscount}
            />
          )}
          <ServicesTotalAmount
            {...serviceItemFooter}
            systemSettings={systemSetting}
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
          {/* <ContactAddress {...{ ...contactAddress }} /> */}
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
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "Poppins",
    paddingBottom: 100,
  },
});

export default PdfFile;
