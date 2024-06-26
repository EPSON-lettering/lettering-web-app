import { Interest, User, Language } from "@/types/object";
import { toCamel } from "snake-camel";
import { jsonClient } from "@/services/api/client";

interface LoginResponse {
	user: User;
	access: string;
	refresh: string;
}

export type SignupProvider = 'google' | 'kakao' | 'facebook' | 'apple';

interface SignupRequest {
	unique: string;
	provider: SignupProvider;
	language: string;
	nickname: string;
	interests: number[];
	noneProfileColor: string;
}


interface AccountService {
	signup: (req: SignupRequest) => Promise<void>;
	getGoogleAuthUrl: () => Promise<{ oauthUrl: string }>;
	getInterests: () => Promise<Interest[]>;
	login: (authCode: string) => Promise<LoginResponse>;
	getLanguages: () => Promise<Language[]>;
	validateNickname: (nickname: string) => Promise<{ available:boolean; error?: string }>;
	getUserDetails: () => Promise<User>;
	changeNickname: (nickname: string) => Promise<void>;
	checkUserHasMatching: () => Promise<{ isMatch: boolean }>;
}

const URL= '/account';

const doLogin = (login: LoginResponse) => {
	const { access, refresh } = login;
	localStorage.setItem('access', access);
	localStorage.setItem('refresh', refresh);
	return login;
};

const accountService: AccountService = {
	getGoogleAuthUrl: () => jsonClient.get(`${URL}/google/login/`),
	getInterests: () => jsonClient.get('/interest'),
	login: (authCode) =>
			jsonClient.post(`${URL}/google/callback/`, { code: authCode })
				.then(data => doLogin(toCamel(data) as LoginResponse)),
	getLanguages: () => jsonClient.get<Language[]>(`${URL}/languages/`)
			.then((data: any) => data.map(toCamel) as Language[]),
	signup: (body) => jsonClient.post(`${URL}/register/`, body),
	validateNickname: (nickname) => jsonClient.get(`${URL}/nickname/?nickname=${nickname}`),
	getUserDetails: () => jsonClient.get(`${URL}/`),
	changeNickname: (nickname) => jsonClient.post(`${URL}/nickname/`, { nickname }),
	checkUserHasMatching: () => jsonClient.get(`${URL}/match/check/`),
};

export default accountService;
