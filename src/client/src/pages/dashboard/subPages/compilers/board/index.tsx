import { CodeEditor, TheAutocomplete, TheChecbox, TheSwitch } from "@components";
import { availableLanguages } from "@const";
import { Option } from '@interfaces'
import React, { useState } from "react";
import "./compilersBoard.scoped.scss";

export const CompilersBoard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Option>(null)
  const [codeValueMain, setCodeValueMain] = useState("");
  const [codeValueCss, setCodeValueCss] = useState("");
  const [codeValueHtml, setCodeValueHtml] = useState("");
  const [checkboxValue, setChecboxValue] = useState(false);
  const [checkboxValue2, setChecboxValue2] = useState(false);

  return (
    <div>
      <div><TheAutocomplete value={selectedLanguage} setValue={setSelectedLanguage} options={availableLanguages}/></div>
      <CodeEditor value={codeValueMain} setValue={setCodeValueMain} language="js" />
      <TheChecbox value={checkboxValue} setValue={setChecboxValue} label="test"/>
      <TheSwitch value={checkboxValue2} setValue={setChecboxValue2} label="test"/>
    </div>
  );
};
