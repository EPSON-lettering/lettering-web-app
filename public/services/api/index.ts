import accountService from "@public/services/api/AccountService";
import matchingService from "@public/services/api/MatchingService";

const Server = {
	Account: accountService,
	Matching: matchingService,
};

export default Server;
