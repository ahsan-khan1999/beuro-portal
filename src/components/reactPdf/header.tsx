import { DocumentHeaderDetailsProps } from "@/types";
import { HeaderLabel, HeaderLabelNr } from "@/utils/static";
import { convertUTCToLocalDate, pdfDateFormat } from "@/utils/utility";
import { View, Text, Image } from "@react-pdf/renderer";

export const Header = ({
  createdBy,
  emailTemplateSettings,
  offerDate,
  offerNo,
  fileType,
  isReverseLogo,
  language = "de",
  isOffer,
  desireDate,
}: Partial<DocumentHeaderDetailsProps>) => {
  const { logo } = emailTemplateSettings ?? {};

  const langContent = {
    en: {
      no: "No",
      created_by: "Created By",
      offer: "Offer ",
      create: "Create",
      date: "Date",
      desire_date: "Desire Date",
      HeaderLabelNr: {
        offer: "Offer ",
        contract: "Contract ",
        invoice: "Invoice ",
        receipt: "Receipt ",
        report: "Report ",
      },
      HeaderLabel: {
        contract: "Create",
        invoice: "Invoice",
        receipt: "Receipt",
      },
    },
    de: {
      no: "Nr",
      created_by: "Erstellt Von",
      create: "Erstell",
      date: "Datum",
      offer: "Angebot ",
      desire_date: "Wunschdatum",
      HeaderLabelNr: {
        offer: "Angebot ",
        contract: "Vertrag ",
        invoice: "Rechnung ",
        receipt: "Quittung ",
        report: "Bericht ",
      },
      HeaderLabel: {
        contract: "Erstell",
        invoice: "Rechnung",
        receipt: "Quittung",
      },
    },
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: isReverseLogo ? "row-reverse" : "row",
        alignItems: "center",
        padding: 20,
        fontFamily: "Poppins",
      }}
      key={language}
      fixed
    >
      <View style={{ width: "65%" }}>
        {logo ? (
          <Image
            src={logo}
            style={{
              width: 182,
              height: 73,
              display: "flex",
              justifyContent: isReverseLogo ? "flex-end" : "flex-start",
              marginLeft: isReverseLogo ? "auto" : 0,
            }}
          />
        ) : (
          <View
            style={{
              width: 182,
              height: 73,
              display: "flex",
              justifyContent: isReverseLogo ? "flex-end" : "flex-start",
              marginLeft: isReverseLogo ? "auto" : 0,
            }}
          />
        )}
      </View>
      <View style={{ width: "35%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: 4,
          }}
        >
          <Text
            style={{
              fontSize: 8,
              fontWeight: 400,
              fontStyle: "normal",
              marginRight: 1,
            }}
          >
            {(fileType &&
              langContent[language as keyof typeof langContent]?.HeaderLabelNr[
                fileType as keyof typeof HeaderLabelNr
              ]) ||
              langContent[language as keyof typeof langContent]?.offer ||
              "Angebot "}
            {langContent[language as keyof typeof langContent]?.no || "Nr"}:{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
            }}
          >
            {offerNo}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 8,
              fontWeight: 400,
              fontStyle: "normal",
              marginRight: 1,
            }}
          >
            {(fileType &&
              langContent[language as keyof typeof langContent]?.HeaderLabel[
                fileType as keyof typeof HeaderLabel
              ]) ||
              langContent[language as keyof typeof langContent]?.create ||
              "Erstell"}{" "}
            {langContent[language as keyof typeof langContent]?.date || "datum"}
            :{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
            }}
          >
            {pdfDateFormat(offerDate || "", language || "de")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", rowGap: 0 }}>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 400,
              fontStyle: "normal",
              marginRight: 1,
            }}
          >
            {langContent[language as keyof typeof langContent]?.created_by ||
              "Erstellt von"}
            :{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
            }}
          >
            {createdBy}
          </Text>
        </View>
        {desireDate && (
          <View style={{ display: "flex", flexDirection: "row", rowGap: 0 }}>
            <Text
              style={{
                fontSize: 8,
                fontWeight: 400,
                fontStyle: "normal",
                marginRight: 2,
              }}
            >
              {langContent[language as keyof typeof langContent]?.desire_date ||
                "Desire Date"}{" "}
              :
            </Text>
            <Text
              style={{
                fontSize: 8,
                fontWeight: 500,
                fontStyle: "medium",
              }}
            >
              {convertUTCToLocalDate(desireDate)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
