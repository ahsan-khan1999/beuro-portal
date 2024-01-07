import { ContactAddressProps } from "@/types/pdf";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  container,
  greyText,
  leftColumn,
  rightColumn,
  textBase,
  textSmall,
} from "./style-sheet";

export const ContactAddress = ({
  customerDetail,
  createdBy: { email },
  company: { phoneNumber },
}: ContactAddressProps) => (
  <View style={container}>
    <View style={leftColumn}>
      <Text style={textBase}>{customerDetail.fullName}</Text>
      <Text style={textBase}>{customerDetail?.address?.streetNumber}</Text>
      <Text
        style={textBase}
      >{`${customerDetail?.address?.postalCode} ${customerDetail?.address?.country}`}</Text>
    </View>
    <View style={rightColumn}>
      <View style={{ display: "flex", flexDirection: "row", marginBottom: 6 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "medium",
            color: "#404040",
            marginRight: 21,
          }}
        >
          Email:
        </Text>
        <Text style={textBase}>{email}</Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "medium",
            color: "#404040",
            marginRight: 21,
          }}
        >
          Phone:
        </Text>
        <Text style={textBase}>{phoneNumber}</Text>
      </View>
    </View>
  </View>
);
