import React from "react";
import { SizeEnum } from "@interfaces";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { BaseButton } from "../baseButton";
import { TheModalProps } from "./theModal.interfaces";
import { LoadingIcon } from "../loadingIcon";
import "./theModal.scoped.scss";

export const TheModal = ({
  open,
  setOpen,
  children,
  title,
  mainBtnText = "Save",
  onMainBtnClick,
  onClose = () => {},
  loadingBtn = false,
  loading = false,
}: TheModalProps) => {

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-container">
        <div className="modal-wrapper-element">
          {loading && (
            <div className="loading-wrapper">
              <LoadingIcon sizeValue={SizeEnum.MEDIUM} />
            </div>
          )}
          <div className="close-icon" onClick={handleClose}>
            <CloseIcon />
          </div>
          {title && <div className="modal-title">{title}</div>}
          <div className="modal-body">{children}</div>
          {onMainBtnClick && (
            <div className="modal-footer">
              {
                <BaseButton
                  text={mainBtnText}
                  onClick={onMainBtnClick}
                  disabled={loadingBtn}
                  EndIcon={SaveIcon}
                  loading={loadingBtn}
                  buttonColorVariant="dark"
                />
              }
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
