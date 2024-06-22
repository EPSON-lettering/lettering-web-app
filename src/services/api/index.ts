import accountService from "@/services/api/AccountService";
import matchingService from "@/services/api/MatchingService";
import printerService from "@/services/api/printerService";

const Server = {
	Account: accountService,
	Matching: matchingService,
	Print: printerService,
};

export default Server;
