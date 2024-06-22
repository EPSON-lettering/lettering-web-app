import accountService from "./AccountService";
import matchingService from "./MatchingService";
import printerService from "./printerService";
import letterService from "./letterService";
import commentService from "@/services/api/commentService";
import notificationService from "@/services/api/notificationService";

const Server = {
	Account: accountService,
	Matching: matchingService,
	Print: printerService,
	Letter: letterService,
	Comment: commentService,
	Notification: notificationService,
};

export default Server;
