import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";

export const CompanyLogoLoader = () => {
  const { user } = useAppSelector((state) => state.auth);

  const isSVG = user?.company?.logo?.endsWith(".svg");

  return (
    <div>
      {user?.company?.logo && (
        <>
          {isSVG ? (
            <object
              data={user?.company?.logo}
              width="120"
              height="100"
              type="image/svg+xml"
              className="w-fit h-fit img_loader"
            ></object>
          ) : (
            <Image
              src={user?.company?.logo}
              alt="loading..."
              className="w-fit h-fit img_loader"
              width={120}
              height={100}
            />
          )}
        </>
      )}
    </div>
  );
};
{
  /* {user?.company?.logo && (
  <>
    {isSVG ? (
      <object
        data={user?.company?.logo}
        width="150"
        height="50"
        type="image/svg+xml"
        className="pr-[50px] max-h-[50px] border-r-2 border-[#000000] border-opacity-10"
      ></object>
    ) : (
      <Image
        src={user?.company?.logo}
        alt="Company Logo"
        className="pr-[50px] max-h-[50px] border-r-2 border-[#000000] border-opacity-10"
        height={50}
        width={150}
      />
    )}
  </>
)} */
}
