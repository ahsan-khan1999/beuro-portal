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
import { GenderLabel } from "@/utils/static";

export const ContactAddress = ({
  address,
  email,
  phone,
  gender,
  mobile
}: Partial<ContactDetailsProps>) => (
  <View style={container}>
    <View style={leftColumn}>
      <Text style={textBase}>{GenderLabel[gender as keyof typeof GenderLabel]} {address?.name}</Text>
      <Text style={textBase}>{address?.streetWithNumber}</Text>
      <Text style={textBase}>{`${address?.postalCode} ${Country[address?.city as keyof typeof Country] || ""}`}</Text>
    </View>
    <View style={rightColumn}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 400,
            fontStyle: "normal",
            color: "#000",
            marginRight: 10
          }}
        >
          E-Mail:
        </Text>
        <Text style={textBase}>{email}</Text>
      </View>

      {
        (phone !== "+" && phone) &&
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              color: "#000",
              marginRight: 10

            }}
          >
            Telefon:
          </Text>
          <Text style={textBase}>{phone}</Text>
        </View>
      }
      {
        (mobile !== "+" && mobile) &&
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              color: "#000",
              width: 80,
              marginRight: 10

            }}
          >
            Handynummer:
          </Text>
          <Text style={textBase}>{mobile}</Text>
        </View>
      }
    </View>
  </View >
);
