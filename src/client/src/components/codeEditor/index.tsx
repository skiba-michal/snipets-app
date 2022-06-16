import React, { useEffect, useState } from "react";
import CodeEditorReact from "@uiw/react-textarea-code-editor";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingIcon } from "../loadingIcon";
import { BaseButton } from "../baseButton";
import { CodeEditorProps } from "./codeEditor.interfaces";
import "./codeEditor.scoped.scss";

export const CodeEditor = ({
  value = "",
  setValue = () => {},
  readonly = false,
  isLoading = false,
  language = "tsx",
  placeholder = "Pisz kodzik...",
  onSave = () => {},
  saveIsPending = false,
  copyBtn = true,
  editBtn = true,
  saveBtn = true,
  minHeight = 200,
  label,
}: CodeEditorProps) => {
  const [disabledEditor, setDisabledEditor] = useState(true);

  const copyToUserStash = () => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    if (!editBtn) {
      setDisabledEditor(false);
    }
  }, [editBtn]);

  return (
    <div
      className={`code-editor-wrapper ${!readonly && !disabledEditor ? "code-editor-wrapper-edit-mode" : ""}`}
      data-color-mode="dark"
    >
      {label && <p className="code-editor-label">{label}</p>}

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
              minHeight: minHeight,
              backgroundColor: "#212425",
              fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
      )}
      <div className="code-editor-footer">
        {copyBtn && <BaseButton text="skopiuj" onClick={copyToUserStash} EndIcon={ContentCopyIcon} />}
        {editBtn && <BaseButton text="Edytuj" onClick={() => setDisabledEditor(!disabledEditor)} EndIcon={EditIcon} />}
        {saveBtn && <BaseButton text="zapisz" onClick={onSave} EndIcon={SaveIcon} loading={saveIsPending} />}
      </div>
    </div>
  );
};
