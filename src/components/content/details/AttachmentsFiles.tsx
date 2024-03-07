import Image from "next/image";
import React from "react";
import pdfFileIcon from "@/assets/svgs/PDF_file_icon.svg";
import { getFileNameFromUrl } from "@/utils/utility";
import Link from "next/link";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";

const AttachmentsFiles = ({ fileName }: { fileName: string }) => {
  const handleFileLink = () => {
    window.open(fileName);
  };

  return (
    <div className="flex items-center gap-2 ">
      <span className="flex items-center gap-2 border border-[#EBEBEB] rounded-md px-3 py-2 w-full cursor-default">
        <Image src={pdfFileIcon} alt="pdfFileIcon" />
        {getFileNameFromUrl(fileName)}...
      </span>

      <Link
        href={fileName}
        target="_blank"
        rel="noopener noreferrer"
        locale={false}
        download
      >
        <DownloadIcon onClick={handleFileLink} />
      </Link>
    </div>
  );
};

export default AttachmentsFiles;
