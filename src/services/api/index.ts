import accountService from "@/services/api/AccountService";
import matchingService from "@/services/api/MatchingService";
import printerService from "@/services/api/printerService";

const Server = {
	Account: accountService,
	Matching: matchingService,
	Epson: printerService,
};

export default Server;
