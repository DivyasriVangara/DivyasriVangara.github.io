import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Scan from "../pages/Scan";
import Fingerprint from "../pages/Fingerprint";
import History from "../pages/History";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/scan" element={<Scan />} />

      <Route path="/fingerprint" element={<Fingerprint />} />

      <Route path="/history" element={<History />} />

      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}

export default AppRoutes;