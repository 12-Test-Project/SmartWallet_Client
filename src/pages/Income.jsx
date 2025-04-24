import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";

const Income = () => {
  const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(i18n.language);
	const { user } = useAuth();
	const { dbService } = useDatabase();

	const [incomeList, setIncomeList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		amount: "",
		timeLapse: "",
		current: true,
		userId: user?.id || "",
	});

	useEffect(() => {
		fetchIncome();
	}, [dbService, user]);

	const fetchIncome = async () => {
		try {
			setLoading(true);
			const data = await dbService.getAll("income");
			const userIncome = data.filter((i) => i.userId === user.id);
			setIncomeList(userIncome);
		} catch (error) {
			console.error("Error al cargar ingresos:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const newIncome = {
				...formData,
				amount: parseFloat(formData.amount),
				userId: user.id,
			};

			await dbService.add("income", newIncome);
			setFormData({
				amount: "",
				timeLapse: "",
				current: true,
				userId: user.id,
			});
			setShowForm(false);
			fetchIncome();
		} catch (error) {
			console.error("Error al crear ingreso:", error);
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm(t("common.confirm"))) {
			try {
				await dbService.delete("income", id);
				fetchIncome();
			} catch (error) {
				console.error("Error al eliminar ingreso:", error);
			}
		}
	};

	if (loading) {
		return <div className="text-center p-8">{t("common.loading")}</div>;
	}

	return (
		<div className="container mx-auto px-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">{t("income.title")}</h1>
				<button
					type="button"
					onClick={() => setShowForm(!showForm)}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					{showForm ? t("common.cancel") : t("income.new")}
				</button>
			</div>

			{showForm && (
				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<h2 className="text-lg font-semibold mb-4">{t("income.new")}</h2>
					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									{t("income.amount")}
								</label>
								<input
									type="number"
									name="amount"
									value={formData.amount}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									{t("income.timeLapse")}
								</label>
								<input
									type="text"
									name="timeLapse"
									value={formData.timeLapse}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="current"
									name="current"
									checked={formData.current}
									onChange={handleChange}
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="current"
									className="ml-2 block text-sm text-gray-900"
								>
									{t("income.current")}
								</label>
							</div>
						</div>
						<div className="mt-4 flex justify-end">
							<button
								type="submit"
								className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								{t("common.save")}
							</button>
						</div>
					</form>
				</div>
			)}

			<div className="bg-white rounded-lg shadow overflow-hidden">
				{incomeList.length > 0 ? (
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{t("income.timeLapse")}
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{t("income.amount")}
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{t("income.current")}
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{t("common.state")}
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									{t("common.actions")}
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{incomeList.map((income) => (
								<tr key={income.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-gray-900">
											{income.timeLapse}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											${income.amount.toFixed(2)}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											{income.current ? "Sí" : "No"}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
												income.syncStatus === "synced"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{income.syncStatus === "synced"
												? (language === 'en' ? 'Syncronized' : 'Sincronizado') 
												: (language === 'en' ? 'Pending' : 'Pendiente')}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<Link
											to={`/income/${income.id}`}
											className="text-blue-600 hover:text-blue-900 mr-3"
										>
											{t("income.edit")}
										</Link>
										<button
											type="button"
											onClick={() => handleDelete(income.id)}
											className="text-red-600 hover:text-red-900"
										>
											{t("income.delete")}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="text-center p-8 text-gray-500">
						{t("income.noIncome")}
					</div>
				)}
			</div>
		</div>
	);
};

export default Income;
