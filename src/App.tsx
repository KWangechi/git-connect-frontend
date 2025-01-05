// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </div>
  );
}
