import accountService from "./AccountService";
import matchingService from "./MatchingService";
import printerService from "./printerService";
import letterService from "./letterService";

const Server = {
	Account: accountService,
	Matching: matchingService,
	Print: printerService,
	Letter: letterService,
};

export default Server;
