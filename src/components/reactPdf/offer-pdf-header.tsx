import { DocumentHeaderDetailsProps } from "@/types";
import { pdfDateFormat } from "@/utils/utility";
import { View, Text, Image } from "@react-pdf/renderer";

export const OfferPdfHeader = ({
  createdBy,
  emailTemplateSettings,
  offerDate,
  offerNo,
  fileType,
  isReverseLogo,
}: Partial<DocumentHeaderDetailsProps>) => {
  const { logo } = emailTemplateSettings ?? {};

  return (
    <View
      style={{
        display: "flex",
        flexDirection: isReverseLogo ? "row-reverse" : "row",
        alignItems: "center",
        // backgroundColor: `#${FooterColour}`,
        padding: 20,
        fontFamily: "Poppins",
      }}
      fixed
    >
      <View style={{ width: "65%" }}>
        <Image
          src={logo}
          style={{
            width: 182,
            height: 73,
            display: "flex",
            justifyContent: isReverseLogo ? "flex-end" : "flex-start",
            marginLeft: isReverseLogo ? "auto" : 0,
          }}
        />
      </View>
      <View style={{ width: "35%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: 4,
          }}
        >
          <Text
            style={{
              fontSize: 8,
              fontWeight: 400,
              fontStyle: "normal",
              marginRight: 1,
              // color: `#${textColour}`,
            }}
          >
            {/* {fileType &&
              translate(HeaderLabelNr[fileType as keyof typeof HeaderLabel])} */}
            {translate("pdf.label_nr_offer")}
            {translate("pdf.no")}:{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
              // color: `#${textColour}`,
            }}
          >
            {offerNo}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 8,
              fontWeight: 400,
              fontStyle: "normal",
              marginRight: 1,
              // color: `#${textColour}`,
            }}
          >
            {/* {(fileType &&
              translate(HeaderLabel[fileType as keyof typeof HeaderLabel])) || */}
            {translate("pdf.label_create")}
            {/* } */} {translate("pdf.date")}:{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
              // color: `#${textColour}`,
            }}
          >
            {pdfDateFormat(offerDate || "", "de")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", rowGap: 0 }}>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 400,
              fontStyle: "normal",
              marginRight: 1,
              // color: `#${textColour}`,
            }}
          >
            {translate("pdf.created_by")}:{" "}
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 500,
              fontStyle: "medium",
              // color: `#${textColour}`,
            }}
          >
            {createdBy}
          </Text>
        </View>
      </View>
    </View>
  );
};
