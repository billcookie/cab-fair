import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './translations/en.json'
import jpJSON from './translations/jp.json'
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    jp: { ...jpJSON },
  },
  lng: "en",
})
