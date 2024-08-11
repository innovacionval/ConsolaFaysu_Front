import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./styles/globals.scss";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/modalContext";
import { LoadingProvider } from "./contexts/LoadingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </LoadingProvider>
  </React.StrictMode>
);
