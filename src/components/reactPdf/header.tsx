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
      <View style={{ display: "flex", flexDirection: "row", rowGap: 10 }}>
        <Text style={{ width: 100 }}>Offer No:</Text>
        <Text>{offerNumber}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", rowGap: 10 }}>
        <Text style={{ width: 100 }}>Offer Date:</Text>
        <Text>{offerDate}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", rowGap: 10 }}>
        <Text style={{ width: 100 }}>Created By:</Text>
        <Text>{createdBy}</Text>
      </View>
    </View>
  </View>
);
