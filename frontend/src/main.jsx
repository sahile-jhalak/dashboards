import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <SidebarProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </SidebarProvider>
  </ThemeProvider>
);
