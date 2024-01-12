import { TAX_PERCENTAGE } from "@/services/HttpProvider";
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
    fontSize: 10,
    fontWeight: 500,
    fontStyle: "medium",
    color: "#1E1E1E",
  },
  whiteText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  discountDescription: {
    marginTop: 6,
    color: "#404040",
    fontSize: 10,
    fontWeight: 400,
    fontStyle: "normal",
  },
});

export const ServicesTotalAmount = ({
  discount,
  grandTotal,
  subTotal,
  tax,
  invoiceCreatedAmount,
  invoicePaidAmount,
  isInvoice,
  systemSettings,
}: Partial<ProductItemFooterProps>) => {
  const { t: translate } = useTranslation(["common"]);

  let dueAmount = 0;
  if (invoiceCreatedAmount) {
    dueAmount = Number(grandTotal) - Number(invoiceCreatedAmount);
  }

  return (
    <View style={styles.container} fixed>
      <View style={styles.contentContainer}>
        <View style={styles.leftColumn}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 500,
              fontStyle: "medium",
              color: "#000",
            }}
          >
            Bedingungen für Umzugsschätzungen
          </Text>
          <Text style={styles.discountDescription}>
            Unten finden Sie weitere Informationen zu den Richtlinien und
            Bedingungen. Bitte nehmen Sie sich die Zeit, um die folgenden
            Geschäftsbedingungen zu verstehen.
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.subSection}>
            <Text style={styles.text}>Zwischensumme: </Text>
            <Text style={styles.text}>{subTotal}</Text>
          </View>
          <View style={styles.subSection}>
            <Text style={styles.text}>Steuer%: </Text>
            <Text style={styles.text}>
              {tax} ({TAX_PERCENTAGE}%)
            </Text>
          </View>
          <View style={styles.subSection}>
            <Text style={styles.text}>Rabatt: </Text>
            <Text style={styles.text}>{discount} </Text>
          </View>
          {!isInvoice ? (
            <View style={styles.totalSection}>
              <Text style={styles.whiteText}>Gesamtsumme:</Text>
              <Text style={styles.whiteText}>
                {grandTotal} {systemSettings?.currency}
              </Text>
            </View>
          ) : (
            <View>
              <View style={styles.subSection}>
                <Text style={styles.text}>Grand Total:</Text>
                <Text style={styles.text}>
                  {grandTotal} {systemSettings?.currency}
                </Text>
              </View>
              <View style={styles.subSection}>
                <Text style={styles.text}>Bezahlter Betrag:</Text>
                <Text style={styles.text}>{invoicePaidAmount} </Text>
              </View>
              <View style={styles.totalSection}>
                <Text style={styles.whiteText}>Ausstehender Betrag:</Text>
                <Text style={styles.whiteText}>{dueAmount} </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
