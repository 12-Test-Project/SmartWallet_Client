import React from "react";
import { useTranslation } from "react-i18next";

const LoadingSpinner = () => {
	const { t } = useTranslation();

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto" />
				<p className="mt-4 text-gray-600">{t("common.loading")}</p>
			</div>
		</div>
	);
};

export default LoadingSpinner;
