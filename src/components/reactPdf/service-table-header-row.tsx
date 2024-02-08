import { ServiceDetailProps } from "@/types/pdf";
import { View, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    width: 555,
    backgroundColor: "#40506A",
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
  },
  headerTitle: {
    color: "white",
    fontSize: 10,
    fontWeight: 500,
    fontStyle: "medium",
    width: 150,
  },
  headerDescription: {
    color: "white",
    fontSize: 10,
    fontWeight: 500,
    fontStyle: "medium",
    width: 150,
  },
  priceHeader: {
    flexDirection: "row",
    width: 231,
  },
  headerText: {
    color: "white",
    fontSize: 10,
    fontWeight: 500,
    fontStyle: "medium",
    width: 60,
  },
});

export const ServiceTableHederRow = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{"Dienstleistung / Produkt"}</Text>
        <Text style={styles.headerDescription}>{"Beschreibung"}</Text>

        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>{"Anzahl"}</Text>
          <Text style={styles.headerText}>{"Einheit"}</Text>
          <Text style={styles.headerText}>{"Preis"}</Text>
          <Text style={styles.headerText}>{"Rabatt"}</Text>
          <Text style={styles.headerText}>{"Gesamt"}</Text>
        </View>
      </View>
    </View>
  );
};
