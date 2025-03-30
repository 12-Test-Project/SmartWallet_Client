import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Importar traducciones
import translationES from './locales/es/translation.json'
import translationEN from './locales/en/translation.json'

const resources = {
  es: {
    translation: translationES
  },
  en: {
    translation: translationEN
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false // React ya escapa los valores
    }
  })

export default i18n