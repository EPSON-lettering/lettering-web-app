import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";

const useNotificationsQuery = () => {
	const isLogined = localStorage.getItem("access");
	const { data = [], isLoading, ...props } = useQuery({
		queryKey: ['notifications-getter'],
		queryFn: Server.Notification.getList,
		enabled: !!isLogined,
	});

	return {
		notifications: data,
		notificationLoading: isLoading,
		...props,
	};
};

export default useNotificationsQuery;
