/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { TheModal } from "@components";
import { CustomObject, DialogTypeEnum, ModuleTypeEnum } from "@interfaces";
import { RootState } from "@store/rootReducer";
import { useSelector } from "react-redux";
import { ModalControllerProps } from "./modalDataManageController.interfaces";
import {
  SnippetsCreateCategory,
  SnippetsCreateElement,
  ScienceCreateElement,
  ScienceCreateCategory,
  AppsSnippetsCreateElement,
  AppsSnippetsCreateCategory,
  InterviewQuestionsCreateElement,
  InterviewQuestionsCreateCategory,
  LanguagesCreateCategory,
} from "../../subPages";
import { requestService } from "./requestsService";

export const ModalDataManageController = ({
  title,
  dialogType,
  editElementId,
  setOpenModal,
  openModal,
}: ModalControllerProps) => {
  const { drawerData } = useSelector((state: RootState) => state.options);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const [data, setData] = useState<CustomObject>({});
  const [isError, setIsError] = useState(true);
  const [isFetchinData, setIsFetchingData] = useState(false);
  const [isSavindData, setIsSavindData] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    setData({});
    setFormWasSubmitted(false);
    setIsSavindData(false);
    setIsError(true);
    editElementId ? fetchData() : setIsFetchingData(false);
  }, [openModal, editElementId]);

  const fetchData = () => {
    setIsFetchingData(true);

    setTimeout(() => {
      setIsFetchingData(false);
    }, 1000);
  };

  const onSavedCallback = () => {
    setOpenModal(false);
    setIsSavindData(false);
  };

  const onSaveEditAction = () => {
    console.log(data, "DATA", isError, formWasSubmitted);
    setFormWasSubmitted(true);
    if (!isError) {
      setIsSavindData(true);
      requestService(dialogType, drawerData.module, data, onSavedCallback, editElementId);
    }
  };

  const getSnippetComponent = () => {
    if (dialogType === DialogTypeEnum.CATEGORY) {
      setModalTitle(editElementId ? "Edytuj kategori??" : "Stw??rz kategori?? snipetu");
      return (
        <SnippetsCreateCategory
          setData={setData}
          data={data}
          editElementId={editElementId}
          formWasSubmitted={formWasSubmitted}
          setIsError={setIsError}
        />
      );
    } else if (dialogType === DialogTypeEnum.ELEMENT) {
      setModalTitle(editElementId ? "Edytuj snipet" : "Stw??rz snipet");
      return (
        <SnippetsCreateElement
          title={title}
          editElementId={editElementId}
          setData={setData}
          data={data}
          formWasSubmitted={formWasSubmitted}
          setIsError={setIsError}
        />
      );
    }
    return <div>Error</div>;
  };

  const getScienceComponent = () => {
    if (dialogType === DialogTypeEnum.CATEGORY) {
      setModalTitle(editElementId ? "Stw??rz kategori?? nauki" : `Edytuj kategori??`);
      return (
        <ScienceCreateCategory
          editElementId={editElementId}
          setData={setData}
          data={data}
          setFormWasSubmitted={setFormWasSubmitted}
          formWasSubmitted={formWasSubmitted}
        />
      );
    } else if (dialogType === DialogTypeEnum.ELEMENT) {
      setModalTitle(editElementId ? "Stw??rz dzia?? nauki" : "Edytuj dzia?? nauki");
      return (
        <ScienceCreateElement
          title={title}
          editElementId={editElementId}
          setData={setData}
          data={data}
          setFormWasSubmitted={setFormWasSubmitted}
          formWasSubmitted={formWasSubmitted}
        />
      );
    }
    return <div>Error</div>;
  };

  const getInterviewQuestionsComponent = () => {
    if (dialogType === DialogTypeEnum.CATEGORY) {
      setModalTitle(editElementId ? "Stw??rz kategori?? pyta?? rekrutacyjnych" : "Edytuj kategori??");
      return (
        <InterviewQuestionsCreateCategory
          editElementId={editElementId}
          setData={setData}
          data={data}
          setFormWasSubmitted={setFormWasSubmitted}
          formWasSubmitted={formWasSubmitted}
        />
      );
    } else if (dialogType === DialogTypeEnum.ELEMENT) {
      setModalTitle(editElementId ? "Stw??rz dzia?? pyta?? rekrutacyjnych" : "Edytuj dzia?? pyta?? rekrutacyjnych");
      return (
        <InterviewQuestionsCreateElement
          title={title}
          editElementId={editElementId}
          setData={setData}
          data={data}
          setFormWasSubmitted={setFormWasSubmitted}
          formWasSubmitted={formWasSubmitted}
        />
      );
    }
    return <div>Error</div>;
  };

  const getAppSnippetsComponent = () => {
    if (dialogType === DialogTypeEnum.CATEGORY) {
      setModalTitle(editElementId ? "Stw??rz kategori?? snipet??w dedykowanych do aplikacji" : "Edytuj kategori??");
      return (
        <AppsSnippetsCreateCategory
          editElementId={editElementId}
          setData={setData}
          data={data}
          setFormWasSubmitted={setFormWasSubmitted}
          formWasSubmitted={formWasSubmitted}
        />
      );
    } else if (dialogType === DialogTypeEnum.ELEMENT) {
      setModalTitle(editElementId ? "Stw??rz snipet dedykowany do aplikacji" : "Edytuj snipet");
      return (
        <AppsSnippetsCreateElement
          title={title}
          editElementId={editElementId}
          setData={setData}
          data={data}
          setFormWasSubmitted={setFormWasSubmitted}
          formWasSubmitted={formWasSubmitted}
        />
      );
    }
    return <div>Error</div>;
  };

  const getLanguageComponent = () => {
    if (dialogType === DialogTypeEnum.CATEGORY) {
      setModalTitle(editElementId ? "Dodaj nowy j??zyk" : "Edytuj j??zyk");
      return (
        <LanguagesCreateCategory
          editElementId={editElementId}
          setData={setData}
          data={data}
          setFormWasSubmitted={setFormWasSubmitted}
          formWasSubmitted={formWasSubmitted}
        />
      );
    }
    setModalTitle("");
    return <div>Error</div>;
  };

  const renderComponent = (): JSX.Element => {
    if (drawerData.module === ModuleTypeEnum.SNIPPETS) {
      return getSnippetComponent();
    }

    if (drawerData.module === ModuleTypeEnum.SCIENCE) {
      return getScienceComponent();
    }

    if (drawerData.module === ModuleTypeEnum.APPSNIPPTES) {
      return getAppSnippetsComponent();
    }

    if (drawerData.module === ModuleTypeEnum.INTERVIEWQUESTIONS) {
      return getInterviewQuestionsComponent();
    }

    if (drawerData.module === ModuleTypeEnum.LANGUAGES) {
      return getLanguageComponent();
    }

    return <div>Error</div>;
  };

  const memoizedComponent = useMemo(() => renderComponent(), [
    drawerData.module,
    dialogType,
    editElementId,
    openModal,
    formWasSubmitted,
  ]);

  return (
    <TheModal
      setOpen={setOpenModal}
      open={openModal}
      loading={isFetchinData}
      loadingBtn={isSavindData}
      title={modalTitle}
      mainBtnText={editElementId ? "Edytuj" : "Zapisz"}
      onMainBtnClick={onSaveEditAction}
    >
      {memoizedComponent}
    </TheModal>
  );
};
