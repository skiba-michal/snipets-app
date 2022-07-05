import React, { useState } from "react";
import { ModalSettingsProps } from "./modalSettings.interface";
import { TheModal, TheSwitch } from "@components";
import "./modalSettings.scoped.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";
import { httpClient } from "@utils";
import { apiStructure } from "@const";
import { UserSettings } from "@models";
import { setUserSettings } from "@store/user/user.reducer";

export const ModalSettings = ({ open, setOpen }: ModalSettingsProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [showSnippets, setShowSnippets] = useState(userData.settings.showSnippets);
  const [showScience, setShowScience] = useState(userData.settings.showScience);
  const [showProjectSnippets, setShowProjectSnippets] = useState(userData.settings.showProjectSnippets);
  const [showInterviewQuestions, setShowInterviewQuestions] = useState(userData.settings.showInterviewQuestions);
  const [showLanguages, setShowLanguages] = useState(userData.settings.showLanguages);
  const [showCompilators, setShowCompilators] = useState(userData.settings.showCompilators);
  const [showGenerators, setShowGenerators] = useState(userData.settings.showGenerators);
  const [showOnlyMyData, setShowOnlyMyData] = useState(userData.settings.showOnlyMyData);

  const onSave = () => {
    const data: UserSettings = {
      showOnlyMyData: showOnlyMyData,
      showSnippets: showSnippets,
      showScience: showScience,
      showProjectSnippets: showProjectSnippets,
      showInterviewQuestions: showInterviewQuestions,
      showLanguages: showLanguages,
      showCompilators: showCompilators,
      showGenerators: showGenerators,
    };
    setIsSaving(true);
    httpClient
      .post(apiStructure.userData.settings, data)
      .then(data => {
        dispatch(setUserSettings(data.data));
      })
      .finally(() => {
        setIsSaving(false);
        setOpen(false);
      });
  };

  const onClose = () => {
    setShowSnippets(userData.settings.showSnippets);
    setShowScience(userData.settings.showScience);
    setShowProjectSnippets(userData.settings.showProjectSnippets);
    setShowInterviewQuestions(userData.settings.showInterviewQuestions);
    setShowLanguages(userData.settings.showLanguages);
    setShowCompilators(userData.settings.showCompilators);
    setShowGenerators(userData.settings.showGenerators);
    setShowOnlyMyData(userData.settings.showOnlyMyData);
  };
  return (
    <TheModal
      open={open}
      setOpen={setOpen}
      onClose={onClose}
      title="Ustawienia Użytkownika"
      mainBtnText={"Zapisz"}
      loading={isSaving}
      onMainBtnClick={onSave}
    >
      <div className="settings-wrapper">
        <div className="settings-form-wrapper">
          <div className="settings-form-col">
            <p className="title">Wyświetlanie</p>
            <TheSwitch value={showOnlyMyData} setValue={setShowOnlyMyData} label="Tylko przezemnie dodane" />
          </div>
          <div className="settings-form-col">
            <p className="title">Widoczność zakładek</p>
            <TheSwitch value={showSnippets} setValue={setShowSnippets} label="Snipety" />
            <TheSwitch value={showScience} setValue={setShowScience} label="Nauka" />
            <TheSwitch value={showProjectSnippets} setValue={setShowProjectSnippets} label="Projekty" />
            <TheSwitch
              value={showInterviewQuestions}
              setValue={setShowInterviewQuestions}
              label="Pytania rekrutacyjne"
            />
            <TheSwitch value={showLanguages} setValue={setShowLanguages} label="Języki" />
            <TheSwitch value={showCompilators} setValue={setShowCompilators} label="Kompilatory" />
            <TheSwitch value={showGenerators} setValue={setShowGenerators} label="Generatory" />
          </div>
        </div>
      </div>
    </TheModal>
  );
};
