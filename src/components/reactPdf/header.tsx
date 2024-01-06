import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "./style-sheet";
import { PdfHeader } from "./react-pdf";

export const Header = ({
  companyLogo,
  offerNumber,
  offerDate,
  createdBy,
}: PdfHeader) => (
  <View style={styles.header}>
    {/* <View style={styles.logoSection}> */}
      {/* <Image source={companyLogo} /> */}
    {/* </View> */}
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Offer No:</Text>
        <Text style={styles.value}>{offerNumber}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Offer Date:</Text>
        <Text style={styles.value}>{offerDate}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Created By:</Text>
        <Text style={styles.value}>{createdBy}</Text>
      </View>
    </View>
  </View>
);
