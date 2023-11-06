import { ThumbnailProps } from "@/types";
import Image from "next/image";

export const Thumbnail = ({ imageSrc, onClick, index }: ThumbnailProps) => (
  <div className="relative w-[60px] h-[50px]">
    <Image
      src={imageSrc}
      alt={`thumbnail ${index}`}
      className="rounded-[4px] h-[50px]"
      fill={true}
      onClick={onClick}
    />
    {index === 7 && (
      <span className="absolute top-0 left-0 bg-primary rounded-lg text-white text-[10px] max-w-[39px] max-h-[15px] font-medium px-2">
        New
      </span>
    )}
  </div>
);
