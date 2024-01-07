import { ServiceDetailProps } from "@/types/pdf";
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
    columnGap: 60,
    maxWidth: 595,
    width: "100%",
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "medium",
    paddingLeft: 12,
    width: 230,
  },
  priceHeader: {
    flexDirection: "row",
    width: 345,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "medium",
    width: 86.25,
  },
});

export const ServiceTableHederRow = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{"Service / Product"}</Text>
        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>{"Price"}</Text>
          <Text style={styles.headerText}>{"Unit"}</Text>
          <Text style={styles.headerText}>{"Count"}</Text>
          <Text style={styles.headerText}>{"Total"}</Text>
        </View>
      </View>
    </View>
  );
};
