import Image from "next/image";
// import companyLogo from "@/assets/pngs/company_logo.webp";
import { useAppSelector } from "@/hooks/useRedux";

export const CompanyLogoLoader = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      {user?.company?.logo && (
        <Image
          src={user?.company?.logo}
          alt="loading..."
          className="w-[120px] h-[100px] img_loader"
          width={120}
          height={100}
        />
      )}
    </>
  );
};
