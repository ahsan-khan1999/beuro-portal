import Image from "next/image";
import horizontalCuterIcon from "@/assets/svgs/horizontal_cuter_icon.svg";
import verticleCuterIcon from "@/assets/svgs/veticle_cuter_icon.svg";
import QR_CODE from "@/assets/pngs/QR_code.jpg";
export const QrCodeDetails = () => {
  return (
    <div className="relative border-t-2 border-dashed border-[#8F8F8F] mt-[560px] mb-[52px]">
      <Image
        src={horizontalCuterIcon}
        alt="horizontalCuterIcon"
        className="absolute -top-4 left-[80px]"
      />

      <div className="grid grid-cols-3 gap-[50px] w-[90%] mx-auto">
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
                CH48 0900 0000 1556 1356 9
              </span>
              <span className="text-base font-normal text-[#000]">
                Rahal GmbH
              </span>
              <span className="text-base font-normal text-[#000]">
                St.Urbanstrasse 79
              </span>
              <span className="text-base font-normal text-[#000]">
                4914 Roggwil
              </span>
            </div>
          </div>
          <div className="mt-[38px]">
            <span className="tex-base text-black font-medium">Referenz</span>
            <span className="tex-base text-black font-normal">
              27 12323 0000 0000 0006 22926
            </span>
          </div>

          <div className="flex flex-col mt-[37px]">
            <span className="tex-base text-black font-medium mb-3">
              Zahlbar durch
            </span>
            <div className="flex flex-col gap-1">
              <span className="tex-base text-black font-normal">
                Rahal GmbH
              </span>
              <span className="tex-base text-black font-normal">
                St. Urbanstrasse 79
              </span>
              <span className="tex-base text-black font-normal">
                4914 Roggwill BE
              </span>
            </div>
          </div>

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

          <span className=" absolute bottom-[53px] right-[14px] text-black text-base font-medium">
            Annahmestelle
          </span>
        </div>

        {/* 2nd cols is here */}
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

        {/* 3rd div is here */}
        <div className="flex flex-col pt-[48px] pb-[52px]">
          <div className="flex flex-col ">
            <span className="text-[22px] font-semibold text-black mb-3">
              Konto / Zahlbar an
            </span>

            <div className="flex flex-col  gap-[3px]">
              <span className="text-base font-normal text-[#000]">
                CH48 0900 0000 1556 1356 9
              </span>
              <span className="text-base font-normal text-[#000]">
                Rahal GmbH
              </span>
              <span className="text-base font-normal text-[#000]">
                St.Urbanstrasse 79
              </span>
              <span className="text-base font-normal text-[#000]">
                4914 Roggwil
              </span>
            </div>
          </div>
          <div className="mt-[38px]">
            <span className="tex-base text-black font-medium">Referenz</span>
            <span className="tex-base text-black font-normal">
              27 12323 0000 0000 0006 22926
            </span>
          </div>

          <div className="flex flex-col mt-[37px]">
            <span className="tex-base text-black font-medium mb-3">
              Zahlbar durch
            </span>
            <div className="flex flex-col gap-1">
              <span className="tex-base text-black font-normal">
                Rahal GmbH
              </span>
              <span className="tex-base text-black font-normal">
                St. Urbanstrasse 79
              </span>
              <span className="tex-base text-black font-normal">
                4914 Roggwill BE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
