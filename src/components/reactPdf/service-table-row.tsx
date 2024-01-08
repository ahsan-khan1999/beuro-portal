import { ServiceDetailProps } from "@/types/pdf";
import { View, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#F6F7F8",
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    maxWidth: 575,
    width: "100%",
    columnGap: 60,
  },
  description: {
    color: "#000",
    fontSize: 12,
    fontWeight: "medium",
    paddingLeft: 12,
    display: "flex",
    flexDirection: "column",
    width: 230,
    rowGap: 4,
  },
  descriptionTextTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "normal",
    width: 230,
    textAlign: "justify",
  },
  descriptionText: {
    color: "#404040",
    fontSize: 14,
    fontWeight: "normal",
    width: 230,
    textAlign: "justify",
  },
  priceHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: 345,
  },
  headerText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "normal",
    width: 86.25,
  },
  headerTextTotal: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    width: 86.25,
  },
});

export const ServiceTableRow = ({
  description,
  price,
  unit,
  count,
  total,
}: ServiceDetailProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <View style={styles.description}>
          <Text style={styles.descriptionTextTitle}>{description}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>{price}</Text>
          <Text style={styles.headerText}>{unit}</Text>
          <Text style={styles.headerText}>{count}</Text>
          <Text style={styles.headerTextTotal}>{total}</Text>
        </View>
      </View>
    </View>
  );
};
