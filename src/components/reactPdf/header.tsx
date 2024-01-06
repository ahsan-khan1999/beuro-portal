import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { PdfHeader } from "./pdf-layout";
// import { PdfHeader } from "./react-pdf";

export const Header = ({
  companyLogo,
  offerNumber,
  offerDate,
  createdBy,
}: PdfHeader) => (
  <View>
    <View >
      <View >
        <Text >Offer No:</Text>
        <Text >{offerNumber}</Text>
      </View>
      <View >
        <Text >Offer Date:</Text>
        <Text >{offerDate}</Text>
      </View>
      <View >
        <Text >Created By:</Text>
        <Text >{createdBy}</Text>
      </View>
    </View>
  </View>
);
