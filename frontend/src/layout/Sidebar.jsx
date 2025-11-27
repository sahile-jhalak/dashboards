
import React, { useContext, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { FiHome, FiBarChart2, FiShoppingBag, FiUser, FiMenu,FiAirplay,FiSettings,FiServer,FiBell,FiToggleRight,FiActivity,FiAlertOctagon,FiArrowDownCircle,FiAnchor,FiArrowLeft,FiAtSign} from "react-icons/fi";

const Sidebar = ({ onSelect }) => {
  const { collapsed, toggleSidebar } = useContext(SidebarContext);

  const menu = [
    { icon: <FiHome />, label: "Dashboards" },
    { icon: <FiBarChart2 />, label: "Analytics" },
    { icon: <FiShoppingBag />, label: "Ecommerce" },
    { icon: <FiUser />, label: "Users" },
    { icon: <FiAirplay />, label: "Products" },
    { icon: <FiSettings />, label: "Settings" },
    { icon: <FiServer />, label: "Servers" },
    { icon: <FiBell />, label: "Notifications" },
    { icon: <FiToggleRight />, label: "Toggle" },
    { icon: <FiActivity />, label: "Activity" },
    { icon: <FiAlertOctagon />, label: "Alerts" },
    { icon: <FiArrowDownCircle />, label: "Downloads" },
    { icon: <FiAnchor />, label: "Anchors" },
    { icon: <FiArrowLeft />, label: "Arrow Left" },
    { icon: <FiAtSign />, label: "At Sign" },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-screen transition-all ${collapsed ? "w-20" : "w-64"} bg-white dark:bg-gray-900 border-n`}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && <div className="text-primary text-xl font-bold">Visualization Dashboard</div>}
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <FiMenu />
        </button>
      </div>
      <nav className="mt-2 px-2 space-y-1">
        {menu.map((m, i) => (
          <div
            key={i}
            title={m.label}
            onClick={() => onSelect(m.label)}
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <div className="text-lg">{m.icon}</div>
            {!collapsed && <div className="text-sm font-medium">{m.label}</div>}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
