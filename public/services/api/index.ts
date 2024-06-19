import accountService from "@public/services/api/AccountService";
import matchingService from "@public/services/api/MatchingService";
import printerService from "@public/services/api/printerService";

const Server = {
	Account: accountService,
	Matching: matchingService,
	Epson: printerService,
};

export default Server;
