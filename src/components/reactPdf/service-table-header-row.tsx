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
  language,
}: {
  isDiscount?: boolean;
  language?: string;
}) => {
  const langContent = {
    en: {
      service: "Service / Product",
      description: "Description",
      count: "Count",
      unit: "Unit",
      price: "Price",
      discount: "Discount",
      total: "Total",
    },
    de: {
      service: "Dienstleistung / Produkt",
      description: "Beschreibung",
      count: "Anzahl",
      unit: "Einheit",
      price: "Preis",
      discount: "Rabatt",
      total: "Gesamt",
    },
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>
          {langContent[language as keyof typeof langContent]?.service ||
            "Dienstleistung / Produkt"}
        </Text>
        <Text style={styles.headerDescription}>
          {langContent[language as keyof typeof langContent]?.description ||
            "Beschreibung"}
        </Text>

        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>
            {langContent[language as keyof typeof langContent]?.count ||
              "Anzahl"}
          </Text>
          <Text style={styles.headerText}>
            {langContent[language as keyof typeof langContent]?.unit ||
              "Einheit"}
          </Text>
          <Text style={styles.headerText}>
            {langContent[language as keyof typeof langContent]?.price ||
              "Preis"}
          </Text>

          {isDiscount && (
            <Text style={styles.headerText}>
              {langContent[language as keyof typeof langContent]?.discount ||
                "discount"}
            </Text>
          )}
          <Text style={styles.headerText}>
            {langContent[language as keyof typeof langContent]?.total ||
              "Gesamt"}
          </Text>
        </View>
      </View>
    </View>
  );
};
