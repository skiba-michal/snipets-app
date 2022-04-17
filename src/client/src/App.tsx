import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import store from "@store/index";
import { injectHttpHandlerData } from "@utils";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import { PrivateRoute } from "@components";
import {
  Compilers,
  Favorite,
  InterviewQuestions,
  Languages,
  Generators,
  Science,
  Snippets,
  Settings,
} from "./pages/dashboard/subPages";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  injectHttpHandlerData(store, enqueueSnackbar);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register/*" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index={true} element={<Favorite />} />
            <Route path="compilers" element={<Compilers />} />
            <Route path="interview-questions" element={<InterviewQuestions />} />
            <Route path="languages" element={<Languages />} />
            <Route path="generators" element={<Generators />} />
            <Route path="science" element={<Science />} />
            <Route path="snippets" element={<Snippets />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
