// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<AppLayout />}>
          {/* <Route path="register" element={<RegisterPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
