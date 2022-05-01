import React, { useState } from "react";
import { LoadingIcon } from "../loadingIcon";
import { CodeEditorProps } from "./codeEditor.interfaces";
import CodeEditorReact from "@uiw/react-textarea-code-editor";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { BaseButton } from "../baseButton";
import SaveIcon from "@mui/icons-material/Save";
import "./codeEditor.scoped.scss";

export const CodeEditor = ({
  value = "",
  setValue = () => {},
  readonly = false,
  isLoading = false,
  language = "tsx",
  placeholder = "Pisz kodzik...",
  onSave,
  saveIsPending = false,
}: CodeEditorProps) => {
  const [disabledEditor, setDisabledEditor] = useState(true);

  const copyToUserStash = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div
      className={`code-editor-wrapper ${!readonly && !disabledEditor ? "code-editor-wrapper-edit-mode" : ""}`}
      data-color-mode="dark"
    >
      {isLoading ? (
        <div>
          <LoadingIcon />
        </div>
      ) : (
        <div className="code-editor">
          <CodeEditorReact
            value={value}
            language={language}
            disabled={readonly || disabledEditor}
            placeholder={placeholder}
            onChange={evn => setValue(evn.target.value)}
            padding={15}
            style={{
              fontSize: 14,
              backgroundColor: "#212425",
              fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
      )}
      <div className="code-editor-footer">
        <BaseButton
          text="skopiuj"
          onClick={copyToUserStash}
          EndIcon={ContentCopyIcon}
          // position={PositionEnum.RIGHT}
        />
        <BaseButton
          text="Edytuj"
          onClick={() => setDisabledEditor(!disabledEditor)}
          EndIcon={EditIcon}
          // position={PositionEnum.RIGHT}
        />
        <BaseButton
          text="zapisz"
          onClick={onSave}
          EndIcon={SaveIcon}
          loading={saveIsPending}
          // position={PositionEnum.RIGHT}
        />
      </div>
    </div>
  );
};
