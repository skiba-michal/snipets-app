import React, { useState } from "react";
import { ModalSettingsProps } from "./modalSettings.interface";
import { TheModal } from "@components";
import './modalSettings.scoped.scss'

export const ModalSettings = ({ open, setOpen }: ModalSettingsProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const onSave = () => {

  }
  return (
    <TheModal
      open={open}
      setOpen={setOpen}
      title="Ustawienia Użytkownika"
      mainBtnText={"Zapisz"}
      loading={isSaving}
      onMainBtnClick={onSave}
    >
      <div>setingsuy</div>
    </TheModal>
  );
};
