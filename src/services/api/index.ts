import accountService from "./AccountService";
import matchingService from "./MatchingService";
import printerService from "./printerService";
import letterService from "./letterService";
import commentService from "@/services/api/commentService";

const Server = {
	Account: accountService,
	Matching: matchingService,
	Print: printerService,
	Letter: letterService,
	Comment: commentService,
};

export default Server;
