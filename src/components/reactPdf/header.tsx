import { DocumentHeaderDetailsProps } from "@/types";
import { HeaderProps } from "@/types/pdf";
import { HeaderLabel } from "@/utils/static";
import { formatDateTimeToDate, pdfDateFormat } from "@/utils/utility";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const Header = ({
  createdBy,
  emailTemplateSettings,
  offerDate,
  offerNo,
  fileType,
  isReverseLogo,
}: Partial<DocumentHeaderDetailsProps>) => {
  const fomrattedDate = formatDateTimeToDate(offerDate || "");
  const { FooterColour, textColour, logo } = emailTemplateSettings ?? {};
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
            {(fileType && HeaderLabel[fileType as keyof typeof HeaderLabel]) ||
              "Angebot"}
            Nr :
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
            {(fileType && HeaderLabel[fileType as keyof typeof HeaderLabel]) ||
              "Angebots"}
            datum :
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
            Erstellt von :
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
