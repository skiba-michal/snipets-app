import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSnackbar } from "notistack";
import store from "@store/index";
import { injectHttpHandlerData } from "@utils";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import { PrivateRoute } from "@components";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  injectHttpHandlerData(store, enqueueSnackbar);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register/*" element={<RegisterPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;