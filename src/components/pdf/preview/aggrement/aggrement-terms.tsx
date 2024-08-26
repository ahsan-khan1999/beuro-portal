import Image from "next/image";
import writeIcon from "@/assets/svgs/write_icon.svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomCKEditor = dynamic(
  () => import("@/base-components/ui/editor/ck-editor"),
  { ssr: false }
);

export const AggrementTerms = ({
  aggrementDetails,
  isOffer,
  handleDescriptionUpdate,
}: {
  aggrementDetails: string;
  isOffer?: boolean;
  handleDescriptionUpdate?: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({
    aggrement: null,
  });

  const [editedText, setEditedText] = useState(aggrementDetails);

  useEffect(() => {
    setEditedText(aggrementDetails); // Update editedText whenever aggrementDetails changes
  }, [aggrementDetails]);

  const handleEditClick = () => {
    if (!isOffer) {
      setIsEditing(true);
    }
  };

  const handleSaveClick = () => {
    if (!editedText) return;
    handleDescriptionUpdate && handleDescriptionUpdate(editedText);
    setIsEditing(false);
    // Here, ideally, you would also handle saving editedText to a server or state management
  };

  const handleCancelClick = () => {
    setEditedText(aggrementDetails);
    // Revert to the original text
    setIsEditing(false);
  };

  return (
    <div>
      {isOffer ? (
        <div
          className="html-content flex flex-col gap-1 max-w-[1160px]"
          dangerouslySetInnerHTML={{ __html: aggrementDetails }}
        />
      ) : (
        <div>
          {!isEditing ? (
            <div className="flex gap-[10px] items-center">
              <span
                className="html-content text-[#000] text-base font-medium"
                dangerouslySetInnerHTML={{ __html: editedText }}
              />
              <Image
                onClick={handleEditClick}
                src={writeIcon}
                alt="writeIcon"
                className="cursor-pointer h-[25px] w-[25px]"
              />
            </div>
          ) : (
            <div className="mb-4">
              <CustomCKEditor
                data={editedText}
                onChange={(event, editor) => {
                  setEditedText(editor.getData());
                }}
              />
              <div className="flex gap-[19px] justify-end mt-4">
                <button
                  onClick={handleCancelClick}
                  className="border border-[#C7C7C7] w-[92px] px-4 py-[10px] rounded-md text-[#1E1E1E] text-base font-normal"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClick}
                  className="border bg-[#4A13E7] w-[152px] px-4 py-[10px] rounded-md text-[#fff] text-base font-normal"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
