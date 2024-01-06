import { ServiceDetailProps } from "@/types/pdf";
import { View, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#F6F7F8",
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    maxWidth: 595,
    width: "100%",
    columnGap: 20,
  },
  description: {
    color: "#000",
    fontSize: 12,
    fontWeight: "medium",
    paddingLeft: 12,
    display: "flex",
    flexDirection: "column",
    maxWidth: 250,
    width: "100%",
  },
  descriptionTextTitle: {
    color: "#000",
    fontSize: 12,
    fontWeight: "medium",
    width: 250,
  },
  descriptionText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "medium",
    width: 250,
  },
  priceHeader: {
    flexDirection: "row",
    maxWidth: 345,
    width: "100%",
  },
  headerText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "medium",
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
          <Text style={styles.headerText}>{total}</Text>
        </View>
      </View>
    </View>
  );
};
