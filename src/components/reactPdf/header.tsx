import { DocumentHeaderDetailsProps } from "@/types";
import { HeaderProps } from "@/types/pdf";
import { HeaderLabel } from "@/utils/static";
import { formatDate, formatDateTimeToDate } from "@/utils/utility";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { useTranslation } from "next-i18next";

export const Header = ({
  createdBy,
  emailTemplateSettings,
  offerDate,
  offerNo,
  fileType
}: Partial<DocumentHeaderDetailsProps>) => {
  const { t: translate } = useTranslation();
  const fomrattedDate = formatDateTimeToDate(offerDate || "");
  const { FooterColour, textColour, logo } = emailTemplateSettings ?? {};
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: `#${FooterColour}`,
        padding: 20,
        fontFamily: 'Poppins',
      }}
      fixed
    >
      <View style={{ width: "60%" }}>
        <Image src={logo} style={{ width: 182, height: 73 }} />
      </View>
      <View style={{ width: "40%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: 4,
          }}
        >
          <Text
            style={{
              marginRight: 10,
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              // color: `#${textColour}`,
            }}
          >
            {fileType && HeaderLabel[fileType as keyof typeof HeaderLabel] || "Angebot"} Nr:

          </Text>
          <Text
            style={{
              fontSize: 10,
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
              marginRight: 10,
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              // color: `#${textColour}`,
            }}
          >
            {fileType && HeaderLabel[fileType as keyof typeof HeaderLabel] || "Angebots"}datum:
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 500,
              fontStyle: "medium",
              // color: `#${textColour}`,
            }}
          >
            {formatDateTimeToDate(offerDate || "")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", rowGap: 0 }}>
          <Text
            style={{
              marginRight: 10,
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              // color: `#${textColour}`,
            }}
          >
            Erstellt von:
          </Text>
          <Text
            style={{
              fontSize: 10,
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
