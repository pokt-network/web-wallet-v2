import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/toast";

const root = document.getElementById("root");

if (root === null) {
  throw new Error("Root element not found");
}

const queryClient = new QueryClient();

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
