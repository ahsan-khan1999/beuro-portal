import { DocumentHeaderDetailsProps } from "@/types";
import { HeaderProps } from "@/types/pdf";
import { formatDate, formatDateTimeToDate } from "@/utils/utility";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";

export const Header = ({
  createdBy,
  emailTemplateSettings,
  offerDate,
  offerNo,
}: Partial<DocumentHeaderDetailsProps>) => {
  const fomrattedDate = formatDateTimeToDate(offerDate || "");
  const { FooterColour, textColour, logo } = emailTemplateSettings ?? {};
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: `#${FooterColour}`,
        padding: 20,
      }}
      fixed
    >
      <View>
        <Image
          src={logo}
          style={{ width: 182, height: 73 }}
        />
      </View>
      <View>
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
              width: 100,
              fontSize: 12,
              fontWeight: "medium",
              color: `#${textColour}`,
            }}
          >
            Offer No:
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "medium", color: `#${textColour}` }}>
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
              width: 100,
              fontSize: 12,
              fontWeight: "medium",
              color: `#${textColour}`,
            }}
          >
            Offer Date:
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "medium", color: `#${textColour}` }}>
            {formatDateTimeToDate(offerDate || "")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", rowGap: 10 }}>
          <Text
            style={{
              width: 100,
              fontSize: 12,
              fontWeight: "medium",
              color: `#${textColour}`,
            }}
          >
            Created By:
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "medium", color: `#${textColour}` }}>
            {createdBy}
          </Text>
        </View>
      </View>
    </View>
  );
};
