import { VariantType } from "notistack";

export interface UserMessage {
  type?: VariantType;
  message?: string;
}

export interface CustomObject {
  [key: string]: any;
}

export interface Option {
  value: string;
  label: string;
}