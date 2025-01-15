import { View, StyleSheet } from "@react-pdf/renderer";
import { transformHtmlToPdf } from "./convert-tags-react-pdf-components";

const styles = StyleSheet.create({
  borderDiv: {
    // borderTop: 3,
    // borderTopColor: "#000",
    marginLeft: 20,
    marginRight: 20,
    // paddingTop: 15,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    rowGap: 60,
    "> *": {
      // Styles for direct children (Text elements) of the container
      // Add your specific styles for the Text elements here
      fontSize: 7,
      color: "blue",
    },
  },
  heading: {
    marginBottom: 2,
    // fontSize: 7,
  },
  description: {
    fontSize: 7,
    fontWeight: "normal",
  },
  shareHeading: {
    fontSize: 7,
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
    // width: "40%",
  },

  dateText: {
    paddingTop: 12,
    fontSize: 7,
    fontWeight: 400,
    color: "#000",
  },
});

export const AdditionalDetails = ({
  description,
  signature,
}: {
  description?: string;
  signature?: any;
}) => {
  const content = transformHtmlToPdf(description ?? "");

  return (
    <View style={styles.borderDiv}>
      <View>{content}</View>
    </View>
  );
};
