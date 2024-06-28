'use client';

import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import { toast } from "react-toastify";

const notiCache = new Set<number>();

const useNotificationsQuery = () => {
	const { user } = useUser();
	const { data = [], isLoading, ...props } = useQuery({
		queryKey: ['notifications-getter'],
		queryFn: Server.Notification.getList,
		enabled: !!user,
		refetchInterval: 3000,
	});

	const notify = (m: string) => toast(m);

	useEffect(() => {
		if (notiCache.size === 0) {
			data.forEach(noti => {
				if (!noti.isRead) {
					notiCache.add(noti.id);
				}
			});
			return;
		}

		data.forEach(n => {
			if (!n.isRead && !notiCache.has(n.id)) {
				notiCache.add(n.id);
				notify(n.message);
			}
		});
	}, [data]);

	return {
		notifications: data,
		notificationLoading: isLoading,
		cacheStore: notiCache,
		...props,
	};
};

export default useNotificationsQuery;
