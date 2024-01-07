import { StyleSheet } from "@react-pdf/renderer";

// export const {
//   textBase,
//   textSmall,
//   displayFlex,
//   flexColumn,
//   flexRow,
//   justifyBetween,
//   mt5,
//   p4,
//   textBlack,
//   textGray,
//   w100,
// } = StyleSheet.create({
//   p4: {
//     padding: 16,
//   },
//   mt5: {
//     marginTop: 20,
//   },
//   w100: {
//     width: "100%",
//   },
//   displayFlex: {
//     display: "flex",
//   },
//   flexColumn: {
//     flexDirection: "column",
//   },
//   flexRow: {
//     flexDirection: "row",
//   },
//   justifyBetween: {
//     justifyContent: "space-between",
//   },
//   textBase: {
//     fontSize: 16,
//   },
//   textSmall: {
//     fontSize: 12,
//   },
//   textGray: {
//     color: "#404040",
//   },
//   textBlack: {
//     color: "#000",
//   },
// });

export const {
  container,
  greyText,
  leftColumn,
  rightColumn,
  textBase,
  textSmall,
} = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
    padding: 20,
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
  },
  rightColumn: {
    flexDirection: "column",
  },
  textBase: {
    color: "#000",
    fontSize: 16,
    fontWeight: "medium",
  },
  textSmall: {
    color: "#000",
    fontSize: 14,
  },
  greyText: {
    color: "#404040",
  },
});
