import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { SidebarContext } from "../contexts/SidebarContext";

const Layout = ({ children }) => {
  const { collapsed } = useContext(SidebarContext);
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className={`transition-[margin] ml-0 md:ml-64 ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
        <Navbar />
        <main className="pt-20 px-6 pb-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
