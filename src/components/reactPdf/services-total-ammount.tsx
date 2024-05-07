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
    // backgroundColor: "#404F6A",
    // borderRadius: 4,
    // padding: 8,
    // marginTop: 10,
    // columnGap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px",
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 5,
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
    fontWeight: "bold",
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

  return (
    <View style={styles.container} break={true}>
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <View style={styles.subSection}>
            <Text style={styles.text}>Zwischensumme: </Text>
            <Text style={styles.text}>
              {Number(subTotal).toFixed(2)} {systemSettings?.currency}
            </Text>
          </View>
          {isDiscount && (
            <View style={styles.subSection}>
              <Text style={styles.text}>Rabatt: </Text>
              <Text style={styles.discountDescriptionText}>
                {discountDescription}
              </Text>
              <Text style={styles.text}>
                {Number(discountValue).toFixed(2)}
                {systemSettings?.currency}{" "}
                {discountType && discountType === "Percent" && `(${discount}%)`}
              </Text>
            </View>
          )}
          {isDiscount && (
            <View style={styles.subSection}>
              <Text style={styles.text}>Gesamtsumme nach Rabatt : </Text>
              <Text style={styles.text}>
                {Number(totalAfterDiscount).toFixed(2)}{" "}
                {systemSettings?.currency}
              </Text>
            </View>
          )}
          <View style={styles.subSection}>
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
                <Text style={styles.grandTotalText}>Gesamtsumme:</Text>
                <Text style={styles.grandTotalText}>
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
                <Text style={styles.grandTotalText}>Gesamtsumme:</Text>
                <Text style={styles.grandTotalText}>
                  {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                </Text>
              </View>
              {Number(invoiceAmount) > 0 && (
                <View>
                  <View style={styles.subSection}>
                    <Text style={styles.text}>{"Bezahlt Betrag"}:</Text>
                    <Text style={styles.text}>
                      -{Number(invoiceAmount).toFixed(2)}
                      {systemSettings?.currency}
                    </Text>
                  </View>
                  {Number(unPaidAmount) > 0 && (
                    <View style={styles.subSection}>
                      <Text style={styles.text}>{"Unbezahlter Betrag"}:</Text>
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
                <Text style={styles.whiteText}>Gesamtsumme:</Text>
                <Text style={styles.whiteText}>
                  {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                </Text>
              </View>
            ) : (
              <View>
                <View style={styles.subSection}>
                  <Text style={styles.text}>{"Fälliger Betrag"}:</Text>
                  <Text style={styles.text}>
                    {Number(dueAmount).toFixed(2)} {systemSettings?.currency}
                  </Text>
                </View>
                <View>
                  <View style={styles.totalSection}>
                    <Text style={styles.grandTotalText}>Gesamtsumme:</Text>
                    <Text style={styles.grandTotalText}>
                      {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                    </Text>
                  </View>
                  {Number(invoiceAmount) > 0 && (
                    <View>
                      <View style={styles.subSection}>
                        <Text style={styles.text}>{"Bezahlt Betrag"}:</Text>
                        <Text style={styles.text}>
                          -{Number(invoiceAmount).toFixed(2)}
                          {systemSettings?.currency}
                        </Text>
                      </View>
                      {/* {Number(unPaidAmount) > 0 && ( */}
                      <View style={styles.subSection}>
                        <Text style={styles.text}>{"Unbezahlter Betrag"}:</Text>
                        <Text style={styles.text}>
                          {unPaidAmount.toFixed(2)} {systemSettings?.currency}
                        </Text>
                      </View>
                      {/* )} */}
                    </View>
                  )}
                </View>
              </View>
            ))}

          {isReceiptPdf &&
            (!isShowExtraAmount ? (
              <View style={styles.totalSection}>
                <Text style={styles.whiteText}>Gesamtsumme:</Text>
                <Text style={styles.whiteText}>
                  {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                </Text>
              </View>
            ) : (
              <View>
                {Number(invoiceAmount) > 0 && (
                  <View style={styles.subSection}>
                    <Text style={styles.text}>{"Bezahlt Betrag"}:</Text>
                    <Text style={styles.paidText}>
                      {"Der Betrag, den Sie beim letzten Mal bezahlt haben."}
                    </Text>
                    <Text style={styles.text}>
                      -{Number(invoiceAmount).toFixed(2)}
                      {systemSettings?.currency}
                    </Text>
                  </View>
                )}
                <View>
                  <View style={styles.totalSection}>
                    <Text style={styles.grandTotalText}>Gesamtsumme:</Text>
                    <Text style={styles.grandTotalText}>
                      {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                    </Text>
                  </View>
                  {Number(invoiceAmount) > 0 && (
                    <View style={styles.subSection}>
                      <Text style={styles.text}>
                        {"Gezahlter Gesamtbetrag"}:
                      </Text>
                      <Text style={styles.text}>
                        {Number(invoiceAmount).toFixed(2)}
                        {systemSettings?.currency}
                      </Text>
                    </View>
                  )}
                  {Number(unPaidAmount) > 0 && (
                    <View style={styles.subSection}>
                      <Text style={styles.text}>{"Unbezahlter Betrag"}:</Text>
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
                Allgemeine Geschäftsbedingungen
              </Text>
              <Text style={styles.discountDescription}>
                Unten finden Sie weitere Informationen zu den Richtlinien und
                Bedingungen. Bitte nehmen Sie sich die Zeit, um die folgenden
                Geschäftsbedingungen zu verstehen.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
