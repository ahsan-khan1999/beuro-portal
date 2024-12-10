import Image from "next/image";
import React from "react";
import Link from "next/link";
import pdfFileIcon from "@/assets/svgs/PDF_file_icon.svg";
import { getFileNameFromUrl } from "@/utils/utility";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";

const AttachmentsFiles = ({ fileName }: { fileName: string }) => {
  const handleFileLink = () => {
    window.open(fileName);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 border border-[#EBEBEB] rounded-md px-3 py-2 w-full cursor-default bg-white min-h-[44px] max-h-[44px]">
        <Image src={pdfFileIcon} alt="pdfFileIcon" />
        <p className="truncate text-[#4B4B4B] font-normal text-sm">
          {getFileNameFromUrl(fileName)}
        </p>
      </div>

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
