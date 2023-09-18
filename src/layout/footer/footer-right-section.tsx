import Image from "next/image";

export const FooterRightSection = () => {
  return (
    <div className="pt-30 pb-7 pl-4 space-y-5 col-span-1">
      <h1 className="text-primary font-semibold">App herunterladen</h1>
      <div className="flex flex-col gap-y-2.5">
        <Image
          src="/assets/google-play-button.png"
          alt="Google Play Buton"
          width={134}
          height={140}
        />
        <Image
          src="/assets/app-store-button.png"
          alt="App Store Play Buton"
          width={134}
          height={140}
        />
      </div>
    </div>
  );
};
