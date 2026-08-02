import { ClerkProvider } from "@clerk/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/app.css";
import { router } from "./routes/router";
import { paths } from "./routes/paths";
import { queryClient } from "./store/queryClient";
import { ToastProvider } from "./store/ToastProvider";
import { UsuarioProvider } from "./store/UsuarioProvider";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error("Falta la variable de entorno VITE_CLERK_PUBLISHABLE_KEY");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl={paths.login}>
      <QueryClientProvider client={queryClient}>
        <UsuarioProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </UsuarioProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
);
