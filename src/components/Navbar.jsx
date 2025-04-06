import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";
import { NavLink } from "react-router-dom";

const Navbar = ({ user, onToggleSidebar }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { isOnline, syncData, isSyncing } = useDatabase();

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="mr-4 text-gray-500 hover:text-gray-700 md:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <NavLink to={"/"} className={"text-xl font-bold text-gray-900"}>
              <span>{t("app.title")}</span>
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            {!isOnline && (
              <span className="text-red-500 text-sm">
                {t("offline.status")}
              </span>
            )}
            {isOnline && (
              <button
                type="button"
                onClick={syncData}
                disabled={isSyncing}
                className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                {isSyncing ? t("common.loading") : t("offline.sync")}
              </button>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {user?.name || user?.userName}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {t("auth.logout")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;