import React from "react";
import { InfoModal } from "./info-modal";
import ReportAndCancel from "./ReportAndCancel";

const ReportUser = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Benutzer melden"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <ReportAndCancel
        description="Bitte lesen Sie unsere Community-Richtlinien für weitere Informationen darüber, was auf Kaufes erlaubt ist und was nicht."
        label1="Spam"
        label2="Betrug/Betrug"
        label3="Verkauf von illegalen Artikeln"
        label4="Fräulein Information"
        label5="Misinformation about product"
        label6="Andere"
        textAreaLabel="Bitte beschreiben Sie Ihren Grund"
        placeholder="Geben Sie Ihre Antwort ein"
        checkBoxLabel="Ich stimme den Allgemeinen Geschäftsbedingungen von Kaufes zu"
        button1="Bericht abschicken"
        button2="Abbrechen"
      />
    </InfoModal>
  );
};

export default ReportUser;
