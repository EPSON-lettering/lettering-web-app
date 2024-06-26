'use client';

import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";

const useMatchOneQuery = () => {
	// const isLogined = localStorage.getItem("access");
	const { isLoading, data = null, ...query } = useQuery({
		queryKey: ['check-matching'],
		queryFn: Server.Matching.getMyMatchingDetails,
		// enabled: !!isLogined
	});

	return {
		...query,
		match: data,
		isLoadingOneMatching: isLoading,
	};
};

export default useMatchOneQuery;
