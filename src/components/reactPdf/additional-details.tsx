import { AdditionalDetailsProps } from "@/types/pdf";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

import Html, { HtmlStyles } from "react-pdf-html";

const styles = StyleSheet.create({
  borderDiv: {
    borderTop: 3,
    borderTopColor: "#000",
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 35,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    rowGap: 60
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
    fontSize: 18,
    fontWeight: "medium",
    color: "#000",
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
    color: "#000",
  },
});

const stylesheet: HtmlStyles = {
  // clear margins for all <p> tags
  p: {
    margin: 0,
  },
  h1: {
    margin: 0,
    padding: 0,
  },
  h2: {
    margin: 0,
    padding: 0,
  },
  h3: {
    margin: 0,
    padding: 0,
  },
  h4: {
    margin: 0,
    padding: 0,
  },
  h5: {
    margin: 0,
    padding: 0,
  },
  h6: {
    margin: 0,
    padding: 0,
  },
};

export const AdditionalDetails = ({description}: {description?: string}) => (
  <View style={styles.borderDiv}>
    <View style={styles.container}>
      <Html stylesheet={stylesheet}>{description || ""}</Html>

      <View style={{}}>
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
    </View>
  </View>
);
