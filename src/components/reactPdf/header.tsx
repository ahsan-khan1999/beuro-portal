import { DocumentHeaderDetailsProps } from "@/types";
import { HeaderProps } from "@/types/pdf";
import { formatDate, formatDateTimeToDate } from "@/utils/utility";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";

export const Header = ({
  createdBy,
  emailTemplateSettings,
  logo,
  offerDate,
  offerNo,
}: Partial<DocumentHeaderDetailsProps>) => {
  const fomrattedDate = formatDateTimeToDate(offerDate || "");
  console.log(logo)
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEE",
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
              color: "#404040",
            }}
          >
            Offer No:
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "medium", color: "#000" }}>
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
              color: "#404040",
            }}
          >
            Offer Date:
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "medium", color: "#000" }}>
            {formatDateTimeToDate(offerDate || "")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", rowGap: 10 }}>
          <Text
            style={{
              width: 100,
              fontSize: 12,
              fontWeight: "medium",
              color: "#404040",
            }}
          >
            Created By:
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "medium", color: "#000" }}>
            {createdBy}
          </Text>
        </View>
      </View>
    </View>
  );
};
