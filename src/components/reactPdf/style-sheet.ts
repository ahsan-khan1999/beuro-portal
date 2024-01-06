import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EEE",
    padding: "12pt",
    display: "flex",
    flexDirection: "row",
  },
  logoSection: {
    width: "58.33%", // equivalent to 7 out of 12 columns
    paddingLeft: "8.33%", // equivalent to starting at column 2
  },
  infoSection: {
    width: "33.33%", // equivalent to 4 out of 12 columns
    flexDirection: "column",
    gap: "1pt",
  },
  infoRow: {
    flexDirection: "row",
    gap: "1pt",
  },
  label: {
    color: "#404040",
    fontSize: "base",
    minWidth: "100pt",
  },
  value: {
    color: "#000",
    fontSize: "base",
  },
});
