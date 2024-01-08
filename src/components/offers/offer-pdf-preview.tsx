import { PDFResponse } from "@/types/pdf";
import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { Header } from "../reactPdf/header";
import { ContactAddress } from "../reactPdf/contact-address";
import { AddressDetails } from "../reactPdf/address-details";
import { ServiceTableHederRow } from "../reactPdf/service-table-header-row";
import { ServiceTableRow } from "../reactPdf/service-table-row";
import { ServicesTotalAmount } from "../reactPdf/services-total-ammount";
import { Footer } from "../reactPdf/footer";
import { AdditionalDetails } from "../reactPdf/additional-details";
import { EmailHeaderProps, PdfProps, TemplateType } from "@/types";
import { EmailTemplate } from "@/types/settings";
import { useEffect, useState } from "react";
import LoadingState from "@/base-components/loadingEffect/loading-state";

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
      "<h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p>",
  },

  offerID: {
    discountAmount: "65675",
    discountDescription:
      "This is discount description, This is discount description, , This is discount description, This is discount description",
    subTotal: "555",
    taxAmount: "7.7",
    total: "3456",
  },
  qrDetails: {
    bank: {
      heading: "Empfangsschenin",
      account: "Konto/ Zahlbar an",
      ibanNumber: "CH48 0900 0000 1556 1356 9",
      bankName: "Rahal GmbH",
      companyAddress: "St.Urbanstrasse 79",
      street: "4914 Roggwil",
      referenceNumber: "27 12323 0000 0000 0006 22926",
      payable: "Zahlbar durch",
      payableName: "Rahal GmbH",
      payableAddress: "St. Urbanstrasse  79",
      payableStreet: "4914 Roggwill BE",
      currency: "CHF",
      amount: "12221",
    },
    qr: {
      heading: "Zahlteil",
      currency: "CHF",
      amount: "23232",
      qrCodeImage: "",
    },
  },
};

export const A4_WIDTH = 595; // 72dpi
export const A4_HEIGHT = 842; // 72dpi

const OfferPdf = ({
  offerData,
  emailTemplateSettings,
  templateSettings,
}: {
  offerData?: PdfProps<EmailHeaderProps>;
  templateSettings: TemplateType | null;
  emailTemplateSettings: EmailTemplate | null;
}) => {
  const headerDetails = offerData?.headerDetails;
  const { address, header, workDates } = offerData?.movingDetails || {};
  const contactAddress = offerData?.contactAddress;
  const serviceItem = offerData?.serviceItem;
  const serviceItemFooter = offerData?.serviceItemFooter;
  const aggrementDetails = offerData?.aggrementDetails;
  const footerDetails = offerData?.footerDetails;
  return (
    <PDFViewer width={A4_WIDTH} height={A4_HEIGHT}>
      <Document>
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

            <AddressDetails {...{ address, header, workDates }} />

            <ServiceTableHederRow />
            {serviceItem?.map((item, index) => (
              <ServiceTableRow {...item} key={index} />
            ))}
            <ServicesTotalAmount {...serviceItemFooter} />
          </View>
          <Footer
            documentDetails={footerDetails}
            emailTemplateSettings={emailTemplateSettings}
            templateSettings={templateSettings}
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
            documentDetails={footerDetails}
            emailTemplateSettings={emailTemplateSettings}
            templateSettings={templateSettings}
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default OfferPdf;

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
