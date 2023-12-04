import Image from "next/image";
import QR_CODE from "@/assets/pngs/QR_code.jpg";

export const QrCodeImage = () => {
  return (
    <div className="pt-[48px] ">
      <p className="text-black text-[22px] font-semibold ">Zahlteil</p>
      <Image src={QR_CODE} alt="QR_CODE" className="mt-[30px] mb-[25px]" />
      <div className="flex justify-between mt-[25px] w-[200px] mb-[53px]">
        <div className="flex flex-col gap-[3px]">
          <span className="tex-base text-black font-medium">Währung</span>
          <span className="tex-base text-black font-normal">CHF</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          <span className="tex-base text-black font-medium">Betrag</span>
          <span className="tex-base text-black font-normal">6418.92</span>
        </div>
      </div>
    </div>
  );
};
