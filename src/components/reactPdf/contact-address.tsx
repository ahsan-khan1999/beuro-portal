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
import { Country } from "./address-details";

export const ContactAddress = ({
  address,
  email,
  phone,
}: Partial<ContactDetailsProps>) => (
  <View style={container}>
    <View style={leftColumn}>
      <Text style={textBase}>Herr/Frau {address?.name}</Text>
      <Text style={textBase}>{address?.streetWithNumber}</Text>
      <Text style={textBase}>{`${address?.postalCode} ${Country[address?.city as keyof typeof Country]}`}</Text>
    </View>
    <View style={rightColumn}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 400,
            fontStyle: "normal",
            color: "#000",
            width: 50,
          }}
        >
          E-Mail:
        </Text>
        <Text style={textBase}>{email}</Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 400,
            fontStyle: "normal",
            color: "#000",
            width: 50,
          }}
        >
          Telefon:
        </Text>
        <Text style={textBase}>{phone}</Text>
      </View>
    </View>
  </View>
);
