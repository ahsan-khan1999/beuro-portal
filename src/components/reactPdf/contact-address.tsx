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
  mobile,
  isReverseInfo,
}: Partial<ContactDetailsProps>) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: isReverseInfo ? "row-reverse" : "row",
        marginTop: 5,
        padding: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: isReverseInfo ? "flex-end" : "flex-start",
          rowGap: 0,
          width: isReverseInfo ? "35%" : "65%",
          marginLeft: isReverseInfo ? "30" : 0,
        }}
      >
        <Text style={textBase}>
          {/* {address?.companyName && "c/o"} */}
          {address?.companyName}
        </Text>
        <Text style={textBase}>
          {GenderLabel[gender as keyof typeof GenderLabel]} {address?.name}
        </Text>
        <Text style={textBase}>{address?.streetWithNumber}</Text>
        <Text style={textBase}>{`${address?.postalCode} ${
          Country[address?.city as keyof typeof Country] || ""
        }`}</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          rowGap: 0,
          width: isReverseInfo ? "65%" : "35%",
        }}
      >
        {email && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            {/* <Text
              style={{
                fontSize: 7,
                fontWeight: 400,
                fontStyle: "normal",
                color: "#000",
                marginRight: 1,
              }}
            >
              E-Mail :
            </Text> */}
            <Text style={textBase}>{email}</Text>
          </View>
        )}

        {phone !== "+" && phone && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            {/* <Text
              style={{
                fontSize: 7,
                fontWeight: 400,
                fontStyle: "normal",
                color: "#000",
                marginRight: 1,
              }}
            >
              Telefon :
            </Text> */}
            <Text style={textBase}>{phone}</Text>
          </View>
        )}
        {mobile !== "+" && mobile && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            {/* <Text
              style={{
                fontSize: 7,
                fontWeight: 400,
                fontStyle: "normal",
                color: "#000",
                marginRight: 1,
              }}
            >
              Handynummer :
            </Text> */}
            <Text style={textBase}>{mobile}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
