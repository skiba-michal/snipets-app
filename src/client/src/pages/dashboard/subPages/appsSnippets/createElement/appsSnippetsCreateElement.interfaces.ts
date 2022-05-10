import { CustomObject } from "@interfaces";

export interface AppSnippetsCreateElementProps {
  editElementId?: string;
  title: string;
  data?: CustomObject
  setData?: (v: CustomObject) => void;
  formWasSubmitted?: boolean;
  setFormWasSubmitted?: (v: boolean) => void;
}