import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
	const { t } = useTranslation();
	const { register, loading, error } = useAuth();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		phoneNumber: "",
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "Client",
		active: true,
	});

	const [formError, setFormError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");

		// Validaciones básicas
		if (
			!formData.name ||
			!formData.phoneNumber ||
			!formData.userName ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			setFormError(t("error.allRequired"));
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setFormError(t("error.passwordsNoMatch"));
			return;
		}

		try {
			await register(formData);
			navigate("/login");
		} catch (err) {
			setFormError(err.message || t("error.signUpError"));
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
			<div className="signup-bg-image__inputs-container">
				<img className="signup-bg-image shadow-md " src="/persona.png" alt="" width={32} height={32} />

				<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md signup-inputs-container">
					<div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							{t("auth.register")}
						</h2>
					</div>

					{(error || formError) && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
							{error || formError}
						</div>
					)}

					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="name" className="sr-only">
									{t("auth.name")}
								</label>
								<input
									id="name"
									name="name"
									type="text"
									required
									value={formData.name}
									onChange={handleChange}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder={t("auth.name")}
								/>
							</div>
							<div>
								<label htmlFor="phoneNumber" className="sr-only">
									{t("auth.phoneNumber")}
								</label>
								<input
									id="phoneNumber"
									name="phoneNumber"
									type="text"
									required
									value={formData.phoneNumber}
									onChange={handleChange}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder={t("auth.phoneNumber")}
								/>
							</div>
							<div>
								<label htmlFor="userName" className="sr-only">
									{t("auth.username")}
								</label>
								<input
									id="userName"
									name="userName"
									type="text"
									required
									value={formData.userName}
									onChange={handleChange}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder={t("auth.username")}
								/>
							</div>
							<div>
								<label htmlFor="email" className="sr-only">
									{t("auth.email")}
								</label>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder={t("auth.email")}
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									{t("auth.password")}
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="new-password"
									required
									value={formData.password}
									onChange={handleChange}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder={t("auth.password")}
								/>
							</div>
							<div>
								<label htmlFor="confirmPassword" className="sr-only">
									{t("common.confirm1")} {t("auth.password")}
								</label>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									autoComplete="new-password"
									required
									value={formData.confirmPassword}
									onChange={handleChange}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder={`Confirmar ${t("auth.password")}`}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={loading}
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
							>
								{loading ? t("common.loading") : t("auth.register")}
							</button>
						</div>

						<div className="text-center">
							<Link
								to="/login"
								className="text-sm text-blue-600 hover:text-blue-800"
							>
								{t("auth.login")}
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
