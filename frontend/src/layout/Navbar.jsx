import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import {
  FiSearch,
  FiBell,
  FiSettings,
  FiSun,
  FiMoon,
  FiUser,
  FiFileText,
  FiAlertCircle,
  FiLogOut,
  FiDollarSign,
} from "react-icons/fi";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setOpenNotifications(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-0 left-41 right-0 z-40 h-16 bg-green  flex items-center px-6 justify-between">

      {/* ---------- RIGHT ICONS ---------- */}
      <div className="flex items-center gap-5">

        {/* ---------- NOTIFICATION DROPDOWN ---------- */}
        <div className="relative" ref={notificationRef}>
          <FiBell
            className="cursor-pointer text-lg"
            onClick={() => setOpenNotifications(!openNotifications)}/>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          {openNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-700 shadow-xl rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Notifications</h3>
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                  2 New
                </span>
              </div>

              <div className="space-y-4 text-sm">
                {/* Item 1 */}
                <div className="flex items-start gap-3">
                  <img
                    src="https://i.pravatar.cc/30?img=12"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Congratulations Flora! 🎉</p>
                    <p className="text-gray-500 dark:text-gray-300 text-xs">
                      Best seller badge
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                    TH
                  </div>
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-gray-500 dark:text-gray-300 text-xs">
                      5 hours ago
                    </p>
                  </div>
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded mt-2">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- PROFILE DROPDOWN ---------- */}
        <div className="relative" ref={profileRef}>
          <img
            src="https://i.pravatar.cc/40?img=3"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setOpenProfile(!openProfile)}
          />

          {openProfile && (
            <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-700 shadow-xl rounded-lg">

              {/* TOP USER INFO */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/40?img=3"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </div>
              </div>

              {/* MENU ITEMS */}
              <div className="p-2">
                <MenuItem icon={<FiUser />} text="Profile" />
                <MenuItem icon={<FiSettings />} text="Settings" />
                <MenuItem icon={<FiFileText />} text="Billing Plan" badge="4" />
                <MenuItem icon={<FiDollarSign />} text="Pricing" />
                <MenuItem icon={<FiAlertCircle />} text="FAQ" />

                {/* LOGOUT */}
                <button className="w-full bg-red-500 text-white py-2 rounded mt-2">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Reusable Item Component
const MenuItem = ({ icon, text, badge }) => (
  <div className="flex items-center justify-between p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>

    {badge && (
      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
        {badge}
      </span>
    )}
  </div>
);

export default Navbar;