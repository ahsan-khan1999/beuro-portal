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

  totalDiscountText: {
    color: "#000",
    fontSize: 6,
    fontWeight: 500,
    fontStyle: "medium",
    width: 50,
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
            <Text style={styles.totalDiscountText}>
              {isGlobalDiscount
                ? Number(totalDiscount || 0) +
                  Number(updatedDiscountAmount || 0)
                : updatedDiscountAmount}{" "}
              ({discountPercentage?.toFixed(1)}%)
            </Text>
          ) : (
            <Text style={styles.totalDiscountText}>
              {isGlobalDiscount
                ? Number(discount || 0) + Number(totalDiscount || 0)
                : totalDiscount}{" "}
              ({discountPercentage?.toFixed(1)}%)
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
