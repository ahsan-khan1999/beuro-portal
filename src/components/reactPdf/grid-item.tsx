import { View } from "@react-pdf/renderer";

export const GUTTER = 10;
export const COLUMNS = 12;
export const PAGE_WIDTH = 595;
export const totalGuttersWidth = (COLUMNS - 1) * GUTTER;
export const COLUMN_WIDTH = (PAGE_WIDTH - totalGuttersWidth) / COLUMNS;

export const GridItem = ({ children, width }: any) => {
  const style = width
    ? { width, marginRight: GUTTER }
    : { flexGrow: 1, marginRight: GUTTER };

  return <View style={style}>{children}</View>;
};
