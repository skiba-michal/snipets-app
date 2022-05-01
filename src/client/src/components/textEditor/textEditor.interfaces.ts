export interface TextEditorProps {
  value: string;
  setValue: (v: string) => void;
  isLoading?: boolean;
}
