import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register/*" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
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