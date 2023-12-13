import Image from "next/image";
import React, { useState } from "react";
import writeIcon from "@/assets/svgs/write_icon.svg";
import PdfHeader from "../PdfHeader";
import PdfFooter from "../PdfFooter";
import { useTranslation } from "next-i18next";

const Page1 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { t: translate } = useTranslation();

  const [text, setText] = useState(
    "Anger fur Ihren Umzug, Entsogung inkl. Ein- und Auspacken"
  );

  const [tempText, setTempText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setText(tempText);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTempText(text);
  };

  return (
    <div>
      <PdfHeader />
      <div className="px-[80px] flex flex-col bg-white">
        <div className="flex justify-between items-center mt-5 mb-[37px]">
          <div className="flex flex-col gap-[4px]">
            <span className="text-[#000] text-base font-medium">
              Frau Natalie Semeli
            </span>
            <span className="text-[#000] text-base font-medium">
              Erlenweg 8{" "}
            </span>
            <span className="text-[#000] text-base font-medium">
              3294 Buren an der Aare
            </span>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="flex gap-x-3">
              <span className="text-[#000] text-base font-medium">
                {translate("common.PDF_HEADER.email")}:
              </span>
              <span className="text-[#000] text-base font-medium">
                karinsch242@gmail.com
              </span>
            </div>
            <div className="flex gap-x-3">
              <span className="text-[#404040] text-base font-medium">
                Phone:
              </span>
              <span className="text-[#000] text-base font-medium">
                031 350 15 15
              </span>
            </div>
          </div>
        </div>

        <div
          className={`mb-[10px] ${
            isEditing
              ? "border border-[#4B4B4B] p-2 rounded-md flex justify-between"
              : ""
          }`}
        >
          <div className="flex gap-[10px]">
            {isEditing ? (
              <input
                type="text"
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                className="border border-[#4B4B4B] p-1 rounded-md outline-none border-none"
              />
            ) : (
              <span className="text-xl font-semibold text-[#393939]">
                {text}
              </span>
            )}
            {!isEditing && (
              <Image
                src={writeIcon}
                alt="writeIcon"
                className="cursor-pointer h-[25px] w-[25px]"
                onClick={handleEditClick}
              />
            )}
          </div>
          {isEditing && (
            <div className="flex gap-[20px]">
              <button
                onClick={handleCancelClick}
                className="border border-[#8F8F8F] px-[11px] py-[6px] rounded-[3px] text-[12px] font-normal"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                className=" bg-[#4A13E7] rounded-[3px]  px-[29px] py-[6px]   text-[#fff]"
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div className="h-[3px] bg-black mb-[20px]"></div>

        <div className="flex gap-[30px]">
          <span>Address 1:</span>
          <span className="text-[#141414] text-base font-normal">
            <strong> Erlenweg 8, 3294 Buren an der Aare</strong> 6.5
            Zimmerwohanhnung, Ug/EG/OG, grosser und voller Keller,
            <br /> vollmolbilert, Kartons einpacken, Mobel demontieren
          </span>
        </div>
        <div className="h-[2px] bg-[#8C8C8C] opacity-50 my-[8px]"></div>
        <div className="flex gap-[30px]">
          <span>Address 2:</span>
          <span className="text-[#141414] text-base font-normal">
            <strong> Rebenstrasse, 4112 Battwil</strong>&nbsp; 6Mobel montieren,
            Kartons auspacken
          </span>
        </div>
        <div className="h-[2px] bg-[#8C8C8C] opacity-50 my-[8px]"></div>

        <div className="flex gap-[20px] mb-[46px]">
          <span>Work Dates:</span>
          <span className="text-[#000] text-base font-normal">
            30-11-2023 to 07-11-2023
          </span>
        </div>

        <div className="bg-[#40506A] py-[8px] rounded-[4px] mb-3">
          <div className="flex justify-between items-center ">
            <span className="pl-[12px] text-white text-base font-medium ">
              Service / Product
            </span>
            <div className="flex gap-[82px] ">
              <span className="text-base font-medium text-white">Price</span>
              <span className="text-base font-medium text-white">Unit</span>
              <span className="text-base font-medium text-white">Count</span>
              <span className="text-base font-medium text-white pr-[46px]">
                Total
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] p-[12px] mb-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-normal text-[#000]">
                3 Mitarbeiter ohne Farzeung
              </span>
              <span className="text-[#404040] text-[14px] font-normal">
                Arbeit nach Aufwand. Mindestbetrag 4 stunden. Nur die <br />
                grossen.Arbeit nach Aufwand. Mindestbetrag 4 stunden. Nur die
                <br />
                grossen.
              </span>
            </div>
            <div className="flex  gap-[82px] ">
              <span className="text-base font-normal text-[#000]">150 CHF</span>
              <span className="text-base font-normal text-[#000]">Std</span>
              <span className="text-base font-normal text-[#000]">05.00</span>
              <span className="text-base font-semibold text-[#000]">
                750 CHF
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] p-[12px] mb-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-normal text-[#000]">
                3 Mitarbeiter und 2 Lieferwagen, davon 1 Anhanger
              </span>
              <span className="text-[#404040] text-[14px] font-normal">
                3 Tag: Noch mals Transport von der ersten zur zweiten Addresse
              </span>
            </div>
            <div className="flex  gap-[82px] ">
              <span className="text-base font-normal text-[#000]">150 CHF</span>
              <span className="text-base font-normal text-[#000]">Std</span>
              <span className="text-base font-normal text-[#000]">05.00</span>
              <span className="text-base font-semibold text-[#000]">
                750 CHF
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] p-[12px] mb-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-normal text-[#000]">
                Wylerringstrasse 66, 3013 Bern
              </span>
              <span className="text-[#404040] text-[14px] font-normal">
                Arbeit nach Aufwand. Mindestbetrag 4 stunden. Nur die grossen.
              </span>
            </div>
            <div className="flex  gap-[82px] ">
              <span className="text-base font-normal text-[#000]">150 CHF</span>
              <span className="text-base font-normal text-[#000]">Std</span>
              <span className="text-base font-normal text-[#000]">05.00</span>
              <span className="text-base font-semibold text-[#000]">
                750 CHF
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] p-[12px] mb-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-normal text-[#000]">
                3 Mitarbeiter und 2 Lieferwagen, davon 1 Anhanger
              </span>
              <span className="text-[#404040] text-[14px] font-normal">
                3 Tag: Noch mals Transport von der ersten zur zweiten Addresse
              </span>
            </div>
            <div className="flex  gap-[82px] ">
              <span className="text-base font-normal text-[#000]">150 CHF</span>
              <span className="text-base font-normal text-[#000]">Std</span>
              <span className="text-base font-normal text-[#000]">05.00</span>
              <span className="text-base font-semibold text-[#000]">
                750 CHF
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] p-[12px]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-normal text-[#000]">
                3 Mitarbeiter und 2 Lieferwagen, davon 1 Anhanger
              </span>
              <span className="text-[#404040] text-[14px] font-normal">
                3 Tag: Noch mals Transport von der ersten zur zweiten Addresse
              </span>
            </div>
            <div className="flex  gap-[82px] ">
              <span className="text-base font-normal text-[#000]">150 CHF</span>
              <span className="text-base font-normal text-[#000]">Std</span>
              <span className="text-base font-normal text-[#000]">05.00</span>
              <span className="text-base font-semibold text-[#000]">
                750 CHF
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-[90px] mt-[44px]">
          <div className="flex flex-col">
            <span className="text-base font-medium text-[#000]">
              Konditionen Schätzofferte Umzug
            </span>

            <span className="text-[#404040] font-normal mt-[10px]">
              Vielen Dank für Ihr Interesse an unseren Dienstleistungen. <br />
              Sie finden nachfolgend weitere Informationen bezüglich der
              Richtlinien <br /> und Bedingungen. Bitte nehmen Sie sich Zeit, um
              die nachfolgenden <br /> Geschäftsbedingungen zu verstehen.
            </span>
          </div>

          <div>
            <div className="flex gap-[77px]">
              <div className="flex flex-col gap-[10px]">
                <span className="text-[#1E1E1E] text-base font-medium">
                  Sub Total
                </span>
                <span className="text-[#1E1E1E] text-base font-medium">
                  Tax%
                </span>
                <span className="text-[#1E1E1E] text-base font-medium">
                  Discount:
                </span>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="text-[#1E1E1E] text-base font-medium">
                  2000CHF
                </span>
                <span className="text-[#1E1E1E] text-base font-medium">
                  100CHF (7.7%)
                </span>
                <span className="text-[#1E1E1E] text-base font-medium">
                  100.50 CHF
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center bg-[#404F6A] rounded-[4px] px-[10px] py-[8px] gap-[55px] mt-[10px]">
              <span className="text-base font-semibold text-[#fff]">
                Grand Total:
              </span>
              <span className="text-base font-semibold text-[#fff]">
                2100.50 CHF
              </span>
            </div>
          </div>
        </div>
      </div>
      <PdfFooter />
    </div>
  );
};

export default Page1;
