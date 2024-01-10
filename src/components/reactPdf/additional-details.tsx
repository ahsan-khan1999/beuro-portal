import { AdditionalDetailsProps } from "@/types/pdf";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { useState, useMemo } from "react";

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
    rowGap: 60,
    "> *": {
      // Styles for direct children (Text elements) of the container
      // Add your specific styles for the Text elements here
      fontSize: 10,
      color: "blue",
    },
  },
  heading: {
    marginBottom: 2,
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    fontWeight: "normal",
  },
  shareHeading: {
    fontSize: 14,
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
    fontSize: 12,
    color: "#000",
  },
});

const stylesheet: HtmlStyles = {
  p: {
    margin: 0,
    fontSize: 12,
  },
  h1: {
    margin: 0,
    padding: 0,
    fontSize: 18,
    fontWeight: 700,
    fontStyle: "bold",
  },
  h2: {
    margin: 0,
    padding: 0,
    fontSize: 16,
    fontWeight: 600,
    fontStyle: "semibold",
  },
  h3: {
    margin: 0,
    padding: 0,
    fontSize: 14,
    fontWeight: 600,
    fontStyle: "semibold",
  },
  h4: {
    margin: 0,
    padding: 0,
    fontSize: 12,
    fontWeight: 600,
    fontStyle: "semibold",
  },
  h5: {
    margin: 0,
    padding: 0,
    fontSize: 10,
    fontWeight: 600,
    fontStyle: "semibold",
  },
  h6: {
    margin: 0,
    padding: 0,
    fontSize: 8,
    fontWeight: 600,
    fontStyle: "semibold",
  },
};

export const AdditionalDetails = ({
  description,
  signature,
}: {
  description?: string;
  signature?: any;
}) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
console.log(description)
  const onFileChange = () => {
    if (signature) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader?.result);
      };
      reader.readAsDataURL(signature);
    }
  };
  useMemo(() => signature && onFileChange(), [signature]);
  return (
    <View style={styles.borderDiv}>
      <View style={styles.container}>
        <Html>{description || ""}</Html>

        <View style={{}}>
          <Text style={styles.shareHeading}>
            I share the contract with you.
          </Text>

          <View style={styles.dateContainer}>
            <View style={styles.innerDate}>
              <Text style={styles.dateText}>Date</Text>
            </View>

            <View style={{ width: "40%" }}>
              {signature && (
                <Image
                  src={imageSrc as string}
                  style={{ height: "100px", width: "100px" }}
                />
              )}
              <View style={styles.signature}>
                <Text style={styles.dateText}>Signature</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
