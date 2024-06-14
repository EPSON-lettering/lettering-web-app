import { jsonClient } from "@public/services/api/client";
import { Interest, User, Language } from "@/types/object";
import { toCamel } from "snake-camel";

interface LoginResponse {
	user: User;
	access: string;
	refresh: string;
}

interface SignupRequest {
	unique: string;
	provider: 'google' | 'kakao' | 'facebook' | 'apple';
	languages: string[];
	nickname: string;
	interests: number[];
}


interface AccountService {
	signup: (req: SignupRequest) => Promise<void>;
	getGoogleAuthUrl: () => Promise<{ oauthUrl: string }>;
	getInterests: () => Promise<Interest[]>;
	login: (authCode: string) => Promise<LoginResponse>;
	getLanguages: () => Promise<Language[]>;
}

const URL= '/account';

const accountService: AccountService = {
	getGoogleAuthUrl: () => jsonClient.get(`${URL}/google/login/`),
	getInterests: () => jsonClient.get('/interest'),
	login: (authCode) =>
			jsonClient.post(`${URL}/google/callback/`, { code: authCode })
				.then(data => toCamel(data) as LoginResponse),
	getLanguages: () => jsonClient.get(`${URL}/languages/`)
			.then(data => toCamel(data) as Language[]),
	signup: (body) => jsonClient.post(`${URL}/register`, body),
};

export default accountService;
