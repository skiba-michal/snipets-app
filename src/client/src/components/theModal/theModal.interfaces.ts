import React from "react";

export interface TheModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  title?: string;
  mainBtnText?: string;
  onMainBtnClick?: () => void;
  onClose?: () => void;
  loadingBtn?: boolean;
  loading?: boolean;
}