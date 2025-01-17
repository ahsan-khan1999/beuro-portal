import { ProductItemFooterProps } from "@/types";
import { calculateTax, germanDateFormat } from "@/utils/utility";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 30,
  },
  contentContainer: {
    flexDirection: "column",
    rowGap: 20,
  },
  bottomRow: {
    flexDirection: "row",
    width: "100%",
  },
  topRow: {
    width: "100%",
  },
  totalSection: {
    borderRadius: 4,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
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
  paidValue: {
    fontSize: 8,
    fontWeight: 600,
    fontStyle: "semibold",
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
  grandTotalSubSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px",
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    // marginBottom: 5,
    paddingTop: 5,
    borderTop: "1px",
    borderTopColor: "#ccc",
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

  amountSection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },

  paymentSection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },

  paymentValueSection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
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
  invoicePaidAmount,
  isShowExtraAmount,
  systemSettings,
  invoiceAmount,
  discountType,
  taxType,
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
  isBreakPage,
  payments,
}: Partial<ProductItemFooterProps>) => {
  // const isPaid =
  //   invoiceStatus && staticEnums["InvoiceStatus"][invoiceStatus] === 2;

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

  // const totalDiscount = !isDiscount
  //   ? serviceDiscountSum
  //   : (serviceDiscountSum &&
  //       (serviceDiscountSum + Number(calculatedDiscount)).toFixed(2)) ||
  //     Number(calculatedDiscount).toFixed(2);

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
      paid_date: "Paid Date",
      unpaid_amount: "Unpaid Amount",
      due_amount: "Due Amount",
      total_paid_amount: "Total Paid Amount",
      amount_paid_last: "The amount you paid last time.",
      general_terms: "General Terms and Conditions",
      payment_method: "Payment Method",
      payment_method_type: {
        Cash: "Cash",
        Online: "Online",
        Twint: "Twint",
      },
      terms_des:
        "Below you will find further information on the guidelines and conditions. Please take the time to understand the following terms and conditions.",
    },
    de: {
      sub_total: "Zwischensumme",
      discount: "Rabatt",
      total_after_discount: "Gesamtsumme nach Rabatt",
      grand_total: "Gesamtsumme",
      paid_amount: "Bezahlter Betrag",
      paid_date: "Bezahltes Datum",
      unpaid_amount: "Unbezahlter Betrag",
      due_amount: "Fälliger Betrag",
      total_paid_amount: "Bezahlter Gesamtbetrag",
      amount_paid_last: "Der Betrag, den Sie beim letzten Mal bezahlt haben.",
      general_terms: "Allgemeine Geschäftsbedingungen",
      payment_method: "Zahlungsmethode",
      payment_method_type: {
        Cash: "Bar",
        Online: "Online",
        Twint: "Twint",
      },
      terms_des:
        "Unten finden Sie weitere Informationen zu den Richtlinien und Bedingungen. Bitte nehmen Sie sich die Zeit, um die folgenden Geschäftsbedingungen zu verstehen.",
    },
  };

  return (
    <View style={styles.container} break={isBreakPage}>
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
              <View
                style={{
                  ...styles.totalSection,
                  // backgroundColor: isBreakPage ? "#4A13E7" : "#404F6A",
                  backgroundColor: "#404F6A",
                }}
              >
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
              </View>
            ))}

          {isMainInvoice && (
            <View>
              {Number(invoiceAmount) > 0 ? (
                <View style={styles.grandTotalSubSection}>
                  <Text style={styles.text}>
                    {langContent[language as keyof typeof langContent]
                      ?.grand_total || "Gesamtsumme"}
                    :
                  </Text>
                  <Text style={styles.text}>
                    {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    ...styles.totalSection,
                    // backgroundColor: isBreakPage ? "#4A13E7" : "#404F6A",
                    backgroundColor: "#404F6A",
                  }}
                >
                  <Text style={styles.whiteText}>
                    {langContent[language as keyof typeof langContent]
                      ?.grand_total || "Gesamtsumme"}
                    :
                  </Text>
                  <Text style={styles.whiteText}>
                    {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                  </Text>
                </View>
              )}
              {payments &&
                payments?.map((item, index) => {
                  const isLastItem = index === payments?.length - 1;

                  return (
                    <View
                      style={{
                        ...styles.subInvoicepaidAmountSection,
                        borderBottomWidth: isLastItem ? 0 : 1,
                      }}
                      key={index}
                    >
                      <View style={styles.amountSection}>
                        <Text style={styles.text}>
                          {langContent[language as keyof typeof langContent]
                            ?.paid_amount || "Bezahlter Betrag"}
                          {payments?.length > 1 ? ` ${index + 1}:` : ":"}
                        </Text>
                        <View style={styles.paymentSection}>
                          <View style={styles.paymentValueSection}>
                            <Text style={styles.paidText}>
                              {langContent[language as keyof typeof langContent]
                                ?.payment_method || "Zahlungsmethode"}
                              :
                            </Text>
                            <Text style={styles.paidValue}>
                              {item?.paymentType}
                            </Text>
                          </View>
                          {item?.paidDate && (
                            <View style={styles.paymentValueSection}>
                              <Text style={styles.paidText}>
                                {langContent[
                                  language as keyof typeof langContent
                                ]?.paid_date || "Bezahltes Datum"}
                                :
                              </Text>
                              <Text style={styles.paidValue}>
                                {/* {pdfDateFormat(item.paidDate, language || "de")} */}
                                {item.paidDate
                                  ? germanDateFormat(item.paidDate)
                                  : ""}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <Text style={styles.text}>
                        -{item?.paidAmount?.toFixed(2)}
                        {systemSettings?.currency}
                      </Text>
                    </View>
                  );
                })}

              {Number(invoiceAmount) > 0 && (
                <View>
                  <View
                    style={{
                      ...styles.totalSection,
                      // backgroundColor: isBreakPage ? "#4A13E7" : "#404F6A",
                      backgroundColor: "#404F6A",
                    }}
                  >
                    <Text style={styles.whiteText}>
                      {langContent[language as keyof typeof langContent]
                        ?.total_paid_amount || "Bezahlter Betrag"}
                      :
                    </Text>
                    <Text style={styles.whiteText}>
                      -{Number(invoiceAmount).toFixed(2)}{" "}
                      {systemSettings?.currency}
                    </Text>
                  </View>
                  {Number(unPaidAmount) > 0 && (
                    <View style={{ ...styles.subSection, paddingTop: 5 }}>
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
              <View
                style={{
                  ...styles.totalSection,
                  // backgroundColor: isBreakPage ? "#4A13E7" : "#404F6A",
                  backgroundColor: "#404F6A",
                }}
              >
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
                  {Number(invoiceAmount) > 0 ? (
                    <View style={styles.grandTotalSubSection}>
                      <Text style={styles.text}>
                        {langContent[language as keyof typeof langContent]
                          ?.grand_total || "Gesamtsumme"}
                        :
                      </Text>
                      <Text style={styles.text}>
                        {Number(grandTotal).toFixed(2)}{" "}
                        {systemSettings?.currency}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        ...styles.totalSection,
                        // backgroundColor: isBreakPage ? "#4A13E7" : "#404F6A",
                        backgroundColor: "#404F6A",
                      }}
                    >
                      <Text style={styles.whiteText}>
                        {langContent[language as keyof typeof langContent]
                          ?.grand_total || "Gesamtsumme"}
                        :
                      </Text>
                      <Text style={styles.whiteText}>
                        {Number(grandTotal).toFixed(2)}{" "}
                        {systemSettings?.currency}
                      </Text>
                    </View>
                  )}

                  {payments &&
                    payments?.map((item, index) => {
                      const isLastItem = index === payments?.length - 1;
                      return (
                        <View
                          style={{
                            ...styles.subInvoicepaidAmountSection,
                            borderBottomWidth: isLastItem ? 0 : 1,
                          }}
                          key={index}
                        >
                          <View style={styles.amountSection}>
                            <Text style={styles.text}>
                              {langContent[language as keyof typeof langContent]
                                ?.paid_amount || "Bezahlter Betrag"}
                              {payments?.length > 1 ? ` ${index + 1}:` : ":"}
                            </Text>
                            <View style={styles.paymentSection}>
                              <View style={styles.paymentValueSection}>
                                <Text style={styles.paidText}>
                                  {langContent[
                                    language as keyof typeof langContent
                                  ]?.payment_method || "Zahlungsmethode"}
                                  :
                                </Text>
                                <Text style={styles.paidValue}>
                                  {item?.paymentType}
                                </Text>
                              </View>
                              {item?.paidDate && (
                                <View style={styles.paymentValueSection}>
                                  <Text style={styles.paidText}>
                                    {langContent[
                                      language as keyof typeof langContent
                                    ]?.paid_date || "Bezahltes Datum"}
                                    :
                                  </Text>
                                  <Text style={styles.paidValue}>
                                    {item.paidDate
                                      ? germanDateFormat(item.paidDate)
                                      : ""}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                          <Text style={styles.text}>
                            -{item?.paidAmount?.toFixed(2)}
                            {systemSettings?.currency}
                          </Text>
                        </View>
                      );
                    })}

                  {Number(invoiceAmount) > 0 && (
                    <View
                      style={{
                        ...styles.totalSection,
                        // backgroundColor: isBreakPage ? "#4A13E7" : "#404F6A",
                        backgroundColor: "#404F6A",
                      }}
                    >
                      <Text style={styles.whiteText}>
                        {langContent[language as keyof typeof langContent]
                          ?.total_paid_amount || "Bezahlter Gesamtbetrag"}
                        :
                      </Text>
                      <Text style={styles.whiteText}>
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
              <View
                style={{
                  ...styles.totalSection,
                  // backgroundColor: isBreakPage ? "#4A13E7" : "#404F6A",
                  backgroundColor: "#404F6A",
                }}
              >
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
                {payments &&
                  payments?.map((item, index) => {
                    return (
                      <View style={styles.receiptPaidAmountSection} key={index}>
                        <View style={styles.amountSection}>
                          <Text style={styles.text}>
                            {langContent[language as keyof typeof langContent]
                              ?.paid_amount || "Bezahlter Betrag"}
                            {payments?.length > 1 ? ` ${index + 1}:` : ":"}
                          </Text>
                          <View style={styles.paymentSection}>
                            <View style={styles.paymentValueSection}>
                              <Text style={styles.paidText}>
                                {langContent[
                                  language as keyof typeof langContent
                                ]?.payment_method || "Zahlungsmethode"}
                                :
                              </Text>
                              <Text style={styles.paidValue}>
                                {item?.paymentType}
                              </Text>
                            </View>
                            {item?.paidDate && (
                              <View style={styles.paymentValueSection}>
                                <Text style={styles.paidText}>
                                  {langContent[
                                    language as keyof typeof langContent
                                  ]?.paid_date || "Bezahltes Datum"}
                                  :
                                </Text>
                                <Text style={styles.paidValue}>
                                  {item.paidDate
                                    ? germanDateFormat(item.paidDate)
                                    : ""}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                        <Text style={styles.text}>
                          -{item?.paidAmount?.toFixed(2)}
                          {systemSettings?.currency}
                        </Text>
                      </View>
                    );
                  })}

                <View>
                  <View
                    style={{
                      ...styles.totalSection,
                      // backgroundColor: isBreakPage ? "#4A13E7" : "#404F6A",
                      backgroundColor: "#404F6A",
                    }}
                  >
                    <Text style={styles.whiteText}>
                      {langContent[language as keyof typeof langContent]
                        ?.grand_total || "Gesamtsumme"}
                      :
                    </Text>
                    <Text style={styles.whiteText}>
                      {Number(grandTotal).toFixed(2)} {systemSettings?.currency}
                    </Text>
                  </View>
                  {/* {Number(invoiceAmount) > 0 && (
                    <View style={styles.paidAmountSection}>
                      <Text style={styles.text}>
                        {langContent[language as keyof typeof langContent]
                          ?.total_paid_amount || "Bezahlter Gesamtbetrag"}
                        :
                      </Text>
                      <Text style={styles.text}>
                        -{Number(invoiceAmount).toFixed(2)}
                        {systemSettings?.currency}
                      </Text>
                    </View>
                  )} */}
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
