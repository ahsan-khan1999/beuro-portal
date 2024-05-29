import { View, StyleSheet } from "@react-pdf/renderer";
import Html, { HtmlStyles } from "react-pdf-html";
import { transformHtmlToPdf } from "./convert-tags-react-pdf-components";

type FontSizeMap = { [key: string]: string };

const styles = StyleSheet.create({
  borderDiv: {
    // borderTop: 3,
    // borderTopColor: "#000",
    marginLeft: 20,
    marginRight: 20,
    // paddingTop: 15,
  },
  container: {
    fontFamily: "Poppins",
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

const stylesheet: HtmlStyles = {
  body: {
    fontFamily: "Poppins",
  },
  p: {
    margin: 0,
    // fontSize: 7,
    color: "#272727",
  },

  h1: {
    margin: 0,
    padding: 0,
    // fontSize: 7,
  },
  h2: {
    margin: 0,
    padding: 0,
    // fontSize: 7,
  },
  h3: {
    margin: 0,
    padding: 0,
    // fontSize: 7,
  },
  h4: {
    margin: 0,
    padding: 0,
    // fontSize: 7,
  },
  h5: {
    margin: 0,
    padding: 0,
    // fontSize: 7,
  },
  h6: {
    margin: 0,
    padding: 0,
    // fontSize: 7,
  },
  ul: { marginLeft: 0, marginTop: 6 },
  li: {
    // fontSize: 7,
    marginLeft: 0,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
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
      margin: 10,
    },
  },
  strong: {
    // fontSize: 7,
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
  // const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  // const onFileChange = () => {
  //   if (signature) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageSrc(reader?.result);
  //     };
  //     reader.readAsDataURL(signature);
  //   }
  // };

  // useMemo(() => signature && onFileChange(), [signature]);

<<<<<<< HEAD
  function replaceFontSizes(description: string | undefined | null): string {
    if (!description) return "";

    const replacements: FontSizeMap = {
      "8px": "5.5px",
      "9px": "6px",
      "10px": "6.5px",
      "11px": "7px",
      "12px": "7.5px",
      "13px": "8px",
      "14px": "8.5px",
    };

    const fontSizeRegex = /(\d+px)/g;

    const replacedDescription = description.replaceAll(
      fontSizeRegex,
      (match) => {
        return replacements[match] || match;
      }
    );

    return replacedDescription;
  }
=======
  // console.log(transformHtmlToPdf(description ?? ''));
  const content = transformHtmlToPdf(description ?? "");
  //  const content = convertHtmlToPdf(description ?? '');

  // const content = parseHTML(description ?? '');
>>>>>>> 48d4a8a098b45b87ddfc9bedff9928a9da3bf9bb

  return (
    <View style={styles.borderDiv}>
      <View>
        {/* <Html
          resetStyles={false}
          stylesheet={stylesheet}
          style={{ fontFamily: "Poppins" }}
        >
          {replaceFontSizes(description ?? "")}
<<<<<<< HEAD
          {/* {description ?? ""} */}
        </Html>
=======
        </Html> */}
        {content}
>>>>>>> 48d4a8a098b45b87ddfc9bedff9928a9da3bf9bb
      </View>
    </View>
  );
};
