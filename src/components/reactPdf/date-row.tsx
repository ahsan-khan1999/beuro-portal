import { View } from "@react-pdf/renderer";
export const DateRow = ({ children }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 10,
      }}
    >
      {children}
    </View>
  );
};
