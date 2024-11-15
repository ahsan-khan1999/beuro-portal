import { Text, View } from "@react-pdf/renderer";
import { textBase } from "./style-sheet";
import { ContactDetailsProps } from "@/types";
import { Country } from "./address-details";
import { GenderLabel } from "@/utils/static";

export const ContactAddress = ({
  address,
  email,
  phone,
  gender,
  mobile,
  isReverseInfo,
  language,
}: Partial<ContactDetailsProps>) => {
  const langContent = {
    en: {
      gender: {
        Mr: "Mr",
        Mrs: "Mrs",
      },
    },
    de: {
      gender: {
        Mr: "Herr",
        Mrs: "Frau",
      },
    },
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: isReverseInfo ? "row-reverse" : "row",
        marginTop: 5,
        padding: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: isReverseInfo ? "flex-end" : "flex-start",
          rowGap: 0,
          width: isReverseInfo ? "35%" : "65%",
          marginLeft: isReverseInfo ? "30" : 0,
        }}
      >
        {address?.companyName && (
          <Text style={textBase}>{address?.companyName}</Text>
        )}

        <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {gender && (
            <Text style={textBase}>
              {
                langContent[language as keyof typeof langContent]?.gender[
                  gender as keyof typeof GenderLabel
                ]
              }
            </Text>
          )}
          {address?.name && <Text style={textBase}>{address?.name}</Text>}
        </View>
        {address?.streetWithNumber && (
          <Text style={textBase}>{address?.streetWithNumber}</Text>
        )}
        <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {address?.postalCode && (
            <Text style={textBase}>{address?.postalCode}</Text>
          )}
          {address?.city && <Text style={textBase}>{address?.city || ""}</Text>}
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          rowGap: 0,
          width: isReverseInfo ? "65%" : "35%",
        }}
      >
        {email && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={textBase}>{email}</Text>
          </View>
        )}

        {phone !== "+" && phone && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={textBase}>{phone}</Text>
          </View>
        )}
        {mobile !== "+" && mobile && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={textBase}>{mobile}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
