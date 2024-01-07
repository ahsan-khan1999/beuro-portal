import { OfferDetails, ServicesTotalAmountProps } from "@/types/pdf";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginTop: 49,
    paddingHorizontal: 30,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 20
  },
  leftColumn: {
    flexDirection: "column",
    width: "65%",
  },
  rightColumn: {
    flexDirection: "column",
    width: "35%",
  },
  totalSection: {
    backgroundColor: "#404F6A",
    borderRadius: 4,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    fontSize: 12,
    color: "#1E1E1E",
  },
  whiteText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  subSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  discountDescription: {
    marginTop: 10,
    color: "#404040",
  },
});

export const ServicesTotalAmount = ({
  discountAmount,
  discountDescription,
  subTotal,
  taxAmount,
  total,
}: OfferDetails) => (
  <View style={styles.container}>
    <View style={styles.contentContainer}>
      <View style={styles.leftColumn}>
        <Text style={styles.discountDescription}>{discountDescription}</Text>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.subSection}>
          <Text style={styles.text}>Sub Total</Text>
          <Text style={styles.text}>{subTotal}</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.text}>Tax%</Text>
          <Text style={styles.text}>{taxAmount} CHF (7.7%)</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.text}>Discount:</Text>
          <Text style={styles.text}>{discountAmount} CHF</Text>
        </View>
        <View style={styles.totalSection}>
          <Text style={styles.whiteText}>Grand Total:</Text>
          <Text style={styles.whiteText}>{total} CHF</Text>
        </View>
      </View>
    </View>
  </View>
);
