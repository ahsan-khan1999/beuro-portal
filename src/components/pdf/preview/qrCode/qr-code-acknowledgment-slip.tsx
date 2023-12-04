import Image from "next/image";
import verticleCuterIcon from "@/assets/svgs/veticle_cuter_icon.svg";
import { AcknowledgementSlipProps } from "@/types/types";

export const QRCodeAcknowledgementSlip = ({
  accountDetails: { accountNumber, city, name, street },
  amount,
  currency,
  referenceNumber,
}: AcknowledgementSlipProps) => {
  return (
    <div className="relative flex flex-col border-r-2 border-dashed border-[#8F8F8F] pt-[48px] pb-[52px]">
      <div className="flex flex-col ">
        <Image
          src={verticleCuterIcon}
          alt="verticleCuterIcon"
          className="absolute top-[64px] -right-4"
        />
        <span className="text-[22px] font-semibold text-black mb-3">
          Empfangsschenin
        </span>
        <span className="text-base font-medium text-[#000] mb-[6px]">
          Konto/ Zahlbar an
        </span>
        <div className="flex flex-col  gap-[3px]">
          <span className="text-base font-normal text-[#000]">
            {accountNumber}
          </span>
          <span className="text-base font-normal text-[#000]">{name}</span>
          <span className="text-base font-normal text-[#000]">{street}</span>
          <span className="text-base font-normal text-[#000]">{city}</span>
        </div>
      </div>
      <div className="mt-[38px]">
        <span className="tex-base text-black font-medium">Referenz</span>
        <span className="tex-base text-black font-normal">
          {referenceNumber}
        </span>
      </div>

      <div className="flex flex-col mt-[37px]">
        <span className="tex-base text-black font-medium mb-3">
          Zahlbar durch
        </span>
        <div className="flex flex-col gap-1">
          <span className="tex-base text-black font-normal">{name}</span>
          <span className="tex-base text-black font-normal">{street}</span>
          <span className="tex-base text-black font-normal">{city}</span>
        </div>
      </div>

      <div className="flex justify-between mt-[25px] w-[200px] mb-[53px]">
        <div className="flex flex-col gap-[3px]">
          <span className="tex-base text-black font-medium">Währung</span>
          <span className="tex-base text-black font-normal">{currency}</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          <span className="tex-base text-black font-medium">Betrag</span>
          <span className="tex-base text-black font-normal">{amount}</span>
        </div>
      </div>

      <span className=" absolute bottom-[53px] right-[14px] text-black text-base font-medium">
        Annahmestelle
      </span>
    </div>
  );
};
