import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { useMemo, useState } from "react";

const styles = StyleSheet.create({
  wrapper: {
    width: 595,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    fontFamily: "Poppins",
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
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "#000",
    width: "40%",
  },
  signature: {
    borderTopWidth: 1,
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
export const AggrementSignature = ({
  showContractSign,
  signature,
}: {
  signature?: any;
  showContractSign?: boolean;
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
  const date = moment(new Date()).format("DD/MMMM/YY")

  return (
    <View style={styles.wrapper}>
      {showContractSign && (
        <View style={{}}>
          {/* <Text style={styles.shareHeading}>
            Ich teile den Vertrag mit Ihnen.
          </Text> */}

          <View style={{ ...styles.dateContainer }}>
            {/* <View
              style={{ ...styles.innerDate, marginTop: signature ? 100 : 0 }}
            >
              <Text style={styles.dateText}>Datum</Text>
            </View> */}
            <View style={{ width: "40%" }}>
              {/* {signature && (
                <Image
                  src={imageSrc as string}
                  style={{ height: "100px", width: "100px" }}
                />
              )} */}

              <Text style={{ ...styles.dateText, paddingTop: 0, marginTop: signature ? 85 : -15 }}>{date}</Text>

              <View style={styles.signature}>
                <Text style={styles.dateText}>Datum</Text>
              </View>
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
      )}
    </View>
  );
};
