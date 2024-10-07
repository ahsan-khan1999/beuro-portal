import { pdfDateFormat } from "@/utils/utility";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

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
  language,
}: {
  signature?: any;
  showContractSign?: boolean;
  language?: string;
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
  // console.log(signature,"signature",imageSrc);

  const date = pdfDateFormat(new Date().toString(), language || "de");

  const langContent = {
    en: {
      date: "Date",
      signature: "Signature",
    },
    de: {
      date: "Datum",
      signature: "Unterschrift",
    },
  };

  return (
    <View style={styles.wrapper}>
      {showContractSign && (
        <View style={{ ...styles.dateContainer }}>
          <View style={{ ...styles.innerDate, marginTop: signature ? 100 : 0 }}>
            {
              <Text style={{ position: "absolute", top: -30, fontSize: 14 }}>
                {date}
              </Text>
            }
            <Text style={styles.dateText}>
              {langContent[language as keyof typeof langContent]?.date ||
                "Datum"}
            </Text>
          </View>

          <View style={{ width: "40%" }}>
            {signature && (
              <Image
                src={signature as string}
                style={{ height: "100px", width: "100px" }}
              />
            )}
            <View style={styles.signature}>
              <Text style={styles.dateText}>
                {langContent[language as keyof typeof langContent]?.signature ||
                  "Unterschrift"}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
