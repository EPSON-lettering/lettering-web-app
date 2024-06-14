import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export enum ClientLanguage {
	KOR = "ko",
	EN = "en"
}

export const languageKorProps:Record<ClientLanguage, string> = {
	[ClientLanguage.KOR]: "한국어",
	[ClientLanguage.EN]: "영어",
};

export const languageOptions = [ClientLanguage.KOR, ClientLanguage.EN];

i18n
	.use(initReactI18next)
	.init({
		lng: 'ko',
		fallbackLng: 'en'
	});

export default i18n;
