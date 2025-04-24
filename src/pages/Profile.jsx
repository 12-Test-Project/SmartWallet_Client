import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
	
	const [language, setLanguage] = useState(i18n.language);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil
    // Por ahora solo simulamos que se guardó
    setIsEditing(false);
  };

  const getTranslatedPersonalInfo = (language) => {
    if (language === "en") {
      return "Personal Information";
    }
    return "Información personal";
  };

	const getTranslatedEdit = (language) => {
		if (language === "en") {
			return "Edit";
		}
		return "Editar";
	};

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">{t("navigation.profile")}</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {getTranslatedPersonalInfo(language)}
          </h2>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-800"
          >
            {isEditing ? t("common.cancel") : getTranslatedEdit(language)}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.phoneNumber")}
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t("auth.name")}</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("auth.username")}</p>
              <p className="font-medium">{user?.userName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("auth.email")}</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("common.roles")}</p>
              <p className="font-medium">{user?.roles?.join(", ")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
