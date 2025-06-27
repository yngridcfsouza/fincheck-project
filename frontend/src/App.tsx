import { AuthProvider } from "./app/contexts/AuthContext";
import { Router } from "./Router";

import { Toaster } from "react-hot-toast"

export default function App() {
  return (
    <AuthProvider>
      <Router />

      <Toaster />
    </AuthProvider>
  )
}
