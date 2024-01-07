import { ProductItemFooterProps } from "@/types";
import { OfferDetails, ServicesTotalAmountProps } from "@/types/pdf";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { useTranslation } from "next-i18next";

const styles = StyleSheet.create({
  container: {
    marginTop: 49,
    paddingHorizontal: 30,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 20,
  },
  leftColumn: {
    flexDirection: "column",
    width: "60%",
  },
  rightColumn: {
    flexDirection: "column",
    width: "40%",
  },
  totalSection: {
    backgroundColor: "#404F6A",
    borderRadius: 4,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    columnGap: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#1E1E1E",
  },
  whiteText: {
    fontSize: 16,
    fontWeight: "bold",
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
    fontWeight: "normal",
    fontSize: 14,
  },
});

export const ServicesTotalAmount = ({
  discount,
  grandTotal,
  subTotal,
  tax,
}: Partial<ProductItemFooterProps>) => {
 const {t: translate} = useTranslation();
 
 return <View style={styles.container}>
    <View style={styles.contentContainer}>
      <View style={styles.leftColumn}>
        <Text style={{ fontSize: 16, fontWeight: "medium", color: "#000" }}>
          {translate("pdf.condition_for_moving")}
        </Text>
        <Text style={styles.discountDescription}>
          {translate("pdf.pdf_description")}
        </Text>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.subSection}>
          <Text style={styles.text}>Sub Total: </Text>
          <Text style={styles.text}>{subTotal}</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.text}>Tax%: </Text>
          <Text style={styles.text}>{tax} CHF (7.7%)</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.text}>Discount: </Text>
          <Text style={styles.text}>{discount} CHF</Text>
        </View>
        <View style={styles.totalSection}>
          <Text style={styles.whiteText}>Grand Total:</Text>
          <Text style={styles.whiteText}>{grandTotal} CHF</Text>
        </View>
      </View>
    </View>
  </View>
};
