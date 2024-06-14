import { jsonClient } from "@public/services/api/client";
import { Interest } from "@/types/object";

interface AccountService {
	// signup: (req: any) => Promise<any>;
	getGoogleAuthUrl: () => Promise<{ oauthUrl: string }>;
	getInterests: () => Promise<Interest[]>;
}

const URL= '/account';

const accountService: AccountService = {
	getGoogleAuthUrl: () => jsonClient.get(`${URL}/google/login/`),
	getInterests: () => jsonClient.get('/interest'),
};

export default accountService;
