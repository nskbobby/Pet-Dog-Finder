import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DogSearch from "./components/DogSearch/DogSearch";
import Login from "./components/LoginPage/LoginPage";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn((loggedIn) => !loggedIn);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          !loggedIn ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Navigate to="/search" replace />
          )
        }
      />

      <Route
        path="/search"
        element={
          loggedIn ? (
            <DogSearch handleLogout={handleLoginSuccess} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
