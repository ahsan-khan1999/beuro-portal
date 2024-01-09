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
import { ContactDetailsProps } from "@/types";

export const ContactAddress = ({
  address,
  email,
  phone,
}: Partial<ContactDetailsProps>) => (
  <View style={container}>
    <View style={leftColumn}>
      <Text style={textBase}>{address?.name}</Text>
      <Text style={textBase}>{address?.streetWithNumber}</Text>
      <Text style={textBase}>{`${address?.postalCode} ${address?.city}`}</Text>
    </View>
    <View style={rightColumn}>
      <View style={{ display: "flex", flexDirection: "row", marginBottom: 6 }}>
        <Text
          style={{
            fontSize: 12,
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
            fontSize: 12,
            fontWeight: "medium",
            color: "#404040",
            marginRight: 21,
          }}
        >
          Phone:
        </Text>
        <Text style={textBase}>{phone}</Text>
      </View>
    </View>
  </View>
);
