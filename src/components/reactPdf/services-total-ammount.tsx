import { ProductItemFooterProps } from "@/types";
import { staticEnums } from "@/utils/static";
import { calculateTax } from "@/utils/utility";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 30,
  },
  contentContainer: {
    flexDirection: "column",
    // justifyContent: "space-between",
    rowGap: 20,
  },
  bottomRow: {
    flexDirection: "row",
    width: "100%",
  },
  topRow: {
    // flexDirection: "row",
    width: "100%",
  },
  totalSection: {
    backgroundColor: "#404F6A",
    borderRadius: 4,
    padding: 8,
    // marginTop: 10,
    // columnGap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottom: "1px",
    // borderBottomColor: "#ccc",
    // paddingBottom: 5,
    // marginBottom: 5,
  },
  grandTotalText: {
    fontSize: 8,
    fontStyle: "bold",
    fontWeight: 600,
    color: "#404F6A",
  },
  text: {
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    color: "#1E1E1E",
  },
  paidText: {
    fontSize: 8,
    fontWeight: 400,
    fontStyle: "normal",
    color: "#565656",
  },
  discountDescriptionText: {
    fontSize: 8,
    fontWeight: 400,
    fontStyle: "normal",
    color: "#565656",
  },
  whiteText: {
    fontSize: 8,
    fontWeight: 600,
    fontStyle: "bold",
    color: "#FFFFFF",
  },
  subSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px",
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 5,
  },
  dueAmountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    borderTop: "1px",
    borderTopColor: "#ccc",
  },
  paidAmountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px",
    borderBottomColor: "#ccc",
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
  },
  subInvoicepaidAmountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px",
    borderBottomColor: "#ccc",
    paddingTop: 5,
    paddingBottom: 5,
  },

  receiptPaidAmountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px",
    borderTopColor: "#ccc",
    paddingTop: 5,
    marginBottom: 5,
  },

  taxSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  discountDescription: {
    marginTop: 6,
    color: "#404040",
    fontSize: 8,
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
  serviceDiscountSum,
  isTax,
  isDiscount,
  isMainInvoice,
  isSubInvoicePdf,
  isReceiptPdf,
  isOfferPDF,
  isContractPDF,
  discountDescription,
  dueAmount,
  language,
}: Partial<ProductItemFooterProps>) => {
  const isPaid =
    invoiceStatus && staticEnums["InvoiceStatus"][invoiceStatus] === 2;

  const unPaidAmount = Number(grandTotal) - Number(invoicePaidAmount);

  const calculatedDiscount =
    discountType && discountType === "Amount"
      ? discount
      : calculateTax(Number(discount), Number(subTotal));

  const calculatedTax =
    (taxType &&
      calculateTax(
        Number(tax),
        Number(Number(subTotal) - Number(isDiscount ? calculatedDiscount : 0))
      )) ||
    0;

  const totalDiscount = !isDiscount
    ? serviceDiscountSum
    : (serviceDiscountSum &&
        (serviceDiscountSum + Number(calculatedDiscount)).toFixed(2)) ||
      Number(calculatedDiscount).toFixed(2);

  const discountAmount = (Number(discount) / 100) * Number(subTotal);
  const totalAfterDiscount =
    discountType && discountType === "Amount"
      ? Number(subTotal) - Number(discount)
      : Number(subTotal) - Number(discountAmount);

  const discountValue =
    discountType && discountType === "Amount" ? discount : discountAmount;

  const langContent = {
    en: {
      sub_total: "Sub Total",
      discount: "Discount",
      total_after_discount: "Total after Discount",
      grand_total: "Grand Total",
      paid_amount: "Paid Amount",
      unpaid_amount: "Unpaid Amount",
      due_amount: "Due Amount",
      total_paid_amount: "Total Paid Amount",
      amount_paid_last: "The amount you paid last time.",
      general_terms: "General Terms and Conditions",
      terms_des:
        "Below you will find further information on the guidelines and conditions. Please take the time to understand the following terms and conditions.",
    },
    de: {
      sub_total: "Zwischensumme",
      discount: "Rabatt",
      total_after_discount: "Gesamtsumme nach Rabatt",
      grand_total: "Gesamtsumme",
      paid_amount: "Bezahlt Betrag",
      unpaid_amount: "Unbezahlter Betrag",
      due_amount: "Fälliger Betrag",
      total_paid_amount: "Bezahlte Gesamtbetrag",
      amount_paid_last: "Der Betrag, den Sie beim letzten Mal bezahlt haben.",
      general_terms: "Allgemeine Geschäftsbedingungen",
      terms_des:
        "Unten finden Sie weitere Informationen zu den Richtlinien und Bedingungen. Bitte nehmen Sie sich die Zeit, um die folgenden Geschäftsbedingungen zu verstehen.",
    },
  };

  return (
    <View style={styles.container} break={true}>
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <View style={styles.subSection}>
            <Text style={styles.text}>
              {langContent[language as keyof typeof langContent]?.sub_total ||
                "Zwischensumme"}
              :{" "}
            </Text>
            <Text style={styles.text}>
              {Number(subTotal).toFixed(2)} {systemSettings?.currency}
            </Text>
          </View>
          {isDiscount && (
            <View style={styles.subSection}>
              <Text style={styles.text}>
                {langContent[language as keyof typeof langContent]?.discount ||
                  "Rabatt"}
                :{" "}
              </Text>
              <Text style={styles.discountDescriptionText}>
                {discountDescription}
              </Text>
              <Text style={styles.text}>
                -{Number(discountValue).toFixed(2)}
                {systemSettings?.currency}{" "}
                {discountType && discountType === "Percent" && `(${discount}%)`}
              </Text>
            </View>
          )}
          {isDiscount && (
            <View style={styles.subSection}>
              <Text style={styles.text}>
                {langContent[language as keyof typeof langContent]
                  ?.total_after_discount || "Gesamtsumme nach Rabatt"}
                :{" "}
              </Text>
              <Text style={styles.text}>
                {Number(totalAfterDiscount).toFixed(2)}{" "}
                {systemSettings?.currency}
              </Text>
            </View>
          )}
          <View style={styles.taxSection}>
            <Text style={styles.text}>Mwst ({tax}%): </Text>
            {(isTax && (
              <Text style={styles.text}>
                {Number(calculatedTax).toFixed(2)} {systemSettings?.currency}
              </Text>
            )) || <Text style={styles.text}>{0}</Text>}
          </View>

          {(isOfferPDF || isContractPDF) &&
            (!isShowExtraAmount ? (
              <View style={styles.totalSection}>
                <Text style={styles.whiteText}>
                  {langContent[language as keyof typeof langContent]
                    ?.grand_total || "Gesamtsumme"}
                  :
                </Text>
                <Text style={styles.whiteText}>
                  {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                </Text>
              </View>
            ) : (
              <View>
                <View style={styles.subSection}>
                  <Text style={styles.text}>
                    {langContent[language as keyof typeof langContent]
                      ?.grand_total || "Gesamtsumme"}
                    :
                  </Text>
                  <Text style={styles.text}>
                    {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                  </Text>
                </View>
                {/* <View style={styles.subSection}>
                  <Text style={styles.text}>
                    {!isPaid ? "Fälliger Betrag" : "Bezahlt Menge"}:
                  </Text>
                  <Text style={styles.text}>
                    {Number(invoiceAmount).toFixed(2)}{" "}
                  </Text>
                </View>
                <View style={styles.totalSection}>
                  <Text style={styles.text}>Unbezahlter Betrag:</Text>
                  <Text style={styles.text}>{unPaidAmount.toFixed(2)} </Text>
                </View> */}
              </View>
            ))}

          {isMainInvoice && (
            <View>
              <View style={styles.totalSection}>
                <Text style={styles.whiteText}>
                  {langContent[language as keyof typeof langContent]
                    ?.grand_total || "Gesamtsumme"}
                  :
                </Text>
                <Text style={styles.whiteText}>
                  {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                </Text>
              </View>
              {Number(invoiceAmount) > 0 && (
                <View>
                  <View style={styles.paidAmountSection}>
                    <Text style={styles.text}>
                      {langContent[language as keyof typeof langContent]
                        ?.paid_amount || "Bezahlt Betrag"}
                      :
                    </Text>
                    <Text style={styles.text}>
                      -{Number(invoiceAmount).toFixed(2)}
                      {systemSettings?.currency}
                    </Text>
                  </View>
                  {Number(unPaidAmount) > 0 && (
                    <View style={styles.subSection}>
                      <Text style={styles.text}>
                        {langContent[language as keyof typeof langContent]
                          ?.unpaid_amount || "Unbezahlter Betrag"}
                        :
                      </Text>
                      <Text style={styles.text}>
                        {unPaidAmount.toFixed(2)} {systemSettings?.currency}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}

          {isSubInvoicePdf &&
            (!isShowExtraAmount ? (
              <View style={styles.totalSection}>
                <Text style={styles.whiteText}>
                  {langContent[language as keyof typeof langContent]
                    ?.grand_total || "Gesamtsumme"}
                  :
                </Text>
                <Text style={styles.whiteText}>
                  {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                </Text>
              </View>
            ) : (
              <View>
                <View style={styles.dueAmountSection}>
                  <Text style={styles.text}>
                    {langContent[language as keyof typeof langContent]
                      ?.due_amount || "Fälliger Betrag"}
                    :
                  </Text>
                  <Text style={styles.text}>
                    {Number(dueAmount).toFixed(2)} {systemSettings?.currency}
                  </Text>
                </View>
                <View>
                  <View style={styles.totalSection}>
                    <Text style={styles.whiteText}>
                      {langContent[language as keyof typeof langContent]
                        ?.grand_total || "Gesamtsumme"}
                      :
                    </Text>
                    <Text style={styles.whiteText}>
                      {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                    </Text>
                  </View>
                  {Number(invoiceAmount) > 0 && (
                    <View style={styles.subInvoicepaidAmountSection}>
                      <Text style={styles.text}>
                        {langContent[language as keyof typeof langContent]
                          ?.paid_amount || "Bezahlt Betrag"}
                        :
                      </Text>
                      <Text style={styles.text}>
                        -{Number(invoiceAmount).toFixed(2)}
                        {systemSettings?.currency}
                      </Text>
                    </View>
                  )}
                  {Number(unPaidAmount) > 0 && (
                    <View style={styles.paidAmountSection}>
                      <Text style={styles.text}>
                        {langContent[language as keyof typeof langContent]
                          ?.unpaid_amount || "Unbezahlter Betrag"}
                        :
                      </Text>
                      <Text style={styles.text}>
                        {unPaidAmount.toFixed(2)} {systemSettings?.currency}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

          {isReceiptPdf &&
            (!isShowExtraAmount ? (
              <View style={styles.totalSection}>
                <Text style={styles.whiteText}>
                  {langContent[language as keyof typeof langContent]
                    ?.grand_total || "Gesamtsumme"}
                  :
                </Text>
                <Text style={styles.whiteText}>
                  {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                </Text>
              </View>
            ) : (
              <View>
                {Number(invoiceAmount) > 0 && (
                  <View style={styles.receiptPaidAmountSection}>
                    <Text style={styles.text}>
                      {langContent[language as keyof typeof langContent]
                        ?.paid_amount || "Bezahlt Betrag"}
                      :
                    </Text>
                    <Text style={styles.paidText}>
                      {langContent[language as keyof typeof langContent]
                        ?.amount_paid_last ||
                        "Der Betrag, den Sie beim letzten Mal bezahlt haben."}
                    </Text>
                    <Text style={styles.text}>
                      -{Number(dueAmount).toFixed(2)}
                      {systemSettings?.currency}
                    </Text>
                  </View>
                )}
                <View>
                  <View style={styles.totalSection}>
                    <Text style={styles.whiteText}>
                      {langContent[language as keyof typeof langContent]
                        ?.grand_total || "Gesamtsumme"}
                      :
                    </Text>
                    <Text style={styles.whiteText}>
                      {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                    </Text>
                  </View>
                  {Number(invoiceAmount) > 0 && (
                    <View style={styles.paidAmountSection}>
                      <Text style={styles.text}>
                        {langContent[language as keyof typeof langContent]
                          ?.total_paid_amount || "Bezahlte Gesamtbetrag"}
                        :
                      </Text>
                      <Text style={styles.text}>
                        -{Number(invoiceAmount).toFixed(2)}
                        {systemSettings?.currency}
                      </Text>
                    </View>
                  )}
                  {Number(unPaidAmount) > 0 && (
                    <View style={styles.subSection}>
                      <Text style={styles.text}>
                        {langContent[language as keyof typeof langContent]
                          ?.unpaid_amount || "Unbezahlter Betrag"}
                        :
                      </Text>
                      <Text style={styles.text}>
                        {unPaidAmount.toFixed(2)} {systemSettings?.currency}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
        </View>

        <View style={styles.bottomRow}>
          {!isShowExtraAmount && (
            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  fontStyle: "medium",
                  color: "#000",
                }}
              >
                {langContent[language as keyof typeof langContent]
                  ?.general_terms || "Allgemeine Geschäftsbedingungen"}
              </Text>
              <Text style={styles.discountDescription}>
                {langContent[language as keyof typeof langContent]?.terms_des ||
                  "Unten finden Sie weitere Informationen zu den Richtlinien und Bedingungen. Bitte nehmen Sie sich die Zeit, um die folgenden Geschäftsbedingungen zu verstehen."}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
