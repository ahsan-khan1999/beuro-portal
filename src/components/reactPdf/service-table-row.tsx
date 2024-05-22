import { ServiceList } from "@/types/offers";
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
    // columnGap: 3,
  },
  descriptionTextTitle: {
    color: "#000",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 135,
    marginRight: 20,
  },
  descriptionText: {
    color: "#000",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 170,
    marginRight: 20,
  },
  priceHeader: {
    flexDirection: "row",
    width: 216,
    color: "#000",
  },
  headerText: {
    color: "#000",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 50,
  },
});

export const ServiceTableRow = ({
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
}: Partial<ServiceList>) => {
  return (
    <View style={styles.headerContainer} break={pagebreak} wrap={false}>
      <View style={styles.headerRow}>
        <Text style={styles.descriptionTextTitle}>{serviceTitle}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>{count}</Text>
          <Text style={styles.headerText}>{unit}</Text>
          <Text style={styles.headerText}>{price}</Text>

          {isDiscount && (
            <Text style={styles.headerText}>{discount || "-"}</Text>
          )}

          <Text style={styles.headerText}>{totalPrice?.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};
