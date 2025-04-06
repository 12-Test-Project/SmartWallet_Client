import { useTranslation } from "react-i18next";

const AdviceTypeSelector = ({ selectedType, onTypeChange }) => {
	const { t } = useTranslation();

	const adviceTypes = [
		{ id: "financial", icon: "dollar-sign" },
		{ id: "savings", icon: "piggy-bank" },
		{ id: "investment", icon: "trending-up" },
		{ id: "budget", icon: "clipboard" },
		{ id: "debt", icon: "credit-card" },
		{ id: "general", icon: "help-circle" },
	];

	return (
		<div className="flex flex-wrap gap-2 mb-4">
			{adviceTypes.map((type) => (
				<button
					type="button"
					key={type.id}
					className={`flex items-center px-3 py-2 rounded-lg text-sm ${
						selectedType === type.id
							? "bg-blue-600 text-white"
							: "bg-gray-100 text-gray-700 hover:bg-gray-200"
					}`}
					onClick={() => onTypeChange(type.id)}
				>
					<i className={`feather-${type.icon} mr-2`} />
					{t(`advisor.adviceTypes.${type.id}`)}
				</button>
			))}
		</div>
	);
};

export default AdviceTypeSelector;
