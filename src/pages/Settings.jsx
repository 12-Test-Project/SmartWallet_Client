import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDatabase } from "../contexts/DatabaseContext";

const Settings = () => {
	const { t, i18n } = useTranslation();
	const { isOnline, pendingSyncCount, syncData, isSyncing } = useDatabase();

	const [language, setLanguage] = useState(i18n.language);

	const handleLanguageChange = (e) => {
		const newLang = e.target.value;
		setLanguage(newLang);
		i18n.changeLanguage(newLang);
	};

	const handleForceSyncClick = () => {
		if (isOnline && !isSyncing) {
			syncData();
		}
	};

	const getTranslatedSyncState = (language) => {
		if (language === 'en') {
			return isOnline ? "Online" : "No connection";
		}
		return isOnline ? "En línea" : "Sin conexión";
	};

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-2xl font-bold mb-6">{t("navigation.settings")}</h1>

			<div className="bg-white rounded-lg shadow p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">{t("language.label")}</h2>
				<div className="max-w-xs">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						{t("language.select")}
					</label>
					<select
						value={language}
						onChange={handleLanguageChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="es">Español</option>
						<option value="en">English</option>
					</select>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow p-6">
				<h2 className="text-xl font-semibold mb-4">{t("sync.label")}</h2>
				<div className="mb-4">
					<p className="text-sm text-gray-700 mb-2">
						{t("sync.connectionState")}
						<span
							className={`ml-2 font-medium ${isOnline ? "text-green-600" : "text-red-600"}`}
						>
							{getTranslatedSyncState(language)}
						</span>
					</p>
					<p className="text-sm text-gray-700">
						{t("sync.pendingChanges")}
						<span className="ml-2 font-medium">{pendingSyncCount}</span>
					</p>
				</div>
				<button
					type="button"
					onClick={handleForceSyncClick}
					disabled={!isOnline || isSyncing || pendingSyncCount === 0}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
				>
					{isSyncing ? t("common.loading") : t('sync.force')}
				</button>
			</div>
		</div>
	);
};

export default Settings;
