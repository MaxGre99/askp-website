import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import resources from '../locales/index';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		supportedLngs: ['en', 'ru'],
		resources: resources,
		debug: process.env.REACT_APP_ENV_LOCAL === 'development',
		interpolation: {
			escapeValue: false,
		},
		lowerCaseLng: true,
		detection: {
			order: ['localStorage', 'navigator', 'htmlTag'],
			lookupLocalStorage: 'lng',
		},
	});

export default i18n;
