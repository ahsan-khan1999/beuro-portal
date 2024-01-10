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
    fontWeight: "bold",
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    fontWeight: "normal",
  },
  shareHeading: {
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "medium",
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
    fontSize: 10,
    fontWeight: 400,
    fontStyle: "normal",
    color: "#000",
  },
});

const stylesheet: HtmlStyles = {
  // clear margins for all <p> tags
  p: {
    margin: 0,
    fontSize: 12,
  },
  h1: {
    margin: 0,
    padding: 0,
    fontSize: 16,
  },
  h2: {
    margin: 0,
    padding: 0,
    fontSize: 16,
  },
  h3: {
    margin: 0,
    padding: 0,
    fontSize: 16,
  },
  h4: {
    margin: 0,
    padding: 0,
    fontSize: 13,
  },
  h5: {
    margin: 0,
    padding: 0,
    fontSize: 12,
  },
  h6: {
    margin: 0,
    padding: 0,
    fontSize: 12,
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
        <Html stylesheet={stylesheet}>{description || ""}</Html>

        <View style={{}}>
          <Text style={styles.shareHeading}>
            Ich teile den Vertrag mit Ihnen.
          </Text>

          <View style={styles.dateContainer}>
            <View style={styles.innerDate}>
              <Text style={styles.dateText}>Datum</Text>
            </View>

            <View style={{ width: "40%" }}>
              {signature && (
                <Image
                  src={imageSrc as string}
                  style={{ height: "100px", width: "100px" }}
                />
              )}
              <View style={styles.signature}>
                <Text style={styles.dateText}>Unterschrift</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
