import Image from "next/image";
import React from "react";
import pdfFileIcon from "@/assets/svgs/PDF_file_icon.svg";
import downloadIcon from "@/assets/svgs/download_icon.svg";
import { useRouter } from "next/router";

const AttachmentsFiles = ({ fileName }: { fileName: string }) => {
  const router = useRouter();
  const pdfPreviewHandler = () => {
    router.push("/content/pdf-preview");
  };

  return (
    <div className="flex items-center gap-2 ">
      <span
        className="flex items-center gap-2 border border-[#EBEBEB] rounded-md px-3 py-2 w-full cursor-pointer"
        onClick={pdfPreviewHandler}
      >
        <Image src={pdfFileIcon} alt="pdfFileIcon" />
        {fileName}
      </span>
      <Image src={downloadIcon} alt="downloadIcon" className="cursor-pointer" />
    </div>
  );
};

export default AttachmentsFiles;
