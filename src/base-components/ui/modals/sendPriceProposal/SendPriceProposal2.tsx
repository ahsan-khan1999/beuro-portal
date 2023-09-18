import React from "react";
import { InfoModal } from "../info-modal";
import SuccessPopupBody from "../successPopupBody";
import RadioButton from "../../radioButton/RadioButton";
const SendPriceProposal2 = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Einen Preis vorschlagen"
      containerClassName="max-w-[572px]"
    >
      <div className="pt-3 pb-5 border-b-2 border-[#707070] border-opacity-20">
        <p className="font-medium text-dark">
          Die Gegenpartei hat 48 Stunden Zeit, um deinen Preisvorschlag zu
          akzeptieren oder abzulehnen.
        </p>
        <div className="mt-5 flex items-center">
          <h2 className="font-semibold text-dark mr-6">Sofort Kaufen Preis</h2>
          <h3 className="font-medium text-sm text-dark">
            CHF <span className="font-semibold text-2xl ml-1">17'900</span>
          </h3>
        </div>
      </div>
      <div className="pt-5 pb-6 border-b-2 border-[#707070] border-opacity-20">
        <h2 className="font-semibold text-dark">Einen Preis vorschlagen</h2>
        <p className="text-sm text-[#616161] mt-1 mb-3">
          Der niedrigste Preis, den Sie vorschlagen können, beträgt{" "}
          <span className="font-medium text-dark">30%</span> des Sofort Kaufen
          Preises.
        </p>
        <div className="rounded-lg border border-[#707070] px-5 py-3 flex items-center">
          <span className="font-medium opacity-50 text-dark mr-4">CHF</span>
          <input
            type="number"
            className="w-full focus:outline-none font-semibold text-2xl text-dark"
          />
        </div>
      </div>
      <div className="py-5  border-b-2 border-[#707070] border-opacity-20 space-y-3">
        <h2 className="font-semibold text-dark ">Lieferung</h2>

        <div className="rounded-lg border border-[#C4C4C4] p-2 flex items-center">
          <RadioButton label="Abholung in 8484 Weisslingen, + CHF 0" />
          {/* <input type="radio" />
          <label className="ml-3 font-medium text-dark">
            Abholung in 8484 Weisslingen,{" "}
            <span className="font-semibold">+ CHF 0</span>
          </label> */}
        </div>
        <div className="rounded-lg border border-[#C4C4C4] p-2 flex items-center">
          <RadioButton label="Paket B-Post+ CHF 100" />
          {/* <input type="radio" />
          <label className="ml-3 font-medium text-dark">
            Paket B-Post<span className="font-semibold">+ CHF 100</span>
          </label> */}
        </div>
      </div>
      <div className="pt-3  ">
        <h2 className="font-semibold text-dark mb-4">Geschätzte Summe</h2>

        <div className="rounded-lg border border-[#707070] px-5 py-3 flex items-center">
          <span className="font-medium opacity-50 text-dark mr-4">CHF</span>
          <input
            type="number"
            className="w-full focus:outline-none font-semibold text-2xl text-dark"
          />
        </div>
        <div className="mt-5">
          <input type="checkbox" />
          <label className="text-sm text-dark ml-3">
            Ich nehme zur Kenntnis, dass ich hiermit einen rechtsverbindlichen
            Preisvorschlag sende.
          </label>
        </div>
        <button className="mt-8 py-3 w-full bg-secondary rounded-lg font-medium  text-white">
          Angebot senden
        </button>
      </div>
    </InfoModal>
  );
};

export default SendPriceProposal2;
