'use client';

import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";
import useUser from "@/hooks/useUser";

const useNotificationsQuery = () => {
	const { user } = useUser();
	const { data = [], isLoading, ...props } = useQuery({
		queryKey: ['notifications-getter'],
		queryFn: Server.Notification.getList,
		enabled: !!user,
	});

	return {
		notifications: data,
		notificationLoading: isLoading,
		...props,
	};
};

export default useNotificationsQuery;
