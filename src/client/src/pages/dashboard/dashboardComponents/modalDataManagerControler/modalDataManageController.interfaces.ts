import { DialogTypeEnum } from "@interfaces";

export interface ModalControllerProps {
  setOpenModal: (v: boolean) => void;
  openModal: boolean;
  dialogType: DialogTypeEnum;
  title?: string;
  editElementId?: string;
}