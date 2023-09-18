import Image from "next/image";
import { SocialMedia } from "./social-media";
import logo from "@/assets/logo.png";

export const FooterLeftSection = () => {
  return (
    <div className="flex flex-col pt-5 pb-7 pr-5 col-span-1">
      <Image src={logo} alt="brand logo" width={167} height={48} />
      <p className="text-sm text-dark w-150 mt-8">
        Folgen Sie uns in den sozialen Medien
      </p>
      <SocialMedia />
    </div>
  );
};
