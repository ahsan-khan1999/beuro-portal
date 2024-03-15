import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { CKEditorBoxProps } from "@/types";

import CustomEditor from "@/base-components/ui/editor/ckeditor/build/ckeditor";
import { useTranslation } from "next-i18next";

const CustomCKEditor = ({
  id,
  field,
  trigger,
  data,
  name,
  type,
}: CKEditorBoxProps) => {
  const { t: translate } = useTranslation();
  return (
    <CKEditor
      id={id}
      editor={CustomEditor}
      data={field.value}
      key={data}
      onReady={(editor) => {
        field.onChange(field.value);
      }}
      onChange={(event, editor) => {
        field.onChange(editor.getData());
      }}
      onBlur={(event, editor) => {}}
      onFocus={(event, editor) => {}}
      onError={(error, errorDetails) => {
        trigger?.(field.name);
      }}
      config={{
        language: "de",

        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            // "fontfamily",
            "fontsize",
            // "fontColor",
            // "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            // "underline",
            "strikethrough",
            // "subscript",
            // "superscript",
            // "code",
            "|",
            // "alignment",
            "link",
            "blockQuote",
            // "codeBlock",
            "|",
            "bulletedList",
            "numberedList",
            // "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        placeholder: translate("common.editor_placeholder"),
      }}
    />
  );
};
export default CustomCKEditor;
