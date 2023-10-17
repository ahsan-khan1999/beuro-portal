import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorBoxProps } from "@/types";

const CustomCKEditor = ({
  id,
  field,
  trigger,
  data,
  name,
}: CKEditorBoxProps) => (
  <CKEditor
    id={id}
    editor={ClassicEditor}
    data={data}
    onReady={(editor) => {}}
    onChange={(event, editor) => {
      field.onChange(editor.getData());
    }}
    onBlur={(event, editor) => {}}
    onFocus={(event, editor) => {}}
    onError={(error, errorDetails) => {
      trigger?.(field.name);
    }}
    config={{
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          // "fontfamily",
          // "fontsize",
          // "fontColor",
          // "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          // "strikethrough",
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
      placeholder: "Describe your item",
    }}
  />
);

export default CustomCKEditor;
