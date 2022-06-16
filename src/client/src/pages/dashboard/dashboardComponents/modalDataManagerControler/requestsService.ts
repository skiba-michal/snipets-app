import { CustomObject, DialogTypeEnum, ModuleTypeEnum } from "@interfaces";
import { httpClient } from "@utils";
import { apiStructure } from "@const";

export const requestService = (
  dialogType: DialogTypeEnum,
  moduleType: ModuleTypeEnum,
  data: CustomObject,
  onSavedCallback: () => void,
  editElementId?: string
) => {
  const isEdit = !!editElementId;
  if (moduleType === ModuleTypeEnum.SNIPPETS) {
    saveEditSnippet(dialogType, data, onSavedCallback, isEdit);
  }
};

const saveEditSnippet = (
  dialogType: DialogTypeEnum,
  data: CustomObject,
  onSavedCallback: () => void,
  isEdit: boolean
) => {
  if (dialogType === DialogTypeEnum.CATEGORY) {
    if (isEdit) {
    } else {
      httpClient.post(apiStructure.snipets.snipetsCategories, data).finally(() => {
        onSavedCallback();
      });
    }
  }
  if (dialogType === DialogTypeEnum.ELEMENT) {
  }
};
