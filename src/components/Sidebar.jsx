import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
	const { t } = useTranslation();

	const navItems = [
		{ path: "/", label: "navigation.home", icon: "home" },
		{
			path: "/transactions",
			label: "navigation.transactions",
			icon: "credit-card",
		},
		{ path: "/income", label: "navigation.income", icon: "dollar-sign" },
		{ path: "/services", label: "navigation.services", icon: "briefcase" },
		{ path: "/advisor", label: "navigation.advisor", icon: "message-circle" },
		{ path: "/profile", label: "navigation.profile", icon: "user" },
		{ path: "/settings", label: "navigation.settings", icon: "settings" },
	];

	return (
		<aside className="w-64 bg-gray-800 text-white hidden md:block">
			<div className="p-4">
				<h2 className="text-xl font-bold">{t("app.title")}</h2>
				<p className="text-gray-400 text-sm">{t("app.subtitle")}</p>
			</div>
			<nav className="mt-8">
				<ul>
					{navItems.map((item) => (
						<li key={item.path} className="mb-2">
							<NavLink
								to={item.path}
								className={({ isActive }) =>
									`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white ${
										isActive ? "bg-gray-700 text-white" : ""
									}`
								}
							>
								<i className={`feather-${item.icon} mr-3`} />
								<span>{t(item.label)}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
