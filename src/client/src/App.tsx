import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import store from "@store/index";
import { injectHttpHandlerData } from "@utils";
import { PrivateRoute } from "@components";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import {
  Snippets,
  SnippetsBoard,
  SnippetsElement,
  Science,
  ScienceBoard,
  ScienceElement,
  AppsSnippets,
  AppsSnippetsBoard,
  AppsSnippetsElement,
  InterviewQuestions,
  InterviewQuestionsBoard,
  InterviewQuestionsElement,
  Languages,
  LanguagesBoard,
  LanguagesElement,
  Compilers,
  CompilersBoard,
  CompilersElement,
  Generators,
  GeneratorsBoard,
  GeneratorsElement,
  Favorite,
  Settings,
} from "./pages/dashboard/subPages";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  injectHttpHandlerData(store, enqueueSnackbar);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index={true} element={<Favorite />} />
            <Route path="snippets" element={<Snippets />}>
              <Route index={true} element={<SnippetsBoard />} />
              <Route path=":type/:id" element={<SnippetsElement />} />
            </Route>
            <Route path="science" element={<Science />}>
              <Route index={true} element={<ScienceBoard />} />
              <Route path=":type/:id" element={<ScienceElement />} />
            </Route>
            <Route path="apps-snippets" element={<AppsSnippets />}>
              <Route index={true} element={<AppsSnippetsBoard />} />
              <Route path=":type/:id" element={<AppsSnippetsElement />} />
            </Route>
            <Route path="interview-questions" element={<InterviewQuestions />}>
              <Route index={true} element={<InterviewQuestionsBoard />} />
              <Route path=":type/:id" element={<InterviewQuestionsElement />} />
            </Route>
            <Route path="languages" element={<Languages />}>
              <Route index={true} element={<LanguagesBoard />} />
              <Route path=":type" element={<LanguagesElement />} />
            </Route>
            <Route path="compilers" element={<Compilers />}>
              <Route index={true} element={<CompilersBoard />} />
              <Route path=":type" element={<CompilersElement />} />
            </Route>
            <Route path="generators" element={<Generators />}>
              <Route index={true} element={<GeneratorsBoard />} />
              <Route path=":type" element={<GeneratorsElement />} />
            </Route>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
