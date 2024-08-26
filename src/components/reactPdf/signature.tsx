import { FooterProps } from "@/types/pdf";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  footerContainer: {
    width: 595,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  footerSection: {
    borderRight: 1,
    borderColor: "#D9D9D9",
    paddingRight: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "normal",
    marginBottom: 2,
  },
  pageNumberContainer: {
    position: "absolute",
    bottom: 5,
    right: 0,
    flexDirection: "row",
    marginRight: 10,
  },
  pageNumberText: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#000",
  },
});

export const Signature = () => (
  <View style={styles.footerContainer}>
    <View style={styles.footerSection}>
      <Text style={styles.pageNumberText}>Row 1</Text>
      <Text style={styles.pageNumberText}>Row 2</Text>
      <Text style={styles.pageNumberText}>Row 3</Text>
      <Text style={styles.pageNumberText}>Row 4</Text>
      <Text style={styles.pageNumberText}>Row 5</Text>
    </View>
  </View>
);
