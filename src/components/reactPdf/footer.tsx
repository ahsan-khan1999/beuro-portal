import {
  DocumentDetailFooterProps,
  PdfPreviewFooterProps,
  TemplateType,
} from "@/types";
import { FooterProps } from "@/types/pdf";
import { insertBreaks } from "@/utils/functions";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { useMemo } from "react";

const styles = StyleSheet.create({
  footerContainer: {
    width: 595,
    height: 90,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#EEEEEE",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "left",
    paddingHorizontal: 20,
  },
  firstColumnFooterSection: {
    borderRight: 1,
    borderColor: "#D9D9D9",
    width: "25%",
    paddingHorizontal: 8,
    flexDirection: "column",
    justifyContent: "center",
  },
  footerSection: {
    borderRight: 1,
    borderColor: "#D9D9D9",
    width: "25%",
    paddingHorizontal: 8,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
  },
  footerText: {
    fontSize: 8,
    fontWeight: 400,
    fontStyle: "normal",
    color: "#000",
    marginBottom: 2,
  },
  pageNumberContainer: {
    position: "absolute",
    bottom: 5,
    right: 0,
    flexDirection: "row",
    marginRight: 10,
  },
  pageNumberText: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#fff",
  },
});

export const Footer = ({
  documentDetails,
  emailTemplateSettings,
  templateSettings,
}: PdfPreviewFooterProps) => {
  const { companyName, email, phoneNumber, taxNumber, website } =
    templateSettings?.firstColumn ?? {};
  const address = {
    streetNumber: templateSettings?.secondColumn?.streetNumber,
    postalCode: templateSettings?.secondColumn?.postCode,
  }
  const bankDetails = {
    bankName: templateSettings?.secondColumn?.bankName,
  }
  // const { address, bankDetails } = documentDetails?.secondColumn ?? {};
  const {
    row1: c3Row1,
    row2: c3Row2,
    row3: c3Row3,
    row4: c3Row4,
    row5: c3Row5,
  } = templateSettings?.thirdColumn ?? {};
  const {
    row1: c4Row1,
    row2: c4Row2,
    row3: c4Row3,
    row4: c4Row4,
    row5: c4Row5,
  } = templateSettings?.fourthColumn ?? {};
  const ibanNumber = insertBreaks(templateSettings?.secondColumn?.iban, 32);
  const accountNumber = insertBreaks(templateSettings?.secondColumn?.accountNumber, 16);

  const { FooterColour, textColour } = emailTemplateSettings ?? {};
  const {
    isFirstColumn,
    isFourthColumn,
    isSecondColumn,
    isThirdColumn,
    firstColumn,
    secondColumn,
    thirdColumn,
    fourthColumn,
  } = templateSettings ?? {};

  const { isCompanyName, isEmail, isPhoneNumber, isTaxNumber, isWebsite } =
    firstColumn ?? {};
  const { isAccountNumber, isBankName, isIBAN, isPostCode, isStreetNumber } =
    secondColumn ?? {};
  const {
    isRow1: isC3Row1,
    isRow2: isC3Row2,
    isRow3: isC3Row3,
    isRow4: isC3Row4,
    isRow5: isC3Row5,
  } = thirdColumn ?? {};
  const {
    isRow1: isC4Row1,
    isRow2: isC4Row2,
    isRow3: isC4Row3,
    isRow4: isC4Row4,
    isRow5: isC4Row5,
  } = fourthColumn ?? {};

  if (FooterColour) styles.footerContainer.backgroundColor = `#${FooterColour}`;
  if (textColour) styles.footerText.color = `#${textColour}`;

  const {
    showFirstColumnBorder,
    showSecondColumnBorder,
    showThirdColumnBorder,
  } = useMemo(() => {
    const showFirstColumnBorder =
      isFirstColumn && (isSecondColumn || isThirdColumn || isFourthColumn);
    const showSecondColumnBorder =
      isSecondColumn && (isThirdColumn || isFourthColumn);
    const showThirdColumnBorder = isThirdColumn && isFourthColumn;
    return {
      showFirstColumnBorder,
      showSecondColumnBorder,
      showThirdColumnBorder,
    };
  }, [isFirstColumn, isSecondColumn, isThirdColumn, isFourthColumn]);

  const getFooterSectionStyle = (showBorder?: boolean) => {
    return {
      ...styles.footerSection,
      borderRight: showBorder ? 1 : 0,
    };
  };
  const getFirstColumnFooterSection = (showBorder?: boolean) => {
    return {
      ...styles.firstColumnFooterSection,
      borderRight: showBorder ? 1 : 0,
    };
  };
  const shouldAlignRight =
    showFirstColumnBorder && !showSecondColumnBorder && !showThirdColumnBorder;

  return (
    <View style={styles.footerContainer} fixed>
      {isFirstColumn && (
        <View
          style={{
            ...getFirstColumnFooterSection(showFirstColumnBorder),
            width: "30%",
            textAlign: shouldAlignRight ? "right" : "left",
          }}
        >
          {isCompanyName && (
            <Text style={styles.footerText}>{companyName}</Text>
          )}
          {isWebsite && <Text style={styles.footerText}>{website}</Text>}
          {isEmail && <Text style={styles.footerText}>{email}</Text>}
          {isPhoneNumber && (
            <Text style={styles.footerText}>{phoneNumber}</Text>
          )}
          {isTaxNumber && <Text style={styles.footerText}>{taxNumber}</Text>}
        </View>
      )}
      {isSecondColumn && (
        <View
          style={{
            ...getFooterSectionStyle(showSecondColumnBorder),
            width: "30%",
          }}
        >
          {isBankName && (
            <Text style={styles.footerText}>{bankDetails?.bankName}</Text>
          )}
          {isStreetNumber && (
            <Text style={styles.footerText}>{`${address?.streetNumber},`}</Text>
          )}
          {isPostCode && (
            <Text style={styles.footerText}>{`${address?.postalCode}`}</Text>
          )}
          {isIBAN && <Text style={styles.footerText}>{ibanNumber}</Text>}
          {isAccountNumber && (
            <Text style={styles.footerText}>Konto: {accountNumber}</Text>
          )}

        </View>
      )}
      {isThirdColumn && (
        <View style={getFooterSectionStyle(showThirdColumnBorder)}>
          {isC3Row1 && <Text style={styles.footerText}>{c3Row1}</Text>}
          {isC3Row2 && <Text style={styles.footerText}>{c3Row2}</Text>}
          {isC3Row3 && <Text style={styles.footerText}>{c3Row3}</Text>}
          {isC3Row4 && <Text style={styles.footerText}>{c3Row4}</Text>}
          {isC3Row5 && <Text style={styles.footerText}>{c3Row5}</Text>}
        </View>
      )}
      {isFourthColumn && (
        <View style={getFooterSectionStyle(false)}>
          {isC4Row1 && <Text style={styles.footerText}>{c4Row1}</Text>}
          {isC4Row2 && <Text style={styles.footerText}>{c4Row2}</Text>}
          {isC4Row3 && <Text style={styles.footerText}>{c4Row3}</Text>}
          {isC4Row4 && <Text style={styles.footerText}>{c4Row4}</Text>}
          {isC4Row5 && <Text style={styles.footerText}>{c4Row5}</Text>}
        </View>
      )}
    </View>
  );
};
