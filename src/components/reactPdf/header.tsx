import { DocumentHeaderDetailsProps } from "@/types";
import { HeaderProps } from "@/types/pdf";
import { formatDate, formatDateTimeToDate } from "@/utils/utility";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { useTranslation } from "next-i18next";

export const Header = ({
  createdBy,
  emailTemplateSettings,
  offerDate,
  offerNo,
}: Partial<DocumentHeaderDetailsProps>) => {
  const { t: translate } = useTranslation();
  const fomrattedDate = formatDateTimeToDate(offerDate || "");
  const { FooterColour, textColour, logo } = emailTemplateSettings ?? {};
  // if (FooterColour) styles.footerContainer.backgroundColor = ;
  //   if (textColour) styles.footerText.color = `#${textColour}`;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: `#${FooterColour}`,
        padding: 20,
        fontFamily: 'Poppins',
      }}
      fixed
    >
      <View style={{ width: "70%" }}>
        <Image src={logo} style={{ width: 182, height: 73 }} />
      </View>
      <View style={{ width: "30%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: 4,
            marginBottom: 6,
          }}
        >
          <Text
            style={{
              width: 90,
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              color: `#${textColour}`,
            }}
          >
            Angebot Nr:
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 500,
              fontStyle: "medium",
              color: `#${textColour}`,
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
            marginBottom: 6,
          }}
        >
          <Text
            style={{
              width: 90,
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              color: `#${textColour}`,
            }}
          >
            Angebotsdatum:
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 500,
              fontStyle: "medium",
              color: `#${textColour}`,
            }}
          >
            {formatDateTimeToDate(offerDate || "")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", rowGap: 10 }}>
          <Text
            style={{
              width: 90,
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              color: `#${textColour}`,
            }}
          >
            Erstellt von:
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 500,
              fontStyle: "medium",
              color: `#${textColour}`,
            }}
          >
            {createdBy}
          </Text>
        </View>
      </View>
    </View>
  );
};
