import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export enum Language {
	KOR = "ko",
	EN = "en"
}

export const languageKorProps:Record<Language, string> = {
	[Language.KOR]: "한국어",
	[Language.EN]: "영어",
};

export const languageOptions = [Language.KOR, Language.EN];

i18n
	.use(initReactI18next)
	.init({
		lng: 'ko',
		fallbackLng: 'en'
	});

export default i18n;
