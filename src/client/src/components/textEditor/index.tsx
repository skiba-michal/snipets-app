import React, { useRef } from "react";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import { LoadingIcon } from "@components";
import { TextEditorProps } from "./textEditor.interfaces";
import CodeMirror from "codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/lib/codemirror.css";
import "suneditor/dist/css/suneditor.min.css";
import "./textEditor.scss";

export const TextEditor = ({ value = "", setValue = () => {}, isLoading = false }: TextEditorProps) => {
  const editor = useRef<SunEditorCore>();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  return (
    <div className="text-editor-wrapper">
      {isLoading ? (
        <div>
          <LoadingIcon />
        </div>
      ) : (
        <SunEditor
          setContents={value}
          name="editor"
          height="100%"
          width="100%"
          getSunEditorInstance={getSunEditorInstance}
          setAllPlugins={true}
          autoFocus={true}
          onChange={(value: string) => setValue(value)}
          resizingBar={false}
          setOptions={{
            codeMirror: CodeMirror,
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize"],
              ["bold", "underline", "italic", "strike", "subscript", "superscript"],
              ["fontColor", "hiliteColor"],
              ["align", "list", "lineHeight"],
              ["outdent", "indent"],
              ["codeView"],
              ["removeFormat"],
            ],
          }}
        />
      )}
    </div>
  );
};
