import { AdditionalDetailsProps } from "@/types/pdf";
import { Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { useRouter } from "next/router";
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
    fontFamily: "Poppins",
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
    fontSize: 12,
    fontWeight: 400,
    color: "#000",
  },
});

const stylesheet: HtmlStyles = {
  body: {
    fontFamily: 'Poppins',
  },
  p: {
    margin: 0,
    fontSize: 10,
    color: "#272727",
  },
  h1: {
    margin: 0,
    padding: 0,
    fontSize: 16,
  },
  h2: {
    margin: 0,
    padding: 0,
    fontSize: 14,
  },
  h3: {
    margin: 0,
    padding: 0,
    fontSize: 12,
  },
  h4: {
    margin: 0,
    padding: 0,
    fontSize: 12,
  },
  h5: {
    margin: 0,
    padding: 0,
    fontSize: 10,
  },
  h6: {
    margin: 0,
    padding: 0,
    fontSize: 10,
  },
  ul: { marginLeft: 16 },
  li: {
    fontSize: 10,
    marginLeft: 0,
    listStyle: "outside",
  },
  blockquote: {
    borderLeft: 5,
    borderColor: "#ccc",
    borderStyle: "solid",
    marginLeft: 0,
    marginRight: 0,
    overflow: "hidden",
    paddingLeft: "20px",

    "blockqoute p": {
      margin: 0,
    },
  },
  strong: {
    fontSize: 14,
    fontWeight: 700,
    fontStyle: "bold",
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
        <Html resetStyles={true} stylesheet={stylesheet} style={{ fontFamily: "Poppins" }}>
          {description || ""}
        </Html>
      </View>
    </View>
  );
};
