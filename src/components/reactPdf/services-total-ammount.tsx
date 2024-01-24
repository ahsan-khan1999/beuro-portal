import { TAX_PERCENTAGE } from "@/services/HttpProvider";
import { ProductItemFooterProps } from "@/types";
import { OfferDetails, ServicesTotalAmountProps } from "@/types/pdf";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";
import { calculatePercentage, calculateTax } from "@/utils/utility";
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
  isShowExtraAmount,
  systemSettings,
  invoiceAmount,
  invoiceStatus,
  discountType,
  taxType,
  serviceDiscountSum
}: Partial<ProductItemFooterProps>) => {

  const isPaid = invoiceStatus && staticEnums["InvoiceStatus"][invoiceStatus] === 2;

  const unPaidAmount = Number(grandTotal) - Number(invoicePaidAmount)
  const calculatedDiscount = discountType && discountType === "Amount" ? discount : calculateTax(Number(discount), Number(subTotal))
  const calculatedTax = taxType && calculateTax(Number(tax), Number(subTotal)) || 0


  return (
    <View style={styles.container}>
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
            <Text style={styles.text}>{Number(subTotal).toFixed(2)}</Text>
          </View>
          <View style={styles.subSection}>
            <Text style={styles.text}>Steuer: </Text>
            <Text style={styles.text}>
              {Number(calculatedTax).toFixed(2)}  ({tax}%)
            </Text>
          </View>
          <View style={styles.subSection}>
            <Text style={styles.text}>Rabatt: </Text>
            <Text style={styles.text}>{serviceDiscountSum && (serviceDiscountSum + Number(calculatedDiscount)).toFixed(2) || calculatedDiscount} </Text>
          </View>
          {!isShowExtraAmount ? (
            <View style={styles.totalSection}>
              <Text style={styles.whiteText}>Gesamtsumme:</Text>
              <Text style={styles.whiteText}>
                {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
              </Text>
            </View>
          ) : (
            <View>
              <View style={styles.subSection}>
                <Text style={styles.text}>Gesamtsumme:</Text>
                <Text style={styles.text}>
                  {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                </Text>
              </View>
              <View style={styles.subSection}>
                <Text style={styles.text}>{!isPaid ? 'Fälliger Betrag' : 'Bezahlt'}:</Text>
                <Text style={styles.text}>{Number(invoiceAmount).toFixed(2)} </Text>
              </View>
              <View style={styles.totalSection}>
                <Text style={styles.whiteText}>Unbezahlter Betrag:</Text>
                <Text style={styles.whiteText}>{unPaidAmount.toFixed(2)} </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
