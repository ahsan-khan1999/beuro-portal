import Image from "next/image";
import React from "react";
import writeIcon from "@/assets/svgs/write_icon.svg";

const Page2 = () => {
  return (
    <div className="px-[80px] flex flex-col bg-white">
      <div className="flex justify-between items-center mt-5 mb-[50px]">
        <div className="flex flex-col gap-[4px]">
          <span className="text-[#000] text-base font-medium">
            Frau Natalie Semeli
          </span>
          <span className="text-[#000] text-base font-medium">Erlenweg 8 </span>
          <span className="text-[#000] text-base font-medium">
            3294 Buren an der Aare
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div>
            <span className="text-[#000] text-base font-medium">Email:</span>
            <span className="text-[#000] text-base font-medium">
              karinsch242@gmail.com
            </span>
          </div>
          <div>
            <span className="text-[#404040] text-base font-medium">Phone:</span>
            <span className="text-[#000] text-base font-medium">
              031 350 15 15
            </span>
          </div>
        </div>
      </div>
      <div className="h-[3px] bg-black mb-[35px]"></div>

      <div className="flex flex-col gap-1">
        <div className="flex gap-[10px]">
          <span className="text-[#000] text-base font-medium">
            Vertragsabschluss:
          </span>
          <Image
            src={writeIcon}
            alt="writeIcon"
            className="cursor-pointer h-[25px] w-[25px]"
          />
        </div>
        <p className="text-[#000] text-[14px] font-normal">
          Wenn Sie mit der Offerte einverstanden sind, bitten wir Sie um
          Unterzeichnung der Offerte. Sie können das Angebot gerne per Post oder
          per E-Mail zurücksenden. Nach Erhalt der unterzeichneten Offerte,
          werden Sie eine Auftragsbestätigung erhalten. Start der Arbeiten:
          08.00 Uhr, sofern keine andere Uhrzeit vereinbart wurde.
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-[30px]">
        <span className="text-[#000] text-base font-medium">
          Zahlungsarten:
        </span>

        <p className="text-[#000] text-[14px] font-normal">
          Banküberweisung: Sie können den Betrag auf unser angegebenes Bankkonto
          überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem
          Umzugstermin eingehen muss (mindestens einen Tag vorher).
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-[30px]">
        <span className="text-[#000] text-base font-medium">Bar Zahlung:</span>

        <p className="text-[#000] text-[14px] font-normal">
          Sie haben die Möglichkeit, den Betrag direkt vor Ort Bar zu
          begleichen. Bitte sorgen Sie dafür, dass Sie den entsprechenden Betrag
          passend verfügen.
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-[30px]">
        <span className="text-[#000] text-base font-medium">Lorm Ipsum :</span>

        <p className="text-[#000] text-[14px] font-normal">
          Sie können den ausstehenden Betrag vor Ort via TWINT begleichen, indem
          Sie mit der TWINT-App einen QR-Code scannen. Der Betrag wird
          anschliessend von Ihrem Bankkonto belastet.
          <br /> Nach Erhalt des Betrages, werden wir Ihnen lorem ipsum dollar
          smith mit eine Quittung zustellen.
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-[30px]">
        <span className="text-[#000] text-base font-medium">
          Zahlung per TWINT:
        </span>

        <p className="text-[#000] text-[14px] font-normal">
          Sie können den ausstehenden Betrag vor Ort via TWINT begleichen, indem
          Sie mit der TWINT-App einen QR-Code scannen. Der Betrag wird
          anschliessend von Ihrem Bankkonto belastet.
          <br /> Nach Erhalt des Betrages, werden wir Ihnen per E-Mail eine
          Quittung zustellen.
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-[30px]">
        <span className="text-[#000] text-base font-medium">
          Aufgrund unserer Erfahrungen stellen wir an Privatpersonen keine
          Rechnungen mehr aus , ausgenommen:
        </span>

        <p className="text-[#000] text-[14px] font-normal">
          Personen, bei denen der Umzug vom Sozialdienst übernommen wird.
          Diesbezüglich brauchen wir vom Sozialamt eine schriftliche Bestätigung
          der Kostenübernahme. - Firmen, welche eine Anzahlung der Hälfte des
          Betrages leisten, können den Restbetrag per Rechnung begleichen. Die
          unterzeichnete Offerte ist zwingend Anzahlung, können wir eine
          Rechnung für den Restbetrag ausstellen. Ansonsten wird der ganze
          Betrag Bar oder per TWINT vor Ort verrechnet.
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-[30px]">
        <span className="text-[#000] text-base font-medium">
          Stornierungsgebühren:
        </span>

        <p className="text-[#000] text-[14px] font-normal">
          Bei einer Stornierung werden Ihnen mindestens vier volle gebuchte
          Arbeitsstunden in Rechnung gestellt. Die berechneten Arbeitsstunden
          beziehen sich auf die gebuchten Leistungen gemäß dem Angebot, sowie
          Unkosten, die durch die Reservierung entstehen. Wenn Sie Ihren
          vereinbarten Umzugstermin mit uns auf einen neuen Tag festlegen bzw.
          verschieben, fallen keine Stornogebühren an.
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-[30px]">
        <span className="text-[#000] text-base font-medium">
          Gültigkeit der Offerte:
        </span>

        <p className="text-[#000] text-[14px] font-normal">
          3 Monate ab Erstellung der Offerte
        </p>
      </div>

      <p className="mt-[30px] mb-[78px] text-[18px] text-black font-medium">
        I share the contract with you.
      </p>

      <div className="grid grid-cols-2 gap-[100px] mb-[50px]">
        <div >
          <hr className="mb-[11px]" />
          <span className="text-base text-black font-normal ">
            Place - Date
          </span>
        </div>
        <div >
          <hr className="mb-[11px]" />
          <span className="text-base text-black font-normal">Signature</span>
        </div>
      </div>
    </div>
  );
};

export default Page2;
