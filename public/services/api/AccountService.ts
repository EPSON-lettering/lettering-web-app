import { jsonClient } from "@public/services/api/client";

interface AccountService {
	// signup: (req: any) => Promise<any>;
	getGoogleAuthUrl: () => Promise<{ oauthUrl: string }>
}

const URL= '/account';

const accountService: AccountService = {
	getGoogleAuthUrl: () => jsonClient.get(`${URL}/google/login/`),
};

export default accountService;
