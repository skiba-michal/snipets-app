import React, { useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { BaseButton, CodeEditor, TheAutocomplete} from "@components";
import { apiStructure, compilableLanguages, defaultAvailableLanguage } from "@const";
import { Option } from "@interfaces";
import { httpClient } from "@utils";
import { CompileData, RequestResponse } from "@models";
import "./compilersBoard.scoped.scss";

export const CompilersBoard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Option>(defaultAvailableLanguage);

  const [codeValueMain, setCodeValueMain] = useState("");
  const [codeValueCss, setCodeValueCss] = useState("");
  const [codeValueHtml, setCodeValueHtml] = useState("");
  const [inputValue, setInputValue] = useState("");

  const onCompileCode = () => {
    selectedLanguage.value === defaultAvailableLanguage.value ? compileJsHtmlCssCode() : compileCode();
  };

  const compileJsHtmlCssCode = () => {
    const htmlCode = codeValueHtml;
    const cssCode = `<style>${codeValueCss}</style>`;
    const jsCode = `<script>${codeValueMain}</script>`;
    const iframeWrapperElement = document.getElementById("iframe-element-wrapper");
    const frame = document.createElement("iframe") as HTMLIFrameElement;
    frame.classList.add("js-html-css-output");

    iframeWrapperElement.innerHTML = "";
    iframeWrapperElement.appendChild(frame);

    const frameDocument = frame.contentWindow.document;
    frameDocument.open();
    frameDocument.write(htmlCode + cssCode + jsCode);
    frameDocument.close();
  };

  const compileCode = () => {
    const data: CompileData = {
      input: inputValue,
      language: selectedLanguage.value,
      code: codeValueMain,
    };

    httpClient
      .post(apiStructure.compile.compile, JSON.stringify(data))
      .then((d: RequestResponse<string>) => {
        console.log(d, "elololo");
      })
      .catch(() => {});
  };

  return (
    <div className="compiler-board-wrapper">
      <div className="compiler-board-header">
        <TheAutocomplete value={selectedLanguage} setValue={setSelectedLanguage} options={compilableLanguages} />
        <BaseButton text="Kompiluj" onClick={onCompileCode} EndIcon={AutorenewIcon} />
      </div>
      <div className="compiler-board-content">
        <div className="compiler-board-code-editors">
          <CodeEditor
            value={codeValueMain}
            setValue={setCodeValueMain}
            language={selectedLanguage.value}
            label={selectedLanguage.label}
            editBtn={false}
            saveBtn={false}
          />
          {selectedLanguage.value === defaultAvailableLanguage.value && (
            <>
              <CodeEditor value={codeValueCss} setValue={setCodeValueCss} label="CSS" editBtn={false} saveBtn={false} />
              <CodeEditor
                value={codeValueHtml}
                setValue={setCodeValueHtml}
                label="HTML"
                editBtn={false}
                saveBtn={false}
              />
            </>
          )}
        </div>
        <div className="compiler-board-code-output">
          {selectedLanguage.value !== defaultAvailableLanguage.value && (
            <CodeEditor
              value={inputValue}
              setValue={setInputValue}
              label="Input"
              placeholder="Wartość wejściowa"
              editBtn={false}
              saveBtn={false}
              copyBtn={false}
            />
          )}
          {selectedLanguage.value === defaultAvailableLanguage.value && <div id="iframe-element-wrapper" />}
        </div>
      </div>
    </div>
  );
};
