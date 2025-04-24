import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import imagenFondo from "/Monee.png";

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
            {t("auth.login")}
          </h2>

          {/* Error message */}
          {(error || formError) && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error || formError}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t("auth.email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={t("auth.email")}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t("auth.password")}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={t("auth.password")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-full transition disabled:opacity-50"
            >
              {loading ? t("common.loading") : t("auth.login")}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              to="/register"
              className="inline-block w-full text-center py-2 px-4 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-full transition disabled:opacity-50"
            >
              {t("auth.register")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
