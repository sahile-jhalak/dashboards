import React, { createContext, useState } from "react";
export const SidebarContext = createContext();
export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(localStorage.getItem("sidebar-collapsed") === "true");
  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", next);
  };
  return <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>{children}</SidebarContext.Provider>;
};
