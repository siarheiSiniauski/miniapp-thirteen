import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    returnNull: false,
    fallbackLng: {
      de: ['de'],
      es: ['es'],
      it: ['it'],
      en: ['en'],
      ru: ['ru'],
      ua: ['ua'],
      ar: ['ar'],
      be: ['be'],
      ko: ['ko'],
      default: ['en'],
    },
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    },

    detection: {
      order: ['localStorage'],
      // order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
    },

    backend: {
      loadPath: '/i18n/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
