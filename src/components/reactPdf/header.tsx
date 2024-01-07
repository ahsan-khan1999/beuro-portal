import { HeaderProps } from "@/types/pdf";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";

export const Header = ({
  companyLogo,
  offerNumber,
  offerDate,
  createdBy,
}: HeaderProps) => (
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
        src={"/assets/images/logo.png"}
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
            fontSize: 16,
            fontWeight: "medium",
            color: "#404040",
          }}
        >
          Offer No:
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "medium", color: "#000" }}>
          {offerNumber}
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
            fontSize: 16,
            fontWeight: "medium",
            color: "#404040",
          }}
        >
          Offer Date:
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "medium", color: "#000" }}>
          {offerDate}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", rowGap: 10 }}>
        <Text
          style={{
            width: 100,
            fontSize: 16,
            fontWeight: "medium",
            color: "#404040",
          }}
        >
          Created By:
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "medium", color: "#000" }}>
          {createdBy?.fullName}
        </Text>
      </View>
    </View>
  </View>
);
