import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Files from "./pages/Files";
import Library from "./pages/Library";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/files" element={<Files />} />
      <Route path="/library" element={<Library />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}
