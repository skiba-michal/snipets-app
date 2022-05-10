import React, { useState } from "react";
import { ModalSearchDataProps } from "./modalSearchData.interface";
import { TheModal } from "@components";
import './modalSearchData.scoped.scss'

export const ModalSearchData = ({ open, setOpen }: ModalSearchDataProps) => {
  return (
    <TheModal
      open={open}
      setOpen={setOpen}
      title="Wyszukaj"
    >
      <div>SearchData</div>
    </TheModal>
  );
};
