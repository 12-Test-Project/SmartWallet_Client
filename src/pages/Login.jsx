import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
	const { t } = useTranslation();
	const { login, loading, error } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");

		if (!email || !password) {
			setFormError(t("error.allRequired"));
			return;
		}

		try {
			await login(email, password);
			navigate("/");
		} catch (err) {
			setFormError(err.message || t("error.signInError"));
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
			<div className="login-bg-image__inputs-container">
				<div className="login-bg-image-parent">
					<img className="login-bg-image shadow-md" src="/wallet.png" alt="" />
				</div>

				<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md login-inputs-container">
					<div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							{t("auth.login")}
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
								<label htmlFor="email" className="sr-only">
									{t("auth.email")}
								</label>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
									autoComplete="current-password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder={t("auth.password")}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={loading}
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
							>
								{loading ? t("common.loading") : t("auth.login")}
							</button>
						</div>

						<div className="text-center">
							<Link
								to="/register"
								className="text-sm text-blue-600 hover:text-blue-800"
							>
								{t("auth.register")}
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
