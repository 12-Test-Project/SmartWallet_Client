import { useState } from "react";
import { useTranslation } from "react-i18next";
import AdviceChat from "../components/advisor/AdviceChat";
import AdviceTypeSelector from "../components/advisor/AdviceTypeSelector";

const Advisor = () => {
	const { t } = useTranslation();
	const [selectedType, setSelectedType] = useState("financial");

	return (
		<div className="container mx-auto p-4">
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">{t("advisor.title")}</h1>
				<p className="text-gray-600">{t("advisor.subtitle")}</p>
			</div>

			<div className="bg-white rounded-lg shadow-md p-6">
				<AdviceTypeSelector
					selectedType={selectedType}
					onTypeChange={setSelectedType}
				/>

				<div className="h-[calc(100vh-300px)] min-h-[400px]">
					<AdviceChat />
				</div>
			</div>
		</div>
	);
};

export default Advisor;
