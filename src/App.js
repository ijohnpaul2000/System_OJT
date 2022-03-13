import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Landing from "./pages/Landing";
import "./sass/index.scss";
import Manuscript from "./pages/Manuscript";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/manuscript"
          element={
            <ProtectedRoute>
              <Manuscript />
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
