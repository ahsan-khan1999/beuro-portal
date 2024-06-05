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
    marginTop: 0,
  },
  headerRow: {
    flexDirection: "row",
    maxWidth: 531,
    width: "100%",
  },
  headerTitle: {
    color: "white",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 135,
    marginRight: 20,
  },
  headerDescription: {
    color: "white",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 170,
    marginRight: 20,
  },
  priceHeader: {
    flexDirection: "row",
    width: 216,
  },
  headerText: {
    color: "white",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
    width: 50,
  },
});

export const ServiceTableHederRow = ({
  isDiscount,
}: {
  isDiscount?: boolean;
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{translate("pdf.service")}</Text>
        <Text style={styles.headerDescription}>
          {translate("pdf.description")}
        </Text>

        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>{translate("pdf.count")}</Text>
          <Text style={styles.headerText}>{translate("pdf.unit")}</Text>
          <Text style={styles.headerText}>{translate("pdf.price")}</Text>

          {isDiscount && (
            <Text style={styles.headerText}>{translate("pdf.discount")}</Text>
          )}
          <Text style={styles.headerText}>{translate("pdf.total")}</Text>
        </View>
      </View>
    </View>
  );
};
