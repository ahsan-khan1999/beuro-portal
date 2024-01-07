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
      <Text style={textBase}>Email: {email}</Text>
      <Text style={[textBase, greyText]}>Phone: {phoneNumber}</Text>
    </View>
  </View>
);
