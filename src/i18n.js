import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    whitelist: ["en", "pl"],
    ns: ["translation", "credentials", "lobby", "kalambury"],
    defaultNS: "translation",
    debug: process.env.NODE_ENV === "development",
  });

export default i18n;
