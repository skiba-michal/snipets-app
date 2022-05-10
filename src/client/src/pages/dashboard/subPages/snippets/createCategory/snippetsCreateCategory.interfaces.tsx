import { CustomObject } from "@interfaces";

export interface SnippetsCreateCategoryProps {
  editElementId?: string;
  data?: CustomObject
  setData?: (v: CustomObject) => void;
  formWasSubmitted?: boolean;
  setFormWasSubmitted?: (v: boolean) => void;
}