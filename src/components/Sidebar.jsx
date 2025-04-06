import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = ({ isOpen, onClose }) => {
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
		<aside
			className={`fixed inset-y-0 left-0 transform ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} md:relative md:translate-x-0 w-64 bg-gray-800 text-white transition-transform duration-200 ease-in-out z-20`}
		>
			<div className="p-4 flex justify-between items-center">
				<div>
					<h2 className="text-xl font-bold">{t("app.title")}</h2>
					<p className="text-gray-400 text-sm">{t("app.subtitle")}</p>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="md:hidden text-white focus:outline-none"
				>
					<svg
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<title>Hamburger</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<nav className="mt-8">
				<ul>
					{navItems.map((item) => (
						<li key={item.path} className="mb-2">
							<NavLink
								to={item.path}
								onClick={onClose}
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
