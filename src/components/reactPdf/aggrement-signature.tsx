import { pdfDateFormat } from "@/utils/utility";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
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
  const date = pdfDateFormat(new Date().toString(), "de");

  return (
    <View style={styles.wrapper}>
      {showContractSign && (
        <View style={{}}>
          {/* <Text style={styles.shareHeading}>
            Ich teile den Vertrag mit Ihnen.
          </Text> */}

          <View style={{ ...styles.dateContainer }}>
            <View
              style={{ ...styles.innerDate, marginTop: signature ? 100 : 0 }}
            >
              {
                <Text style={{ position: "absolute", top: -30, fontSize: 14 }}>
                  {date}
                </Text>
              }
              <Text style={styles.dateText}>{translate("pdf.date")}</Text>
            </View>

            <View style={{ width: "40%" }}>
              {signature && (
                <Image
                  src={imageSrc as string}
                  style={{ height: "100px", width: "100px" }}
                />
              )}
              <View style={styles.signature}>
                <Text style={styles.dateText}>
                  {translate("pdf.signature")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
