import React, { useEffect, useState } from "react";
import { BaseInput, FormWrapper, TheAutocomplete, TheChecbox } from "@components";
import { Option } from "@interfaces";
import { availableLanguages, inputErrors, jsSelectValue } from "@const";
import { SnipetCategoryCreateRequest } from "@models";
import { SnippetsCreateCategoryProps } from "./snippetsCreateCategory.interfaces";
import "./snippetsCreateCategory.scoped.scss";

export const SnippetsCreateCategory = ({
  editElementId,
  data,
  setData,
  formWasSubmitted,
  setIsError, 
}: SnippetsCreateCategoryProps) => {
  const [name, setName] = useState('');
  const [isNameCorrect, setIsNameCorrect] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Option>(null)
  const [htmlOption, setHtmlOption] = useState<boolean>(false)
  const [cssOption, setCssOption] = useState<boolean>(false)

  useEffect(() => {
    const data: SnipetCategoryCreateRequest = {
      name: name,
      language: selectedLanguage?.value || '',
      html: htmlOption,
      css: cssOption,
    }

    setData(data)
  }, [name, selectedLanguage, htmlOption, cssOption, setData])

  useEffect(() => {
    setIsError(!isNameCorrect || !selectedLanguage?.value)
  }, [setIsError, isNameCorrect, selectedLanguage])
  
  return (
    <div className="snipets-wrapper">
      <FormWrapper width="calc(100%)">
        <BaseInput
          value={name}
          setValue={setName}
          label="Nazwa"
          showErrors={formWasSubmitted}
          setErrorParrent={setIsNameCorrect}
          validationSettings={{ isRequired: true, maxLength: 30, minLength: 3, basicCharacters: true }}
          width="unset"
        />
        <TheAutocomplete 
          value={selectedLanguage}
          setValue={setSelectedLanguage}
          label="Język"
          options={availableLanguages}
          width="100%"
          showErrors={!selectedLanguage?.value && formWasSubmitted}
          errorMessage={inputErrors.isRequired}
        />
        {
          selectedLanguage?.value === jsSelectValue && (<div className="checxbox-wrapper">
            <TheChecbox value={htmlOption} setValue={setHtmlOption} label="Dodaj HTML"  />
            <TheChecbox value={cssOption} setValue={setCssOption} label="Dodaj CSS"  />
          </div>)
        }
      </FormWrapper>
    </div>
  );
};
