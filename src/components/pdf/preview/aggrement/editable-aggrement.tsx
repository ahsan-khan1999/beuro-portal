import { DocumentHeader } from "../document-header";
import { ContactDetails } from "../contact-details";
import { AggrementTerms } from "./aggrement-terms";
import { SignaturePad } from "./signature-pad";
import { Footer } from "../../footer";
import { AggrementProps } from "@/types/types";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";

import writeIcon from "@/assets/svgs/write_icon.svg";

const CustomCKEditor = dynamic(
  () => import("@/base-components/ui/editor/ck-editor"),
  { ssr: false }
);
export const EditableAggrement = ({
  contactAddress,
  footerDetails,
  headerDetails,
  aggrementDetails,
  templateSettings,
  totalPages,
  currPage,
}: AggrementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(aggrementDetails);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the edited text or perform any necessary action.
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Cancel editing and revert to the original text.
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        ""
      ) : (
        <div className="flex gap-[10px]">
          <span className="text-[#000] text-base font-medium">
            Vertragsabschluss:
          </span>

          <Image
            onClick={handleEditClick}
            src={writeIcon}
            alt="writeIcon"
            className="cursor-pointer h-[25px] w-[25px]"
          />
        </div>
      )}

      {isEditing ? (
        <div className="mb-4">
          <CustomCKEditor
            // editor={ClassicEditor}
            data={editedText}
            onChange={(event, editor) => {
              setEditedText(editor.getData());
            }}
          />
        </div>
      ) : (
        <div className="html-content" dangerouslySetInnerHTML={{ __html: editedText }}></div>
      )}

      {isEditing && (
        <div className="flex gap-[19px] justify-end mt-4">
          <button
            onClick={handleCancelClick}
            className="border border-[#C7C7C7] w-[92px] px-4 py-[10px] rounded-md text-[#1E1E1E] text-base font-normal "
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="border bg-[#4A13E7] w-[152px] px-4 py-[10px] rounded-md text-[#fff] text-base font-normal "
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
