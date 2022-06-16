export interface CodeEditorProps {
  value: string;
  setValue: (v: string) => void;
  readonly?: boolean;
  isLoading?: boolean;
  language?: string;
  placeholder?: string
  onSave?: () => void;
  saveIsPending?: boolean;
  copyBtn?: boolean;
  editBtn?: boolean;
  saveBtn?: boolean;
  label?: string;
  minHeight?: number | string;
}
