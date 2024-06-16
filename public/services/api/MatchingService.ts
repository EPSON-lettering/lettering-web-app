import { jsonClient } from "@public/services/api/client";

interface MatchingService {
	hasUserMatch: () => Promise<{ isMatch: boolean }>;
}

const matchingService: MatchingService = {
	hasUserMatch: () => jsonClient.get(``),

};

export default matchingService;
