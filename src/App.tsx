import AppRoutes from "@/routes/index";
import AuthProvider from "./components/context/AuthProvider";
export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
