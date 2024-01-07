import { View, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#40506A",
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    maxWidth: 595,
    width: "100%",
  },
  headerTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "medium",
    paddingLeft: 12,
    maxWidth: 250,
    width: "100%",
  },
  priceHeader: {
    flexDirection: "row",
    maxWidth: 345,
    width: "100%",
  },
  priceHeaderText: {
    color: "white",
    fontSize: 12,
    fontWeight: "medium",
    width: 86.25,
  },
});

export const TableHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>Service / Product</Text>
      <View style={styles.priceHeader}>
        <Text style={styles.priceHeaderText}>Price</Text>
        <Text style={styles.priceHeaderText}>Unit</Text>
        <Text style={styles.priceHeaderText}>Count</Text>
        <Text style={styles.priceHeaderText}>Total</Text>
      </View>
    </View>
  </View>
);
