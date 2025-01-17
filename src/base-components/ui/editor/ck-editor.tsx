import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "@/base-components/ui/editor/ckeditor/build/ckeditor";

const ClassicCKEditor = ({
  data,
  onChange,
}: {
  data: string;
  onChange: (event: any, editor: CustomEditor) => void;
}) => {
  return (
    <CKEditor
      editor={CustomEditor}
      data={data}
      onReady={(editor) => {}}
      onChange={(event, editor) => {
        const data = editor?.getData();
        onChange(event, editor);
      }}
      onBlur={(event, editor) => {}}
      onFocus={(event, editor) => {}}
      config={{
        //   toolbar: [
        //     "undo",
        //     "redo",
        //     "heading",
        //     "|",
        //     "bold",
        //     "italic",
        //     "link",
        //     "bulletedList",
        //     "numberedList",
        //     "blockQuote",
        //   ],
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
};

export default ClassicCKEditor;
