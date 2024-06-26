'use client';

import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";
import { usePathname } from "next/navigation";

const disabledUrls = ['/', '/sign-up'];

const useMatchOneQuery = () => {
	const pathname = usePathname();
	const enabled = !disabledUrls.includes(pathname ?? '');

	const { isLoading, data = null, ...query } = useQuery({
		queryKey: ['check-matching'],
		queryFn: Server.Matching.getMyMatchingDetails,
		enabled,
	});

	return {
		...query,
		match: data,
		isLoadingOneMatching: isLoading,
	};
};

export default useMatchOneQuery;
