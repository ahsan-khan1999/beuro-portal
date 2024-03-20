import { ServiceList } from "@/types/offers";
import { staticEnums } from "@/utils/static";
import { View, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    width: 555,
    backgroundColor: "#F6F7F8",
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 12,
    marginHorizontal: 20,
    paddingHorizontal: 12,
  },
  headerRow: {
    flexDirection: "row",
    maxWidth: 531,
    width: "100%",
    columnGap: 3,
  },
  descriptionTextTitle: {
    color: "#000",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 135,
    // marginRight: 5,
  },
  descriptionText: {
    color: "#000",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 180,
    // marginRight: 5,
  },
  priceHeader: {
    flexDirection: "row",
    width: 216,
  },
  headerText: {
    color: "#000",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 50,
  },

  normalTotalDiscountText: {
    color: "#000",
    fontSize: 7,
    fontWeight: 500,
    fontStyle: "medium",
    width: 50,
  },

  smallTotalDiscountText: {
    color: "#000",
    fontSize: 6,
    fontWeight: 400,
    fontStyle: "normal",
    width: 50,
  },

  extraSmallTotalDiscountText: {
    color: "#000",
    fontSize: 5,
    fontWeight: 400,
    fontStyle: "normal",
    width: 50,
  },

  discountPercentageText: {
    color: "#000",
    fontSize: 5,
    fontWeight: 400,
    fontStyle: "normal",
  },
});

export const ServiceTableDiscountRow = ({
  count,
  description,
  price,
  serviceTitle,
  serviceType,
  totalPrice,
  pagebreak,
  unit,
  discount,
  isDiscount,
  totalDiscount,
  isGlobalDiscount,
  discountPercentage,
  discountType,
  updatedDiscountAmount,
}: Partial<ServiceList>) => {
  const totalUpdatedAmount =
    Number(totalDiscount || 0) + Number(updatedDiscountAmount || 0);

  const discountUpdatedAmountTextStyle =
    totalUpdatedAmount >= 10000
      ? styles.extraSmallTotalDiscountText
      : totalUpdatedAmount >= 1000
      ? styles.smallTotalDiscountText
      : styles.normalTotalDiscountText;

  const totalAmount = Number(discount || 0) + Number(totalDiscount || 0);

  const discountAmountTextStyle =
    totalAmount >= 10000
      ? styles.extraSmallTotalDiscountText
      : totalAmount >= 1000
      ? styles.smallTotalDiscountText
      : styles.normalTotalDiscountText;

  return (
    <View style={styles.headerContainer} break={pagebreak}>
      <View style={styles.headerRow}>
        <Text style={styles.descriptionTextTitle}>{serviceTitle}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>{count}</Text>
          <Text style={styles.headerText}>{unit}</Text>
          <Text style={styles.headerText}>
            {isGlobalDiscount ? price : totalDiscount}
          </Text>

          {isDiscount && (
            <Text style={styles.headerText}>
              {isGlobalDiscount ? discount : totalDiscount || "-"}
            </Text>
          )}

          {staticEnums["DiscountType"][
            discountType as keyof (typeof staticEnums)["DiscountType"]
          ] === 0 ? (
            <Text style={discountUpdatedAmountTextStyle}>
              {isGlobalDiscount
                ? (
                    Number(totalDiscount || 0) +
                    Number(updatedDiscountAmount || 0)
                  ).toFixed(1)
                : updatedDiscountAmount}{" "}
              <Text style={styles.discountPercentageText}>
                ({discountPercentage?.toFixed(1)}%)
              </Text>
            </Text>
          ) : (
            <Text style={discountAmountTextStyle}>
              {isGlobalDiscount
                ? (Number(discount || 0) + Number(totalDiscount || 0)).toFixed(
                    1
                  )
                : totalDiscount}{" "}
              <Text style={styles.discountPercentageText}>
                ({discountPercentage?.toFixed(1)}%)
              </Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
