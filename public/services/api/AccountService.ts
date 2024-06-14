import { jsonClient } from "@public/services/api/client";
import { Interest, User } from "@/types/object";
import { toCamel } from "snake-camel";

interface LoginResponse {
	user: User;
	access: string;
	refresh: string;
}

interface AccountService {
	// signup: (req: any) => Promise<any>;
	getGoogleAuthUrl: () => Promise<{ oauthUrl: string }>;
	getInterests: () => Promise<Interest[]>;
	login: (authCode: string) => Promise<LoginResponse>;
}

const URL= '/account';

const accountService: AccountService = {
	getGoogleAuthUrl: () => jsonClient.get(`${URL}/google/login/`),
	getInterests: () => jsonClient.get('/interest'),
	login: (authCode) =>
			jsonClient.post(`${URL}/google/callback/`, { code: authCode })
				.then(data => toCamel(data) as LoginResponse),
};

export default accountService;
