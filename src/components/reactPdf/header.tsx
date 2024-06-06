import { DocumentHeaderDetailsProps } from "@/types";
import { HeaderLabel, HeaderLabelNr } from "@/utils/static";
import { formatDateTimeToDate, pdfDateFormat } from "@/utils/utility";
import { View, Text, Image } from "@react-pdf/renderer";

export const Header = ({
  createdBy,
  emailTemplateSettings,
  offerDate,
  offerNo,
  fileType,
  isReverseLogo,
  language,
}: Partial<DocumentHeaderDetailsProps>) => {
  const fomrattedDate = formatDateTimeToDate(offerDate || "");
  const { FooterColour, textColour, logo } = emailTemplateSettings ?? {};

  const langContent = {
    en: {
      no: "No",
      created_by: "Created By",
      offer: "Offer ",
      create: "Create",
      date: "date",
      HeaderLabelNr: {
        offer: "Offer ",
        contract: "Contract ",
        invoice: "Invoice ",
        receipt: "Receipt ",
      },
      HeaderLabel: {
        contract: "Create",
        invoice: "Invoice",
        receipt: "Receipt",
      },
    },
    de: {
      no: "Nr",
      created_by: "Erstellt von",
      create: "Erstell",
      date: "datum",
      offer: "Angebot ",
      HeaderLabelNr: {
        offer: "Angebot ",
        contract: "Vertrag ",
        invoice: "Rechnung ",
        receipt: "Quittung ",
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
        // backgroundColor: `#${FooterColour}`,
        padding: 20,
        fontFamily: "Poppins",
      }}
      fixed
    >
      <View style={{ width: "65%" }}>
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
              // color: `#${textColour}`,
            }}
          >
            {(fileType &&
              langContent[language]?.HeaderLabelNr[
                fileType as keyof typeof HeaderLabel
              ]) ||
              langContent[language]?.offer}
            {langContent[language]?.no}:{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
              // color: `#${textColour}`,
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
              // color: `#${textColour}`,
            }}
          >
            {(fileType &&
              langContent[language]?.HeaderLabel[
                fileType as keyof typeof HeaderLabel
              ]) ||
              langContent[language]?.create}{" "}
            {langContent[language]?.date}:{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
              // color: `#${textColour}`,
            }}
          >
            {pdfDateFormat(offerDate || "", "de")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", rowGap: 0 }}>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 400,
              fontStyle: "normal",
              marginRight: 1,
              // color: `#${textColour}`,
            }}
          >
            {/* {translate("pdf.created_by")} : */}
            {langContent[language]?.created_by}:{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
              // color: `#${textColour}`,
            }}
          >
            {createdBy}
          </Text>
        </View>
      </View>
    </View>
  );
};
