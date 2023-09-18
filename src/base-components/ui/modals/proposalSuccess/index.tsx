import { InfoModal } from "@/components";
import SuccessPopupBody from "../successPopupBody";

export const ProposalSuccess = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Einen Preis vorschlagen"
      containerClassName="max-w-[572px]"
    >
      <SuccessPopupBody
        heading="Ihr Angebot wurde erfolgreich gesendet"
        description=" Der niedrigste Preis, den Sie vorschlagen können, beträgt 30% des Sofort
        Kaufen Preises.Der niedrigste Preis, den Sie vorschlagen können, beträgt
        30% des Sofort Kaufen Preises."
        button1=" Meine Preisvorschläge"
        button2="Schließen Sie"
      />
    </InfoModal>
  );
};
