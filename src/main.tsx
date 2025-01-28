import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Routes } from "./routes";
import { AccountContextProvider } from "./context/account-context";

const root = document.getElementById("root");

if (root === null) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <AccountContextProvider>
      <Routes />
    </AccountContextProvider>
  </StrictMode>
);
