import accountService from "./AccountService";
import matchingService from "./MatchingService";
import printerService from "./printerService";
import letterService from "./letterService";
import commentService from "@/services/api/commentService";
import notificationService from "@/services/api/notificationService";
import badgeService from "@/services/api/BadgeService";

const Server = {
	Account: accountService,
	Matching: matchingService,
	Print: printerService,
	Letter: letterService,
	Comment: commentService,
	Notification: notificationService,
	Badge: badgeService,
};

export default Server;
