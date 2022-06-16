import { CustomObject } from "@interfaces";

export interface SnippetsCreateElementProps {
  editElementId?: string;
  title: string;
  data?: CustomObject
  setData?: (v: CustomObject) => void;
  formWasSubmitted?: boolean;
  setIsError: (v: boolean) => void;
}