import { AdditionalDetailsProps } from "@/types/pdf";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 20,
  },
  heading: {
    marginBottom: 2,
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    fontWeight: "normal",
  },
  shareHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 50,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
  },
  innerDate: {
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: "#000",
    width: "40%",
  },
  signature: {
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: "#000",
    width: "40%",
  },

  dateText: {
    paddingTop: 12,
    fontSize: 16,
    fontWeight: 400,
  },
});

export const AdditionalDetails = ({
  heading,
  description,
}: AdditionalDetailsProps) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>

    <Text style={styles.shareHeading}>I share the contract with you.</Text>

    <View style={styles.dateContainer}>
      <View style={styles.innerDate}>
        <Text style={styles.dateText}>Date</Text>
      </View>
      <View style={styles.signature}>
        <Text style={styles.dateText}>Signature</Text>
      </View>
    </View>
  </View>
);
