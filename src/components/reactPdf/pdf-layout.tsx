import { PdfPreviewProps } from "@/types";
import { Merger } from "./pdf-merge";

const PDF = (data: PdfPreviewProps) => {

  return <Merger {...{...data}} />;
};

export default PDF;
