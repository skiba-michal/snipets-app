import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import store from "@store/index";
import { injectStore } from "@utils";
import { RootState } from "@store/rootReducer";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import { UserMessage } from "./interfaces/interfaces";

const App = () => {
  injectStore(store);
  const { enqueueSnackbar } = useSnackbar();
  const userMessage: UserMessage = useSelector((state: RootState) => state.user.userMessage);

  useEffect(() => {
    if (userMessage.message && userMessage.type) {
      enqueueSnackbar(userMessage.message, { variant: userMessage.type });
    }
  }, [userMessage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register/*" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;

// function App() {
//   return (
//     <Switch>
//       <Route path="/public">
//         <PublicPage />
//       </Route>
//       <PrivateRoute path="/protected" redirectTo="/login">
//         <ProtectedPage />
//       </PrivateRoute>
//     </Switch>
//   );
// }

// function PrivateRoute({ path, children, redirectTo }) {
//   let isAuthenticated = getAuth();
//   return (
//     <Route
//       path={path}
//       render={() => (
//         isAuthenticated ? children : <Redirect to={redirectTo} />
//       )}
//     />
//   );
// }
