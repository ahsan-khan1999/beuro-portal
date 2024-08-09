import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  column: {
    width: "30%",
  },
  textbase: {
    fontSize: 8,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#1C1F35",
  },
});

export const HouseItemHeader = ({ language }: { language?: string }) => {
  const headerLabel = [0, 1, 2];

  const langContent = {
    en: {
      item: "Item",
    },

    de: {
      item: "Artikel",
    },
  };

  return (
    <View style={styles.grid}>
      {headerLabel.map((index) => (
        <View key={index} style={styles.column}>
          <View style={styles.container} key={index}>
            <Text style={styles.textbase}>
              {langContent[language as keyof typeof langContent]?.item}
            </Text>
            <Text style={styles.textbase}>Qty</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
