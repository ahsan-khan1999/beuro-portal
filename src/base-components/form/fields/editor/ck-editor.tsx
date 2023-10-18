import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ClassicCKEditor = ({
  data,
  onChange,
}: {
  data: string;
  onChange: (event: any, editor: ClassicEditor) => void;
}) => (
  

  <CKEditor
    editor={ClassicEditor}
    data={data}
    
    onReady={(editor) => {
    }}
    onChange={(event, editor) => {
      const data = editor.getData();
      onChange(event, editor);
    }}
    onBlur={(event, editor) => {
    }}
    onFocus={(event, editor) => {
    }}
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

export default ClassicCKEditor;
