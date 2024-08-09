import { StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#EDE7FD",
  },
});

export const ReportPDFFooter = () => {
  return <View style={styles.container} fixed />;
};
