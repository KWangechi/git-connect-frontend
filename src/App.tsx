import AppRoutes from "@/routes/index";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./components/context/AuthProvider";
export default function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Toaster></Toaster>
    </>
  );
}
