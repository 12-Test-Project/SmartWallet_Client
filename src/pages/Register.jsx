import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import imagenFondo from "/persona.png";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl w-full flex">
        {/* Image section */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${imagenFondo})` }}
        ></div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            {t("auth.register")}
          </h2>

          {/* Error message */}
          {(error || formError) && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error || formError}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t("auth.name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={t("auth.name")}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                {t("auth.phoneNumber")}
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={t("auth.phoneNumber")}
              />
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                {t("auth.username")}
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                value={formData.userName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={t("auth.username")}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                className="w-full mt-1 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={t("auth.email")}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                className="w-full mt-1 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={t("auth.password")}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
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
                className="w-full mt-1 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={`${t("common.confirm1")} ${t("auth.password")}`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-full transition disabled:opacity-50"
            >
              {loading ? t("common.loading") : t("auth.register")}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="inline-block w-full text-center py-2 px-4 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-full transition disabled:opacity-50"
            >
              {t("auth.login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
