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
    fontSize: 10,
    fontWeight: 500,
    fontStyle: "medium",
    paddingLeft: 12,
    width: 230,
  },
  priceHeader: {
    flexDirection: "row",
    width: 345,
  },
  headerText: {
    color: "white",
    fontSize: 10,
    fontWeight: 500,
    fontStyle: "medium",
    width: 86.25,
  },
});

export const ServiceTableHederRow = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{"Dienstleistung / Produkt"}</Text>
        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>{"Preis"}</Text>
          <Text style={styles.headerText}>{"Einheit"}</Text>
          <Text style={styles.headerText}>{"Anzahl"}</Text>
          <Text style={styles.headerText}>{"Gesamt"}</Text>
        </View>
      </View>
    </View>
  );
};
