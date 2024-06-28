import { Notification } from "@/types/object";
import { jsonClient } from "@/services/api/client";

interface NotificationService {
	getList: () => Promise<Notification[]>;
	read: (ids: number[]) => Promise<void>;
}

const URL = 'notification';

const notificationService: NotificationService = {
	getList: () => jsonClient.get(`${URL}/`),
	read: ids => jsonClient.put(`${URL}/read/`, { ids }),
};

export default notificationService;
